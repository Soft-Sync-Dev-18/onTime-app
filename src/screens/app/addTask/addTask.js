import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { TxtInput as TextInput } from "../../../components/general/TxtInput";
import ReactNativeModal from "react-native-modal";
import styles from "./addTask.styles";
import { ColorPicker, fromHsv } from "react-native-color-picker";
import moment from "moment";
import {
  hours as hoursData,
  minuts as minutesData,
} from "../../../services/DataSet";
import { appImages, colors } from "../../../globals/utilities";
import toastServices from "../../../services/toastServices/toast.services";
import DropDown from "../../../components/modals/dropdown/dropdown";
import { appFBS } from "../../../services/firebaseServices/firebaseServices";
const AddTask = (props) => {
  var data = props?.route?.params?.data;
  const [colorModal, setcolorModal] = useState(false);
  const [color, setColor] = useState(colors.google);
  const [taskName, settaskName] = useState();
  const [loading, setloading] = useState(false);
  const [selectedColor, setselectedColor] = useState(colors.google);
  const [time, setTime] = useState(moment().format("LT"));
  const [hours, sethours] = useState(hoursData[0]);
  const [minutes, setminutes] = useState(minutesData[0]);
  const [minutesModalVisibility, setminutesModalVisibility] = useState(false);
  const [hoursModalVisibility, sethoursModalVisibility] = useState(false);
  const [duration, setduration] = useState({});
  const addNewTask = async (obj) => {
    setloading(true);
    obj = { ...obj, scheduleId: data?.id };
    await appFBS.postData("tasks", obj);
    setTime(null);
    toastServices.showToast("Task added");
    setloading(false);
    props.navigation.goBack();
  };
  const validateInfo = async () => {
    let obj = {};
    if (!taskName || taskName.length == 0) {
      toastServices.showToast("Please enter task name");
    } else if (hours == 0 && minutes == 0) {
      toastServices.showToast("Please select task duration");
    } else {
      obj = {
        ...obj,
        duration: duration,
        durationRemaining: { ...duration, seconds: 0 },
        startTimer: false,
        taskName: taskName.trim(),
        color: color,
        status: "incomplete",
      };
      await addNewTask(obj);
    }
  };
  useEffect(() => {
    manageDuration(hours, minutes);
  }, [hours, minutes]);
  const manageDuration = (hours, minutes) => {
    if (hours > 0) {
      if (minutes > 0) {
        setduration({
          ...duration,
          totalDuration: hours + " h" + ":" + minutes + " m",
          hours: hours,
          minutes: minutes,
        });
      } else {
        setduration({
          ...duration,
          totalDuration: hours + " h",
          hours: hours,
          minutes: minutes,
        });
      }
    } else {
      setduration({
        ...duration,
        totalDuration: minutes + " m",
        minutes: minutes,
        hours: hours,
      });
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>New Task </Text>
      <View style={styles.inputContainer}>
        <TextInput
          value={taskName}
          onChangeText={settaskName}
          title={"Task Name"}
          placeholder={"Task Name"}
        />
      </View>
      <View style={styles.colorContainer}>
        <Text style={styles.labelText}>Duration</Text>
        <View
          style={{
            ...styles.colorBUtton,
            borderWidth: 1,
          }}
        >
          <TouchableOpacity
            style={styles.durationButton}
            onPress={() => sethoursModalVisibility(true)}
          >
            <Text style={styles.durationText}>{hours} h</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.durationButton}
            onPress={() => setminutesModalVisibility(true)}
          >
            <Text style={styles.durationText}>{minutes} m</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.colorContainer}>
        <Text style={styles.labelText}>Task Color</Text>
        <TouchableOpacity
          onPress={() => setcolorModal(true)}
          style={{
            ...styles.colorBUtton,
            backgroundColor: selectedColor,
          }}
        ></TouchableOpacity>
      </View>
      <View style={styles.bottonTabContainer}>
        <TouchableOpacity
          onPress={() => props.navigation.goBack()}
          style={styles.tabIconButton}
        >
          <Image style={styles.tabIconImage} source={appImages.cancelIcon} />
          <Text style={styles.tabButtonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => validateInfo()}
          disabled={loading}
          style={styles.tabIconButton}
        >
          {loading ? (
            <View style={styles.indicatorView}>
              <ActivityIndicator color={"white"} size="small" />
            </View>
          ) : (
            <Image style={styles.tabIconImage} source={appImages.doneIcon} />
          )}
          <Text style={[styles.tabButtonText, styles.orangeText]}>Save</Text>
        </TouchableOpacity>
      </View>
      <ReactNativeModal style={{ margin: 0 }} isVisible={colorModal}>
        <View style={styles.colorModalContainer}>
          <Text style={styles.colorModalHeadingText}>Select Color</Text>
          <ColorPicker
            onColorChange={(e) => {
              setColor(fromHsv(e));
              setselectedColor(fromHsv(e));
            }}
            hideSliders
            onColorSelected={(e) => {
              setColor(e), setselectedColor(e);
            }}
            style={styles.colorPicker}
          />
          <TouchableOpacity
            onPress={() => {
              setcolorModal(false);
            }}
            style={{ ...styles.addColorButton, backgroundColor: selectedColor }}
          >
            <Text style={styles.addColorButtonText}>add color</Text>
          </TouchableOpacity>
        </View>
      </ReactNativeModal>
      <DropDown
        data={minutesData}
        setVisible={setminutesModalVisibility}
        visible={minutesModalVisibility}
        setData={setminutes}
      />
      <DropDown
        data={hoursData}
        setVisible={sethoursModalVisibility}
        visible={hoursModalVisibility}
        setData={sethours}
      />
    </SafeAreaView>
  );
};

export default AddTask;
