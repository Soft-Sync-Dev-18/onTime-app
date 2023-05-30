import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';

import {AppColor, colors, textColor} from '../../../globals/utilities';
import {fontFamily} from '../../../globals/utilities';

export const styles = {
  container: {
    marginTop: responsiveHeight(2),
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: responsiveWidth(2),
    backgroundColor: 'white',
    justifyContent: 'center',
    width: responsiveWidth(90),
    borderWidth: 1,
    borderColor: colors.gray600,
  },
  title: {
    color: colors.gray600,
    fontSize: responsiveFontSize(1.8),
    fontFamily: fontFamily.appTextBold,
    paddingVertical: responsiveHeight(2),
  },
};
