//import liraries
import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import ReactNativeModal from 'react-native-modal';
import {appImages} from '../../../globals/utilities';
import styles from './deleteConfirmation.styles';
const ResetConfirmation = ({
  onpressDelete,
  onpressCancel,
  visible,
  setVisible,
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
        <Text style={styles.heading}>Are you sure you want to reset all Tasks?</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={onpressCancel} style={styles.cancelButton}>
            <Text style={[styles.btnText, styles.cancelText]}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onpressDelete} style={styles.btnStyle}>
            <Text style={styles.btnText}>Reset</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ReactNativeModal>
  );
};

export default ResetConfirmation;
