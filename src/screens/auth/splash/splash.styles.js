import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  logoImage: {
    height: responsiveHeight(50),
    width: responsiveWidth(50),
    resizeMode: 'cover',
  },
  imageView: {
    flex: 1,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  indicator: {
    bottom: responsiveHeight(10),
    position: 'absolute',
    alignSelf: 'center',
  },
});
export default styles;
