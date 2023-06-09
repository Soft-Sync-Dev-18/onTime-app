import BackgroundTimer from "react-native-background-timer";
import NotificationSounds, {
  playSampleSound,
} from "react-native-notification-sounds";
import { Notifications } from "react-native-notifications";
import { colors } from "../globals/utilities";
import {
  SET_USER_INFO,
  SET_POST_INFO,
  SET_ORDER,
  SET_TIMER,
} from "./action-types";

const setUserInformation = (payload) => {
  return (dispatch, getState) => {
    dispatch({
      type: SET_USER_INFO,
      payload,
    });
  };
};
const setPostInformation = (payload) => {
  return (dispatch, getState) => {
    dispatch({
      type: SET_POST_INFO,
      payload,
    });
  };
};
const setOrderInformation = (payload) => {
  return (dispatch, getState) => {
    dispatch({
      type: SET_ORDER,
      payload,
    });
  };
};
let num = 1;
let interval;
const startInterVal = (
  currentOnGoingTask,
  taskTimer,
  bool,
  setDate,
  dispatch,
  getState
) => {
  let obj = taskTimer;

  interval = setInterval(() => {
    console.log(num++);

    // if (obj?.isPlaying && currentOnGoingTask.status === "incomplete") {
    // console.log(obj, "obj-objobj-obj-objobjx");
    dispatch(setTaskTimer(false));
    if (obj.extendTime > 0) {
      // console.log(extendTime, "extendTime");
      obj.extendTime = obj?.extendTime + 1;
      obj.defaultColor = colors.gray600;
      if (obj.extendTime % 300 === 0) {
        console.log(obj.extendTime);
        const notification = {
          title: "Hello",
          body: "This is a notification from React Native",
        };

        // Send the notification
        Notifications.postLocalNotification(notification);

        NotificationSounds.getNotifications("notification").then(
          (soundsList) => {
            console.log("SOUNDS", JSON.stringify(soundsList));
            if (soundsList.length !== 0) {
              playSampleSound(soundsList[1]);
            } else {
              console.log("if you want to stop any playing sound just call");
            }
            // if you want to stop any playing sound just call:
            // stopSampleSound();
          }
        );
      }
    } else {
      if (obj.dummpSeconds !== undefined) {
        obj.dummpSeconds = obj.dummpSeconds - 1;
        obj.riseTime = obj.riseSeconds + 1;
        if (obj.dummpSeconds === 1) {
          const notification = {
            title: "Hello",
            body: "This is a notification from React Native",
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
          obj.ExtendTimeVisibility = true;
          obj.extendTime = 1;
        }
      }
      // setCount(0);
    }
    dispatch(setTaskTimer(obj));

    // } else {
    //   obj.isPlaying = false;
    //   console.log("CLEARRRR");
    //   dispatch(setTaskTimer(false));
    //   // BackgroundTimer.stop(timer);
    //   return () => clearInterval(timer);
    // }
    console.log(obj, "objobjobjobjobjobjobjobjobjobjobjobjobj");
    if (!taskTimer.isPlaying && currentOnGoingTask.status !== "incomplete") {
      obj.isPlaying=false
      console.log("clearInterval22222");
      dispatch(setTaskTimer({ ...obj, isPlaying: false }));
      return clearInterval(interval);
    }
  }, 1000);
};
export const taskTimerFn = (currentOnGoingTask, taskTimer, bool, setDate) => {
  return (dispatch, getState) => {
    let obj = taskTimer;
    console.log("runnnnnnnnnnnnnnnnnnnnn");
    console.log("JJJjjjjjjjjJJJjjjJJjjjJjjjjjjJJjjjJJJJ");
    console.log(interval,"interval");

    let timer;
    if (taskTimer.isPlaying) {
      startInterVal(
        currentOnGoingTask,
        taskTimer,
        bool,
        setDate,
        dispatch,
        getState
      );
      //  timer = setInterval(() => {
      //     console.log(num++)
      //     // if(!taskTimer.isPlaying){
      //     //   clearInterval(timer)
      //     // }
      //     // if (obj?.isPlaying && currentOnGoingTask.status === "incomplete") {
      //     //   console.log(obj, "obj-objobj-obj-objobjx");
      //     //   dispatch(setTaskTimer(false));
      //     //   if (obj.extendTime > 0) {
      //     //     // console.log(extendTime, "extendTime");
      //     //     obj.extendTime = obj?.extendTime + 1;
      //     //     obj.defaultColor = colors.gray600;
      //     //     if (obj.extendTime % 300 === 0) {
      //     //       console.log(obj.extendTime);
      //     //       const notification = {
      //     //         title: "Hello",
      //     //         body: "This is a notification from React Native",
      //     //       };

      //     //       // Send the notification
      //     //       Notifications.postLocalNotification(notification);

      //     //       NotificationSounds.getNotifications("notification").then(
      //     //         (soundsList) => {
      //     //           console.log("SOUNDS", JSON.stringify(soundsList));
      //     //           if (soundsList.length !== 0) {
      //     //             playSampleSound(soundsList[1]);
      //     //           } else {
      //     //             console.log(
      //     //               "if you want to stop any playing sound just call"
      //     //             );
      //     //           }
      //     //           // if you want to stop any playing sound just call:
      //     //           // stopSampleSound();
      //     //         }
      //     //       );
      //     //     }
      //     //   } else {
      //     //     if (obj.dummpSeconds !== undefined) {
      //     //       obj.dummpSeconds = obj.dummpSeconds - 1;
      //     //       obj.riseTime = obj.riseSeconds + 1;
      //     //       if (obj.dummpSeconds === 1) {
      //     //         const notification = {
      //     //           title: "Hello",
      //     //           body: "This is a notification from React Native",
      //     //         };

      //     //         // Send the notification
      //     //         Notifications.postLocalNotification(notification);
      //     //         NotificationSounds.getNotifications("notification").then(
      //     //           (soundsList) => {
      //     //             // console.warn('SOUNDS', JSON.stringify(soundsList));
      //     //             if (soundsList.length !== 0) {
      //     //               playSampleSound(soundsList[1]);
      //     //             }
      //     //             // if you want to stop any playing sound just call:
      //     //             // stopSampleSound();
      //     //           }
      //     //         );
      //     //         obj.ExtendTimeVisibility = true;
      //     //         obj.extendTime = 1;
      //     //       }
      //     //     }
      //     //     // setCount(0);
      //     //   }
      //     //   dispatch(setTaskTimer(obj));
      //     // } else {
      //     //   obj.isPlaying = false;
      //     //   console.log("CLEARRRR");
      //     //   dispatch(setTaskTimer(false));
      //     //   // BackgroundTimer.stop(timer);
      //     //   return () => clearInterval(timer);
      //     // }
      //   }, 1000);
      // return () => clearInterval(timer);
    } else {
      dispatch(setTaskTimer(false));
      console.log("clearInterval");
      dispatch(setTaskTimer({ ...obj, isPlaying: false }));
      obj.isPlaying = false;
      return clearInterval(interval);
    }
  };
};
export const setTaskTimer = (payload) => {
  return (dispatch, getState) => {
    dispatch({
      type: SET_TIMER,
      payload,
    });
  };
};

export const ACTIONS = {
  setUserInformation,
  setPostInformation,
  setOrderInformation,
};
