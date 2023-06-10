import React, { useEffect, useState, useCallback, useRef } from "react";
import {
  View,
  StatusBar,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Image,
  ActivityIndicator,
  Alert,
} from "react-native";
import styles from "./tasks.styles";
import DraggableFlatList from "react-native-draggable-flatlist";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { Icon } from "react-native-elements";
import BackgroundTimer from "react-native-background-timer";
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import NotificationSounds, {
  playSampleSound,
} from "react-native-notification-sounds";
import DeleteConfirmationModal from "../../../components/modals/deleteConfirmation/deleteConfirmation";
import { AppColor, appImages, colors } from "../../../globals/utilities";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import firestore from "@react-native-firebase/firestore";
import { appFBS } from "../../../services/firebaseServices/firebaseServices";
import toastServices from "../../../services/toastServices/toast.services";
import moment from "moment";
import TaskHeader from "../../../components/general/taskHeader/taskHeader";
import * as Progress from "react-native-progress";
import LastTask from "../../../components/modals/lastTask/lastTask";
import MoveToNewTask from "../../../components/modals/moveToNewTask/moveToNewTask";
import OvertimeTask from "../../../components/modals/moveToNewTask/overtimeTask";
import ResetConfirmation from "../../../components/modals/deleteConfirmation/resetConfirmation";
import { HeadlessJsTask } from "react-native-background-fetch";
import { Notifications } from "react-native-notifications";
import { useSelector, useDispatch } from "react-redux";
import _BackgroundTimer from "react-native-background-timer";
import { setTaskTimer, taskTimerFn } from "../../../store/actions";
const NUM_ITEMS = 10;

function getColor(i: number) {
  const multiplier = 255 / (NUM_ITEMS - 1);
  const colorVal = i * multiplier;
  return `rgb(${colorVal}, ${Math.abs(128 - colorVal)}, ${255 - colorVal})`;
}

const exampleData: Item[] = [...Array(20)].map((d, index) => {
  const backgroundColor = getColor(index);
  return {
    key: `item-${backgroundColor}`,
    label: String(index),
    backgroundColor,
  };
});

