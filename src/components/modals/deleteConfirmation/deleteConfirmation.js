//import liraries
import React, {Component, useState} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import ReactNativeModal from 'react-native-modal';
import {appImages} from '../../../globals/utilities';
import styles from './deleteConfirmation.styles';
const DeleteConfirmation = ({
  onpressDelete,
  onpressCancel,
  visible,
  setVisible,
  TaskName,
  type,
}) => {
  return (
    <ReactNativeModal
      isVisible={visible}
      onBackButtonPress={() => setVisible(false)}
      onBackdropPress={() => setVisible(false)}
      backdropColor="black"
      backdropOpacity={0.5}>
      <View style={styles.modalView}>
        <Image style={styles.icon} source={appImages.warningIcon} />
        <Text style={styles.heading}>Are you sure?</Text>
        <Text style={styles.subHEading}>
          Delete <Text>{TaskName + type}</Text>
        </Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={onpressCancel} style={styles.cancelButton}>
            <Text style={[styles.btnText, styles.cancelText]}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onpressDelete} style={styles.btnStyle}>
            <Text style={styles.btnText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ReactNativeModal>
  );
};

export default DeleteConfirmation;
