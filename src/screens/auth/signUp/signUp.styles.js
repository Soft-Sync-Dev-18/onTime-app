import {forFade} from '@react-navigation/stack/lib/typescript/src/TransitionConfigs/HeaderStyleInterpolators';
import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

import {AppColor, colors, fontFamily} from '../../../globals/utilities';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  mainView: {
    backgroundColor: 'white',
    // alignItems: 'center',
  },
  heading: {
    color: colors.gray600,
    fontSize: responsiveFontSize(3),
    fontFamily: fontFamily.appTextBold,
    marginTop: responsiveHeight(3),
    paddingBottom: responsiveHeight(2),
    alignSelf: 'center',
  },
  image: {
    width: responsiveWidth(40),
    alignSelf: 'center',
    height: responsiveHeight(25),
    resizeMode: 'contain',
  }, 
    wrapper: {
    width: responsiveWidth(90),
    alignSelf: 'center',
  },

  inputText: {
    fontSize: responsiveFontSize(1.5),
  },
  createAccountText: {
    fontSize: responsiveFontSize(1.8),
    fontFamily: fontFamily.appTextRegular,
    paddingVertical: responsiveHeight(0.8),
    color: colors.gray600,
    alignSelf: 'center',
  },
  errorText: {
    color: colors.google,
    marginLeft: responsiveWidth(2),
    marginVertical: responsiveHeight(0.5),
    fontFamily: fontFamily.appTextMedium,
    fontSize: responsiveFontSize(1.5),
  },
});
export default styles;
