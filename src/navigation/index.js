import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Auth from "./auth";
import App from "./app";
import { NativeBaseProvider } from "native-base";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider } from "react-redux";
import store from "../store/index";
import { Notifications } from "react-native-notifications";
const AppStack = createNativeStackNavigator();
const Apps = () => {
  Notifications.events().registerNotificationReceivedForeground(
    (notification, completion) => {
      console.log("Notification received in the foreground:", notification);
      completion({ alert: true, sound: true, badge: true }); // Modify as per your needs
    }
  );

  // Configure notification behavior
  Notifications.events().registerNotificationOpened(
    (notification, completion) => {
      console.log("Notification opened:", notification);
      completion(); // Call completion function to finish handling the notification
    }
  );

  // Request necessary permissions (optional, based on your requirements)
  Notifications.registerRemoteNotifications();
  return (
    <Provider store={store}>
      <NativeBaseProvider>
        <NavigationContainer>
          <AppStack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName={Auth}
          >
            <AppStack.Screen name="Auth" component={Auth} />
            <AppStack.Screen name="App" component={App} />
          </AppStack.Navigator>
        </NavigationContainer>
      </NativeBaseProvider>
    </Provider>
  );
};

export default Apps;
