import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Auth from './auth';
import App from './app';
import {NativeBaseProvider} from 'native-base';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
const AppStack = createNativeStackNavigator();
const Apps = () => {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <AppStack.Navigator
          screenOptions={{headerShown: false}}
          initialRouteName={Auth}>
          <AppStack.Screen name="Auth" component={Auth} />
          <AppStack.Screen name="App" component={App} />
        </AppStack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
};

export default Apps;
