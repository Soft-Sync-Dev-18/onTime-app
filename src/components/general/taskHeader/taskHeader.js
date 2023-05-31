import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, Alert } from "react-native";
import { Icon } from "react-native-elements";
import { responsiveFontSize } from "react-native-responsive-dimensions";
import { colors } from "../../../globals/utilities";
import styles from "./taskHeader.styles";
import KeepAwake from "react-native-keep-awake";
import AsyncStorage from "@react-native-async-storage/async-storage";
const TaskHeader = ({ time, title, duration, endTime, onBackPress }) => {
  const [awakeHolder, setAwakeHolder] = useState(false);
  useEffect(async () => {
    let asd = await AsyncStorage.getItem("screenAwake");
    if (asd === "true") {
      KeepAwake.activate();
      setAwakeHolder(true);
    }
  }, []);
  const EnableAwake = async (value) => {
    await AsyncStorage.setItem("screenAwake", value ? "true" : "false");
    setAwakeHolder(value);
    if (value) {
      KeepAwake.activate();
      Alert.alert("Mobile Screen Will be Awake for infinite time.");
    } else {
      KeepAwake.deactivate();
      Alert.alert("Screen Awake Reset Successfully.");
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.topHeadingContainer}>
        <TouchableOpacity onPress={onBackPress}>
          <Icon
            name="arrow-back-ios"
            type="materialicon"
            color={colors.gray600}
            size={responsiveFontSize(3.5)}
            style={{ width: 30 }}
          />
        </TouchableOpacity>
        <Text style={styles.heading}>{title}</Text>

        {awakeHolder == false ? (
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.button}
            onPress={() => EnableAwake(true)}
          >
            <Text style={styles.buttonText}>OFF</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            activeOpacity={0.8}
            style={[styles.button, { backgroundColor: "green" }]}
            onPress={() => EnableAwake(false)}
          >
            <Text style={styles.buttonText}>ON</Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.bottomContainer}>
        <View style={styles.innerContainer}>
          <View style={styles.durationTopContainer}>
            <Text style={styles.timeText}>{duration}</Text>
          </View>
          <Text style={styles.subTitle}>DURATION</Text>
        </View>
        <View>
          <View style={styles.durationTopContainer}>
            <Text style={styles.timeText}>{endTime}</Text>
          </View>
          <Text style={styles.subTitle}>END TIME</Text>
        </View>
      </View>
    </View>
  );
};
export default TaskHeader;
