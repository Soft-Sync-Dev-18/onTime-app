//import liraries
import React, { Component, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import ReactNativeModal from 'react-native-modal';
import { appImages } from '../../../globals/utilities';
import styles from './moveToNewTask.styles';
const MoveToNewTask = ({
  visible,
  setVisible,
  CurrentTaskName,
  NextTaskName,
}) => {
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
        {NextTaskName === 'finished' ? <Text style={styles.heading}>
          {CurrentTaskName} is over. {'\n'} No further task available
        </Text> :
          <Text style={styles.heading}>
            {CurrentTaskName} is over. {'\n'} Move to {NextTaskName}
          </Text>
        }
      </View>
    </ReactNativeModal>
  );
};

export default MoveToNewTask;
