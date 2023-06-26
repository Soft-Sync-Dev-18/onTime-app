import React, { useEffect } from "react";
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
  // useEffect(() => {
  //   // Push notifications setup (recommend extracting into separate file)
  //   // PushNotificationIOS.configure({
  //   //   // onNotification is called when a notification is to be emitted
  //   //   onNotification: (notification) => console.log(notification),

  //   //   // Permissions to register for iOS
  //   //   permissions: {
  //   //     alert: true,
  //   //     badge: true,
  //   //     sound: true,
  //   //   },
  //   //   popInitialNotification: true,
  //   // });

  //   // Background fetch setup (recommend extracting into separate file)
  //   BackgroundFetch.configure(
  //     {
  //       minimumFetchInterval: 1, // fetch interval in minutes
  //     },
  //     async (taskId) => {
  //       console.log("Received background-fetch event: ", taskId);

  //       // 3. Insert code you want to run in the background, for example:
  //       // const outsideTemperature = await getTemperatureInCelsius();

  //       // if (outsideTemperature <= 0) {
  //       //   // 4. Send a push notification
  //       //   PushNotificationIOS.localNotification({
  //       //     title: "Cold Weather Alert",
  //       //     message: `It's ${outsideTemperature} degrees outside.`,
  //       //     playSound: true,
  //       //     soundName: "default",
  //       //   });
  //       // }

  //       // Call finish upon completion of the background task
  //       BackgroundFetch.finish(taskId);
  //     },
  //     (error) => {
  //       console.error("RNBackgroundFetch failed to start.");
  //     }
  //   );
  // }, []);
  Notifications.events().registerNotificationReceivedBackground(
    (notification, completion) => {
      console.log("Notification received in the background:", notification);
      completion({
        alert: true,
        sound: true,
        badge: true,
        popInitialNotification: true,
      }); // Modify as per your needs
    }
  );

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
