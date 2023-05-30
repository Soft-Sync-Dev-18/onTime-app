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

  logoImage: {
    marginTop: responsiveHeight(5),
    height: responsiveHeight(25),
    width: responsiveWidth(40),
    resizeMode: 'contain',
  },
  createAccountText: {
    fontSize: responsiveFontSize(1.8),
    fontFamily: fontFamily.appTextRegular,
    paddingVertical: responsiveHeight(0.8),
    color: colors.gray600,
  },
});
export default styles;
