//import liraries
import React, {Component, useState} from 'react';
import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import ReactNativeModal from 'react-native-modal';
import styles from './dropdown.styles';
const DropDown = ({data, visible, setVisible, setData}) => {
  const renderItem = (item, index) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setData(item);
          setVisible(false);
        }}>
        <Text style={styles.cancelText}>{item}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <ReactNativeModal
      isVisible={visible}
      onBackButtonPress={() => setVisible(false)}
      onBackdropPress={() => setVisible(false)}
      backdropColor="black"
      backdropOpacity={0.5}>
      <View style={styles.modalView}>
        <FlatList
          data={data}
          renderItem={({item}) => renderItem(item)}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </ReactNativeModal>
  );
};

export default DropDown;
