//import liraries
import React, {Component, useEffect} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import ReactNativeModal from 'react-native-modal';
import {appImages} from '../../../globals/utilities';
import styles from './lastTask.styles';
const LastTask = ({visible, setVisible, scheduleName}) => {
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
      backdropOpacity={0.5}>
      <View style={styles.modalView}>
        <Image style={styles.icon} source={appImages.clockImage} />
        <Text style={styles.heading}>{scheduleName} complete !</Text>
      </View>
    </ReactNativeModal>
  );
};

export default LastTask;
