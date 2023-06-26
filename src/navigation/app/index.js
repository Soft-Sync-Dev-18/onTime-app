import {
  Home,
  Tasks,
  Setting,
  AddTask,
  AddSchedule,
  EditSchedule,
  EditTask,
} from "../../screens/app";
import { responsiveHeight } from "react-native-responsive-dimensions";

import React from "react";
import { Platform, StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BackgroundFetchScreen from "../background";
const HomeStack = createNativeStackNavigator();

const App = () => {
  return (
    <HomeStack.Navigator
      screenOptions={{ headerShown: false, gestureEnabled: false }}
      defaultScreenOptions={{ gestureEnabled: false }}
      initialRouteName={"Home"}
    >
      <HomeStack.Screen name={"Home"} component={Home} />
      {/* <HomeStack.Screen name={'Tasks'} component={Tasks} /> */}
      <HomeStack.Screen name={"Tasks"} component={BackgroundFetchScreen} />
      <HomeStack.Screen name={"Setting"} component={Setting} />
      <HomeStack.Screen name={"AddTask"} component={AddTask} />
      <HomeStack.Screen name={"AddSchedule"} component={AddSchedule} />
      <HomeStack.Screen name={"EditSchedule"} component={EditSchedule} />
      <HomeStack.Screen name={"EditTask"} component={EditTask} />
    </HomeStack.Navigator>
  );
};

export default App;

const styles = StyleSheet.create({
  bottomTabBarContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  navigator: {
    borderTopWidth: 0,
    backgroundColor: "transparent",
    elevation: 30,
    height:
      Platform.OS === "android" ? responsiveHeight(7) : responsiveHeight(6),
  },
});