type Item = {
  key: string,
  label: string,
  backgroundColor: string,
};
const Tasks = (props) => {
  var data1 = props?.route?.params?.data;
  let row: Array<any> = [];
  let prevOpenedRow;
  const dispatch = useDispatch();
  const itemRefs = useRef(new Map());
  const [data, setData] = useState(data1);
  const [selectedId, setSelectedId] = useState(null);
  const [visiblity, setVisiblity] = useState(false);
  const [count, setCount] = useState(-1);
  const [allTaskList, setallTaskList] = useState([]);
  const [taskStartTime, setTaskStartTime] = useState(true);
  const [deleteModal, setdeleteModal] = useState(false);
  const [resetModal, setResetModal] = useState(false);
  const [selectedTask, setselectedTask] = useState();
  const [nextTaskmodalValues, setnextTaskmodalValues] = useState({
    CurrentTaskName: "",
    NextTaskName: "",
  });
  const [isPlaying, setisPlaying] = useState(false);
  const [loader, setLoader] = useState(true);
  const [scheduleTotalTime, setscheduleTotalTime] = useState("");
  const [totalDuration, setTotalDuration] = useState(1);
  const [defaultColor, setdefaultColor] = useState(colors.gray600);
  const [lastTaskId, setlastTaskId] = useState(null);
  const [currentOnGoingTask, setcurrentOnGoingTask] = useState({});
  const [dummpSeconds, setdummpSeconds] = useState(0);
  const [extendTime, setExtendTime] = useState(0);
  const [riseSeconds, setRiseTime] = useState(0);
  const [hoursAndMinutes, sethoursAndMinutes] = useState({
    hours: 0,
    minutes: 0,
  });
  const [lastTasVisibility, setlastTasVisibility] = useState(false);
  const [getTime, setGetTime] = useState(false);
  const [moveToNextTaskVisibility, setmoveToNextTaskVisibility] =
    useState(false);
  const [extendTimeVisibility, setExtendTimeVisibility] = useState(false);
  // const taskTimer = useSelector((state) => state?.state?.taskTimer);
  // useEffect(() => {
  //   if (currentOnGoingTask.status === "incomplete") {
  //     if (currentOnGoingTask?.startTimer) {
  //       // setStartTime()
  //       setisPlaying(currentOnGoingTask?.startTimer);
  //     }
  //   }
  // }, []);
  useEffect(() => {
    const timer = BackgroundTimer.setInterval(() => {
      if (isPlaying && currentOnGoingTask.status === "incomplete") {
        if (extendTime > 0) {
          // console.log(extendTime, "extendTime");
          let val = setExtendTime(extendTime + 1);
          setdefaultColor(colors.gray600);
          if (extendTime % 300 === 0) {
            // console.log(extendTime);
            const notification = {
              title: `${
                Math.trunc(extendTime / 3600) !== 0
                  ? Math.trunc(extendTime / 3600) + "h"
                  : ""
              }${
                getMinutes(extendTime) !== 0
                  ? getMinutes(extendTime) + "min"
                  : ""
              } have been passed for ${currentOnGoingTask?.taskName}`,
              body: "don't forget to check your routine",
            };

            // Send the notification
            Notifications.postLocalNotification(notification);

            NotificationSounds.getNotifications("notification").then(
              (soundsList) => {
                console.log("SOUNDS", JSON.stringify(soundsList));
                if (soundsList.length !== 0) {
                  playSampleSound(soundsList[1]);
                } else {
                  console.log(
                    "if you want to stop any playing sound just call"
                  );
                }
                // if you want to stop any playing sound just call:
                // stopSampleSound();
              }
            );
          }
        } else {
          if (dummpSeconds !== undefined) {
            setdummpSeconds(dummpSeconds - 1);
            setRiseTime(riseSeconds + 1);
            if (dummpSeconds === 1) {
              const notification = {
                title: `Your time is up ${currentOnGoingTask?.taskName}`,
                body: "don't forget to check your routine",
              };

              // Send the notification
              Notifications.postLocalNotification(notification);
              NotificationSounds.getNotifications("notification").then(
                (soundsList) => {
                  // console.warn('SOUNDS', JSON.stringify(soundsList));
                  if (soundsList.length !== 0) {
                    playSampleSound(soundsList[1]);
                  }
                  // if you want to stop any playing sound just call:
                  // stopSampleSound();
                }
              );

              setExtendTimeVisibility(true);
              {
                count === -1 && setExtendTime(1);
              }
            }
          }
          // setCount(0);
        }
      } else {
        setisPlaying(false);
      }
    }, 1000);
    return () => BackgroundTimer.clearInterval(timer);
  });
  useEffect(() => {
    firestore().collection("tasks").onSnapshot(onResult);
  }, []);

  useEffect(() => {
    //calculateTotalTime();
    setTimeout(() => {
      setVisiblity(true);
    }, 4000);
  }, []);

  const resetAllTasks = async () => {
    setExtendTime(0);
    setRiseTime(0);
    setCount(-1);
    console.log("isplaying 332");
    setisPlaying(false);
    let list = await appFBS.getData("tasks", true, "scheduleId", "==", data.id);
    if (!list?.length) {
      setLoader(false);
    }
    list?.map(async (ele, index) => {
      await appFBS.updateData(ele.id, "tasks", {
        status: "incomplete",
      });
    });
    let list1 = await appFBS.getData(
      "tasks",
      true,
      "scheduleId",
      "==",
      data.id
    );
    let start_time = moment(
      `${data.startHour}:${data.startMin} ${data.AMPM}`,
      "hh:mm a"
    ).format("HH:mm a");
    let allList = [];
    list1?.map((ele, index) => {
      if (ele.status == "incomplete") {
        let obj = {};
        start_time = moment(start_time, "HH:mma")
          .add(ele?.duration?.hours * 60 + ele?.duration?.minutes, "minute")
          .format("hh:mm A");
        let totalSeconds =
          ele?.duration?.hours * 3600 + ele?.duration?.minutes * 60;
        obj = { ...ele, startTime: start_time, totalSeconds: totalSeconds };
        allList.push(obj);
      } else {
        allList.push(ele);
      }
      // console.log('checking', allList);
      const sorted = allList.sort((a, b) => (a.status > b.status ? -1 : 1));

      if (sorted !== undefined && sorted.length > 0) {
        const { totalSeconds } = sorted[0];
        if (totalSeconds !== undefined) {
          setdummpSeconds(totalSeconds);
          setTotalDuration(totalSeconds);
        }
        setallTaskList(sorted);
        calculateTotalTime(sorted);
        setnextTaskmodalValues({
          ...nextTaskmodalValues,
          CurrentTaskName: sorted[0].taskName,
          NextTaskName:
            sorted[1] !== undefined && sorted[1].status !== "completed"
              ? sorted[1].taskName
              : "finished",
        });
      }
      setResetModal(false);
    });
    // setResetModal(false);
  };

  const calculateTotalTime = async (allTaskList) => {
    let hour = 0;
    let minut = 0;
    allTaskList.map((item) => {
      if (item?.status === "incomplete") {
        hour = hour + item?.duration?.hours;
      }
    });
    allTaskList.map((item) => {
      if (item?.status === "incomplete") {
        minut = minut + item?.duration?.minutes;
        if (minut >= 60) {
          minut = minut - 60;
          hour = hour + 1;
        }
      }
    });

    if (hour == 0 && minut == 0) {
      setscheduleTotalTime(0);
    } else if (hour > 0 && minut > 0) {
      setscheduleTotalTime(hour + "h:" + minut + "m");
    } else if (hour == 0 && minut > 0) {
      setscheduleTotalTime("0h" + ":" + minut + "m");
    } else if (hour > 0 && minut == 0) {
      setscheduleTotalTime(hour + "h:" + "00m");
    }

    sethoursAndMinutes({ ...hoursAndMinutes, hours: hour, minutes: minut });
  };
  async function onResult(QuerySnapshot) {
    let changes = QuerySnapshot.docChanges();
    changes.forEach((element) => {
      getTasks();
    });
  }
  const getMinutes = (time) => {
    return Math.trunc(time / 3600) * 60 - Math.trunc(time / 60) > 9
      ? Math.trunc(time / 3600) !== 0
        ? Math.trunc(time / 60) - Math.trunc(time / 3600) * 60
        : Math.trunc(time / 60)
      : Math.trunc(time / 3600) !== 0
      ? Math.trunc(time / 60) - Math.trunc(time / 3600) * 60
      : Math.trunc(time / 60);
  };
  const saveToFirebase = async () => {
    if (isPlaying) {
      await appFBS.updateData(currentOnGoingTask.id, "tasks", {
        startTimer: isPlaying,
        durationRemaining: {
          totalDuration: currentOnGoingTask?.durationRemaining?.totalDuration,
          hours:
            extendTime > 0
              ? Math.trunc(extendTime / 3600)
              : Math.trunc(dummpSeconds / 3600),
          minutes:
            extendTime > 0 ? getMinutes(extendTime) : getMinutes(dummpSeconds),
          seconds:
            extendTime > 0
              ? Math.trunc(extendTime % 60)
              : Math.trunc(dummpSeconds % 60),
          extraTime: extendTime > 0 ? true : false,
        },
      });
    }
  };
  const setStartTime = async () => {
    let newData = {
      ...data,
      startHour: moment().format("hh"),
      startMin: moment().format("mm"),
    };
    setData(newData);
    const tSeconds = allTaskList[0].totalSeconds;
    if (!isPlaying) {
      await appFBS.updateData(currentOnGoingTask.id, "tasks", {
        startTimer: !isPlaying,
      });
    } else {
      await appFBS.updateData(currentOnGoingTask.id, "tasks", {
        startTimer: !isPlaying,
        durationRemaining: {
          totalDuration: currentOnGoingTask?.durationRemaining?.totalDuration,
          hours:
            extendTime > 0
              ? Math.trunc(extendTime / 3600)
              : Math.trunc(dummpSeconds / 3600),
          minutes:
            extendTime > 0 ? getMinutes(extendTime) : getMinutes(dummpSeconds),
          seconds:
            extendTime > 0
              ? Math.trunc(extendTime % 60)
              : Math.trunc(dummpSeconds % 60),
          extraTime: extendTime > 0 ? true : false,
        },
      });
    }
    // console.log(currentOnGoingTask, "currentOnGoingTask");
    // if (isPlaying) {
    // dispatch(
    //   setTaskTimer({
    //     ...taskTimer,
    //     isPlaying: !isPlaying,
    //   })
    // );
    if (tSeconds !== dummpSeconds) {
      setTaskStartTime(false);
      console.log("isplaying 469");
      setisPlaying(!isPlaying);
      if (dummpSeconds === 0) {
        setdefaultColor(colors.gray600);
      }
    } else {
      let allList = [];

      let start_time = moment().format("HH:mm a");
      allTaskList.map((item, index) => {
        let obj = {};
        if (item?.status === "incomplete") {
          if (index === 0) {
            start_time = moment(start_time, "HH:mma").format("hh:mm A");
          } else {
            start_time = moment(start_time, "HH:mma")
              .add(
                item?.duration?.hours * 60 + item?.duration?.minutes,
                "minute"
              )
              .format("hh:mm A");
          }
          let totalSeconds =
            item?.duration?.hours * 3600 + item?.duration?.minutes * 60;
          obj = { ...item, startTime: start_time, totalSeconds: totalSeconds };
          allList.push(obj);
        } else {
          allList.push(item);
        }

        setallTaskList(allList);
        calculateTotalTime(allList);
        console.log("isplaying 501");
        setisPlaying(!isPlaying);
        setTaskStartTime(false);
      });
    }
  };
  const getTasks = async (addStartTime, time) => {
    let list = await appFBS.getData("tasks", true, "scheduleId", "==", data.id);
    // let start_time = data?.time;
    // let firstime = moment().format('HH:mm a');

    let start_time = addStartTime
      ? time
      : moment(
          `${data.startHour}:${data.startMin} ${data.AMPM}`,
          "hh:mm a"
        ).format("HH:mm a");
    let completeList = [];
    let incompleteList = [];
    let allList = [];
    if (!list?.length) {
      setLoader(false);
    }
    list?.map((ele, index) => {
      // console.log(ele, "ele");
      if (ele.status == "incomplete") {
        let obj = {};
        if (index === 0) {
          start_time = moment(start_time, "HH:mma").format("hh:mm A");
        } else {
          start_time = moment(start_time, "HH:mma")
            .add(
              ele?.durationRemaining?.hours * 60 +
                ele?.durationRemaining?.minutes,
              "minute"
            )
            .format("hh:mm A");
        }

        let totalSeconds =
          ele?.durationRemaining?.hours * 3600 +
          ele?.durationRemaining?.minutes * 60 +
          (ele?.durationRemaining?.seconds % 60);
        obj = { ...ele, startTime: start_time, totalSeconds: totalSeconds };
        incompleteList.push(obj);
        allList.push(obj);
      } else {
        allList.push(ele);
        completeList.push(ele);
      }
    });
    const sorted = allList.sort((a, b) => (a.status > b.status ? -1 : 1));
    if (sorted !== undefined && sorted.length > 0) {
      const { totalSeconds } = sorted[0];
      // console.log("checking", sorted);
      if (totalSeconds !== undefined) {
        setdummpSeconds(totalSeconds);
        setTotalDuration(totalSeconds);
      }
      setallTaskList(sorted);
      calculateTotalTime(sorted);
    }
    // setnextTaskmodalValues({
    //   ...nextTaskmodalValues,
    //   CurrentTaskName: sorted[0].taskName,
    //   NextTaskName: sorted[1].taskName,
    // });
    // console.log('list checking', dummpSeconds);
    // if (status === 'incomplete') {
    //   { totalSeconds !== undefined && setTotalDuration(totalSeconds) }
    //  // startTime = moment().format('hh:mm A');
    // }
    // await setcurrentOnGoingTask(allTaskList[0]);
    //console.log('nextTaskmodalValues.CurrentTaskName',nextTaskmodalValues.CurrentTaskName);
  };

  const updateStatus = async () => {
    if (allTaskList.length > 0 && currentOnGoingTask.status === "incomplete") {
      if (allTaskList.length == 1) {
        setlastTasVisibility(true);
      } else if (allTaskList.length > 1) {
        setExtendTime(0);
        setRiseTime(0);
        setdummpSeconds(0);
        setCount(-1);
        setnextTaskmodalValues({
          ...nextTaskmodalValues,
          CurrentTaskName: allTaskList[0].taskName,
          NextTaskName:
            allTaskList[1] !== undefined &&
            allTaskList[1].status !== "completed"
              ? allTaskList[1].taskName
              : "finished",
        });

        setlastTaskId(allTaskList[0].id);

        await appFBS.updateData(allTaskList[0].id, "tasks", {
          status: "completed",
        });
        // setmoveToNextTaskVisibility(true);
        // let start_time = moment().format('HH:mm a');
        // let allList = [];
        // let list = await appFBS.getData('tasks', true, 'scheduleId', '==', data.id);
        // list?.map((ele, index) => {
        //   if (ele.status == 'incomplete') {
        //     let obj = {};
        //     start_time = moment(start_time, 'HH:mma')
        //       .add(ele?.duration?.hours * 60 + ele?.duration?.minutes, 'minute')
        //       .format('hh:mm A');
        //     let totalSeconds =
        //       ele?.duration?.hours * 3600 + ele?.duration?.minutes * 60;
        //     obj = { ...ele, startTime: start_time, totalSeconds: totalSeconds };
        //     allList.push(obj);
        //   } else {
        //     allList.push(ele);
        //   }
        //   //console.log('checking', allList);
        //   const sorted = allList.sort((a, b) => (a.status > b.status) ? -1 : 1);

        //   if (sorted !== undefined && sorted.length > 0) {
        //     const { totalSeconds } = sorted[0];
        //     if (totalSeconds !== undefined) {
        //       setdummpSeconds(totalSeconds);
        //       setTotalDuration(totalSeconds);
        //     }
        //     setallTaskList(sorted);
        //     setnextTaskmodalValues({
        //       ...nextTaskmodalValues,
        //       CurrentTaskName: sorted[0].taskName,
        //       NextTaskName: (sorted[1] !== undefined && sorted[1].status !== 'completed') ? sorted[1].taskName : 'finished',
        //     });
        //   }
        //   // setResetModal(false);
        // });
      } else {
        // setisPlaying(false);
        setdefaultColor(colors.gray600);
        toastServices.showToast("No task available");
      }
    }
  };
  const closeRow = (index) => {
    console.log("closerow");
    if (prevOpenedRow && prevOpenedRow !== row[index]) {
      prevOpenedRow.close();
    }
    prevOpenedRow = row[index];
  };

  const renderItem = useCallback(
    ({ item, index, drag, isActive }: RenderItemParams<Item>) => {
      let now = 0;
      if (extendTime > 0) {
        setCount(0);
        setdefaultColor(colors.gray600);
        setcurrentOnGoingTask(item);
        if (item?.startTimer) {
          setisPlaying(item?.startTimer);
        }
        let totalSeconds =
          item?.duration?.hours * 3600 + item?.duration?.minutes * 60;
        setTotalDuration(totalSeconds);
        let totalSeconds2 =
          item?.durationRemaining?.hours * 3600 +
          item?.durationRemaining?.minutes * 60 +
          (item?.durationRemaining?.seconds % 60);
        setRiseTime(totalSeconds - totalSeconds2);
        setLoader(false);
      } else {
        if (index == 0) {
          setdefaultColor(item.color);
          setcurrentOnGoingTask(item);
          if (item?.startTimer) {
            setisPlaying(item?.startTimer);
          }
          let totalSeconds =
            item?.duration?.hours * 3600 + item?.duration?.minutes * 60;
          setTotalDuration(totalSeconds);
          let totalSeconds2 =
            item?.durationRemaining?.hours * 3600 +
            item?.durationRemaining?.minutes * 60 +
            (item?.durationRemaining?.seconds % 60);
          setRiseTime(totalSeconds - totalSeconds2);
          // console.log(totalSeconds - totalSeconds2,"totalSeconds - totalSeconds2");
          setLoader(false);
          now = moment();
          //  console.log('timeee', +',,,'+now.format("m"))
        }
      }

      return item.status === "completed" ? (
        <View>
          <TouchableOpacity
            style={{
              alignItems: "center",
              justifyContent: "center",
            }}
            onLongPress={drag}
          >
            <View
              style={[
                styles.innerContainer,
                styles.compltedItem,
                {
                  backgroundColor: item.color,
                  marginVertical: responsiveHeight(1),
                },
              ]}
            >
              <View style={styles.itemContainer}>
                <Text
                  numberOfLines={1}
                  style={[styles.itemNameText, styles.compltedItemTitleText]}
                >
                  {item.taskName}
                </Text>
                <Text
                  numberOfLines={1}
                  style={[
                    styles.itemDurationText.color,
                    styles.compltedItemTitleText,
                  ]}
                >
                  {item?.duration?.totalDuration}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      ) : (
        <Swipeable
          renderRightActions={(progress, dragX) =>
            QuickActions(item, index, dragX)
          }
          ref={(ref) => (row[index] = ref)}
          onSwipeableOpen={() => closeRow(index)}
          rightOpenValue={-10}
        >
          <TouchableOpacity
            style={{
              // borderColor: isActive ? 'red' : null,
              // borderWidth: isActive ? 2 : null,
              alignItems: "center",
              justifyContent: "center",
            }}
            onLongPress={drag}
          >
            <View
              style={{
                ...styles.itemTopContainer,
                backgroundColor: item.color,
              }}
            >
              <View
                style={{
                  ...styles.innerContainer,
                  backgroundColor: item.color,
                }}
              >
                <View style={styles.itemContainer}>
                  <Text numberOfLines={1} style={styles.itemNameText}>
                    {item.taskName}
                  </Text>
                  <Text numberOfLines={1} style={styles.itemDurationText}>
                    {item?.durationRemaining?.totalDuration}
                  </Text>
                </View>
                <Text style={styles.itemTimeText}>{item?.startTime}</Text>
              </View>
              {index == 0 && (
                <View
                  style={{
                    ...styles.itemBottomTimeContainer,
                    backgroundColor: "rgba(0, 0, 0, 0.3)",
                  }}
                >
                  <Text style={styles.bottonTimerText}>
                    Ends @ {""}
                    {moment(item?.startTime, "hh:mm a")
                      .add(
                        item?.durationRemaining?.hours * 60 +
                          item?.durationRemaining?.minutes,
                        "minute"
                      )
                      .format("hh:mm A")}
                  </Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
        </Swipeable>
      );
    },
    []
  );

  const draaggedItemStatus = async (data, from) => {
    setSelectedId(allTaskList[from].id);
    // console.log('testing_Dragged', allTaskList[from].taskName);

    // console.log('testing_Dragged', allTaskList[from+1].status);
    // setallTaskList(data)
    if (allTaskList.length > 0) {
      if (allTaskList[from].status === "completed") {
        Alert.alert(
          "Alert !",
          "Are you sure, you want to update status of this Task?",
          [
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel",
            },
            {
              text: "OK",
              onPress: async () => {
                await appFBS.updateData(allTaskList[from].id, "tasks", {
                  status: "incomplete",
                });
                await getTasks();
              },
            },
          ]
        );
      } else {
        setExtendTime(-1);
        setRiseTime(-1);
        setCount(-1);
        // setisPlaying(false);
        const sorted = data.sort((a, b) => (a.status > b.status ? -1 : 1));
        console.log("pak1", sorted);
        if (sorted !== undefined && sorted.length > 0) {
          const { duration, totalSeconds } = sorted[0];

          // startTime = moment().format('hh:mm A');
          console.log("pak2", totalSeconds);
          setcurrentOnGoingTask(sorted[0]);
          // { allTaskList[0].totalSeconds !== undefined && totalDuration === 1 ? setTotalDuration(allTaskList[0].totalSeconds) : 1 }
          setdummpSeconds(totalSeconds);
          setTotalDuration(totalSeconds);
          //console.log('pak2', duration?.minutes)
          // let hour = 0;
          // let minut = 0;
          let allList = [];
          setallTaskList([]);
          let start_time = moment().format("HH:mm a");
          sorted.map((item, index) => {
            let obj = {};
            if (item?.status === "incomplete") {
              if (index === 0) {
                start_time = moment(start_time, "HH:mma").format("hh:mm A");
              } else {
                start_time = moment(start_time, "HH:mma")
                  .add(
                    item?.duration?.hours * 60 + item?.duration?.minutes,
                    "minute"
                  )
                  .format("hh:mm A");
              }
              let totalSeconds =
                item?.duration?.hours * 3600 + item?.duration?.minutes * 60;
              obj = {
                ...item,
                startTime: start_time,
                totalSeconds: totalSeconds,
              };
              allList.push(obj);
            } else {
              allList.push(item);
            }
          });
          setallTaskList(allList);

          newcalculateTotalTime(allList);
          console.log("ddnfdnf", allList);

          setnextTaskmodalValues({
            ...nextTaskmodalValues,
            CurrentTaskName: sorted[0].taskName,
            NextTaskName:
              sorted[1] !== undefined && sorted[1].status !== "completed"
                ? sorted[1].taskName
                : "finished",
          });
        }
        // setmoveToNextTaskVisibility(true);
      }
    }
  };
  const newcalculateTotalTime = async (allTaskList) => {
    let hour = 0;
    let minut = 0;
    allTaskList.map((item) => {
      if (item?.status === "incomplete") {
        hour = hour + item?.duration?.hours;
      }
    });
    allTaskList.map((item) => {
      if (item?.status === "incomplete") {
        minut = minut + item?.duration?.minutes;
        if (minut >= 60) {
          minut = minut - 60;
          hour = hour + 1;
        }
      }
    });

    if (hour == 0 && minut == 0) {
      setscheduleTotalTime(0);
    } else if (hour > 0 && minut > 0) {
      setscheduleTotalTime(hour + "h:" + minut + "m");
    } else if (hour == 0 && minut > 0) {
      setscheduleTotalTime("0h" + ":" + minut + "m");
    } else if (hour > 0 && minut == 0) {
      setscheduleTotalTime(hour + "h:" + "00m");
    }
    sethoursAndMinutes({ ...hoursAndMinutes, hours: hour, minutes: minut });
  };
  const renderCompletedItem = (item) => {
    return (
      <View
        style={[
          styles.innerContainer,
          styles.compltedItem,
          { backgroundColor: item.color, marginVertical: responsiveHeight(1) },
        ]}
      >
        <View style={styles.itemContainer}>
          <Text
            numberOfLines={1}
            style={[styles.itemNameText, styles.compltedItemTitleText]}
          >
            {item.taskName}
          </Text>
          <Text
            numberOfLines={1}
            style={[
              styles.itemDurationText.color,
              styles.compltedItemTitleText,
            ]}
          >
            {item?.duration?.totalDuration}
          </Text>
        </View>
      </View>
    );
  };
  const deleteTask = async (item) => {
    setExtendTime(-1);
    setRiseTime(-1);
    setCount(-1);
    //setisPlaying(false);
    await appFBS.deletData("tasks", item.id);
    await firestore().collection("tasks").onSnapshot(onResult);
    setdeleteModal(false);
  };
  const QuickActions = (item, index, drag) => {
    // console.log("indexxx", index + "_______" + drag);
    return (
      // <Animated.View
      //   style={[styles.row, styles.underlayLeft]} // Fade in on open
      // >
      <View style={styles.qaContainer}>
        <TouchableOpacity
          onPress={() => {
            updateStatus(item);
            setExtendTime(-1);
            setRiseTime(-1);
            setdummpSeconds(0);
            setCount(-1);
            setisPlaying(false);
          }}
        >
          <View style={[styles.button, styles.button4]}>
            <Text style={[styles.buttonText]}>Skip</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setcurrentOnGoingTask(item);
            // updateState(item)
            // setExtendTime(-1);
            // setRiseTime(-1);
            // setdummpSeconds(0);
            // setCount(-1);
            //setisPlaying(false);
            row[index].close();
            props.navigation.navigate("EditTask", { item: item });
          }}
        >
          <View style={[styles.button, styles.button2]}>
            <Text style={[styles.buttonText]}>Edit</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            row[index].close();
            setdeleteModal(true);
            setselectedTask(item);
          }}
        >
          <View style={[styles.button, styles.button3]}>
            <Text style={[styles.buttonText]}>Delete</Text>
          </View>
        </TouchableOpacity>
      </View>
      // </Animated.View>
    );
  };
  const undoTask = async () => {
    if (lastTaskId !== null) {
      setExtendTime(0);
      setRiseTime(0);
      setCount(-1);
      await appFBS.updateData(lastTaskId, "tasks", {
        status: "incomplete",
      });
    } else if (allTaskList.length > 0) {
      toastServices.showToast("No previous task available");
    }
  };
  // useEffect(() => {
  //   console.log(getMinutes(dummpSeconds), "dummpSeconds");
  // }, [dummpSeconds]);
  return (
    <SafeAreaView style={styles.container}>
      {allTaskList.length === 0 && visiblity === false && (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color={colors.black} />
        </View>
      )}
      {allTaskList.length === 0 && (
        <View style={styles.loading}>
          <Text style={styles.couterTimeTextBlack}>{"No task available"}</Text>
        </View>
      )}
      <StatusBar backgroundColor={"white"} barStyle="dark-content" />
      <TaskHeader
        duration={scheduleTotalTime ? scheduleTotalTime : "00:00"}
        endTime={
          totalDuration == 0
            ? "00:00"
            : moment(
                `${data.startHour}:${data.startMin} ${data.AMPM}`,
                "hh:mm a"
              )
                .add(hoursAndMinutes, "minute")
                .format("hh:mm A")
        }
        title={data?.name}
        onBackPress={() => {
          saveToFirebase();
          props.navigation.goBack();
        }}
      />

      <View style={styles.timerContainer}>
        {dummpSeconds === undefined ? null : (
          <Progress.Pie
            color={defaultColor}
            progress={riseSeconds / totalDuration}
            size={responsiveWidth(54)}
          />
        )}

        <View style={styles.absoluteTimeContainer}>
          {extendTime > 0 ? (
            <View style={{ flexDirection: "row" }}>
              <Text style={[styles.couterTimeRedText, { fontWeight: "700" }]}>
                {`+${
                  Math.trunc(extendTime / 3600) > 9
                    ? Math.trunc(extendTime / 3600) + ":"
                    : Math.trunc(extendTime / 3600) === 0
                    ? ""
                    : "0" + Math.trunc(extendTime / 3600) + ":"
                }${
                  getMinutes(extendTime) > 9
                    ? getMinutes(extendTime)
                    : "0" + getMinutes(extendTime)
                }:`}
              </Text>
              <Text style={[styles.couterTimeRedText, { fontWeight: "400" }]}>
                {Math.trunc(extendTime % 60) > 9
                  ? Math.trunc(extendTime % 60)
                  : "0" + Math.trunc(extendTime % 60)}
              </Text>
            </View>
          ) : (
            <View>
              {dummpSeconds === undefined || dummpSeconds === 0 ? (
                <Text style={styles.couterTimeText}>{"00:00:00"}</Text>
              ) : (
                <View style={{ flexDirection: "row" }}>
                  <Text style={[styles.couterTimeText, { fontWeight: "700" }]}>
                    {/* {currentOnGoingTask !== undefined && setcurrentOnGoingTask(allTaskList[0]) } */}
                    {/* {allTaskList[0].totalSeconds !== undefined && dummpSeconds === 0 ? allTaskList[0].status === 'incomplete' && setdummpSeconds(allTaskList[0].totalSeconds) : null} */}
                    {`${
                      Math.trunc(dummpSeconds / 3600) > 9
                        ? Math.trunc(dummpSeconds / 3600) + ":"
                        : Math.trunc(dummpSeconds / 3600) === 0
                        ? ""
                        : "0" + Math.trunc(dummpSeconds / 3600) + ":"
                    }${
                      getMinutes(dummpSeconds) > 9
                        ? getMinutes(dummpSeconds)
                        : "0" + getMinutes(dummpSeconds)
                    }:`}
                  </Text>
                  <Text style={[styles.couterTimeText, { fontWeight: "400" }]}>
                    {/* {currentOnGoingTask !== undefined && setcurrentOnGoingTask(allTaskList[0]) } */}
                    {/* {allTaskList[0].totalSeconds !== undefined && dummpSeconds === 0 ? allTaskList[0].status === 'incomplete' && setdummpSeconds(allTaskList[0].totalSeconds) : null} */}
                    {`${
                      Math.trunc(dummpSeconds % 60) > 9
                        ? Math.trunc(dummpSeconds % 60)
                        : "0" + Math.trunc(dummpSeconds % 60)
                    }`}
                  </Text>
                </View>
              )}
            </View>
          )}
          <TouchableOpacity
            onPress={() => {
              if (!loader) {
                if (currentOnGoingTask.status === "incomplete") {
                  // if (isPlaying) {
                  //   console.log("dispatchkskskskskTimerFn");
                  //   dispatch(
                  //     taskTimerFn(currentOnGoingTask, {
                  //       defaultColor: currentOnGoingTask?.color,
                  //       extendTime: taskTimer.extendTime,
                  //       riseSeconds: taskTimer.riseSeconds,
                  //       dummpSeconds: taskTimer.dummpSeconds,
                  //       ExtendTimeVisibility: false,
                  //       isPlaying: false,
                  //     })
                  //   );
                  // }
                  setStartTime(moment().format("hh:mma"));
                } else {
                  toastServices.showToast("No task available");
                }
              }
            }}
            style={styles.playPauseButtonContainer}
          >
            {loader ? (
              <ActivityIndicator size={50} color="black" />
            ) : isPlaying ? (
              <Icon
                name="controller-paus"
                type="entypo"
                color={extendTime > 0 ? "gray" : defaultColor}
                size={responsiveFontSize(4)}
              />
            ) : (
              <Icon
                name="controller-play"
                type="entypo"
                color={extendTime > 0 ? "gray" : defaultColor}
                size={responsiveFontSize(5)}
              />
            )}
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.flatListContainer}>
        <DraggableFlatList
          extraData={selectedId}
          data={allTaskList}
          renderItem={renderItem}
          keyExtractor={(item, index) => `draggable-item-${index}`}
          // onDragBegin={({data, from})}
          onDragEnd={({ data, from }) => draaggedItemStatus(data, from)}
        />
      </View>
      <View style={{ height: responsiveHeight(10) }} />
      <View style={styles.bottonTabContainer}>
        <TouchableOpacity
          onPress={() => {
            setisPlaying(false);
            props.navigation.navigate("AddTask", { data: data });
          }}
          style={styles.tabIconButton}
        >
          <Image style={styles.tabIconImage} source={appImages.plusIcon} />
          <Text style={[styles.tabButtonText, styles.orangeText]}>Add</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => updateStatus()}
          style={styles.tabIconButton}
        >
          <Image style={styles.tabIconImage} source={appImages.okIcon} />
          <Text style={styles.tabButtonText}>Done</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => undoTask()}
          style={styles.tabIconButton}
        >
          <Image style={styles.tabIconImage} source={appImages.undoIcon} />
          <Text style={styles.tabButtonText}>Undo</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setResetModal(true)}
          style={styles.tabIconButton}
        >
          {/* <Image style={styles.tabIconImage} source={appImages.undoIcon} /> */}
          <MaterialCommunityIcons
            style={{ color: AppColor.primary }}
            name="lock-reset"
            size={40}
          />
          <Text style={[styles.tabButtonText, styles.orangeText]}>Reset</Text>
        </TouchableOpacity>
      </View>

      <DeleteConfirmationModal
        onpressCancel={() => setdeleteModal(false)}
        onpressDelete={() => deleteTask(selectedTask)}
        setVisible={setdeleteModal}
        visible={deleteModal}
        TaskName={selectedTask?.taskName}
        type="Task"
        TaskTitle={"Are you sure you want to delete the task"}
      />
      <ResetConfirmation
        onpressCancel={() => setResetModal(false)}
        onpressDelete={() => resetAllTasks()}
        setVisible={setResetModal}
        visible={resetModal}
      />
      <LastTask
        scheduleName={data?.name}
        setVisible={setlastTasVisibility}
        visible={lastTasVisibility}
      />
      <MoveToNewTask
        setVisible={setmoveToNextTaskVisibility}
        visible={moveToNextTaskVisibility}
        CurrentTaskName={nextTaskmodalValues.CurrentTaskName}
        NextTaskName={nextTaskmodalValues.NextTaskName}
      />
      <OvertimeTask
        setVisible={setExtendTimeVisibility}
        visible={extendTimeVisibility}
        CurrentTaskName={
          allTaskList[0] !== undefined && allTaskList[0].taskName
        }
        NextTaskName={
          allTaskList[1] !== undefined && allTaskList[1].status !== "completed"
            ? allTaskList[1].taskName
            : "finished"
        }
      />
    </SafeAreaView>
  );
};
export default Tasks;
