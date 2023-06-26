//import liraries
import React, { Component, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import ReactNativeModal from "react-native-modal";
import { appImages } from "../../../globals/utilities";
import styles from "./moveToNewTask.styles";
const OvertimeTask = ({
  visible,
  setVisible,
  CurrentTaskName,
  NextTaskName,
}) => {
  useEffect(() => {
    // setTimeout(() => {
    //   setVisible(false);
    // }, 1000);
  }, []);
  return (
    <ReactNativeModal
      isVisible={visible}
      onBackButtonPress={() => setVisible(false)}
      onBackdropPress={() => setVisible(false)}
      onRequestClose={visible}
      backdropColor="black"
      backdropOpacity={0.5}
    >
      <TouchableOpacity
        style={styles.modalView}
        activeOpacity={1}
        onPress={() => {
          setVisible(false);
        }}
      >
        <Image style={styles.icon} source={appImages.clockImage} />
        {NextTaskName === "finished" ? (
          <Text style={styles.heading}>
            Time up! {"\n"} Tap Done to finish task
            {/* No further task available */}
          </Text>
        ) : (
          <Text style={styles.heading}>
            Time up! {"\n"} Tap Done to move on to {NextTaskName}
          </Text>
        )}
      </TouchableOpacity>
    </ReactNativeModal>
  );
};

export default OvertimeTask;
