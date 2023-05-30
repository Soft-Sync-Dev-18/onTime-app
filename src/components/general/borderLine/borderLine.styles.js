//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {
  responsiveFontSize,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {colors, fontFamily} from '../../../globals/utilities';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: responsiveWidth(90),
    alignItems: 'center',
    alignSelf: 'center',
  },
  orText: {
    color: colors.gray600,
    fontSize: responsiveFontSize(2.2),
    fontFamily: fontFamily.appTextBold,
  },
  borderView: {
    borderWidth: 1,
    width: responsiveWidth(40),
    borderColor: colors.gray600,
  },
});

export default styles;
