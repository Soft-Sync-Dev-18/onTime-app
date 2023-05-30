import React from 'react';
import {Text, View, Image, TextInput} from 'react-native';
import styles from './style';
import {appImages} from '../../../globals/utilities/assets';
export const AppHeader = ({time}) => {
  return (
    <View style={styles.container}>
      <Image source={appImages.headerLogo} style={styles.image} />

      <Text style={styles.timeText}>{time}</Text>
    </View>
  );
};
