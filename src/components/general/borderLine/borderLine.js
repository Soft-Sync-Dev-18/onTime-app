//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {responsiveHeight} from 'react-native-responsive-dimensions';
import styles from './borderLine.styles';
const BorderLine = ({marginTop = 1}) => {
  return (
    <View
      style={{
        ...styles.container,
        marginTop: marginTop ? responsiveHeight(marginTop) : null,
      }}>
      <View style={styles.borderView} />
      <Text style={styles.orText}>OR</Text>
      <View style={styles.borderView} />
    </View>
  );
};

export default BorderLine;
