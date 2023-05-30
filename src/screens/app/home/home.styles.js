import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

import {
  AppColor,
  textColor,
  fontFamily,
  colors,
} from '../../../globals/utilities/';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: textColor.white,
    paddingTop: responsiveHeight(1),
  },
  flatlistContainer: {
    flex: 1,
    marginTop: responsiveHeight(2),
  },
  MainView: {
    height: responsiveHeight(20),
    width: responsiveWidth(100),
    borderBottomLeftRadius: responsiveWidth(5),
    borderBottomRightRadius: responsiveWidth(5),
    backgroundColor: AppColor.secondry,
    zIndex: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },

  itemContainer: {
    alignSelf: 'center',
    width: responsiveWidth(90),
    height: responsiveHeight(10),
    borderRadius: responsiveWidth(2),
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
    marginVertical: responsiveHeight(1),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: responsiveWidth(5),
    borderWidth: 2,
    borderColor: colors.gray600,
  },
  itemNameText: {
    color: colors.gray600,
    fontFamily: fontFamily.appTextExtraBold,
    fontSize: responsiveFontSize(2),
  },
  itemTimeText: {
    color: colors.gray600,
    fontFamily: fontFamily.appTextExtraBold,
    fontSize: responsiveFontSize(2),
  },
  button: {
    height: responsiveHeight(8),
    width: responsiveWidth(20),
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: responsiveWidth(2),
  },
  button1: {
    backgroundColor: colors.google,
  },
  button2: {
    backgroundColor: colors.facebook,
    marginRight: responsiveWidth(1),
  },
  button3: {
    backgroundColor: '#c00d1d',
  },
  qaContainer: {
    flex: 1,
    height: responsiveHeight(8),
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: responsiveWidth(5),
  },
  buttonText: {
    fontSize: responsiveFontSize(2),
    color: colors.gray100,
    fontFamily: fontFamily.appTextExtraBold,
  },
  bottonTabContainer: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: responsiveWidth(100),
    justifyContent: 'space-between',
    paddingVertical: responsiveHeight(0.6),
    paddingBottom:20,
    paddingHorizontal: responsiveWidth(6),
  },
  tabIconButton: {
    alignItems: 'center',
    paddingVertical: responsiveHeight(0.5),
  },
  tabIconImage: {
    resizeMode: 'contain',
    height: responsiveHeight(4.5),
    width: responsiveWidth(7.5),
  },
  tabButtonText: {
    fontSize: responsiveFontSize(1.6),
    color: colors.gray600,
    fontFamily: fontFamily.appTextBold,
    paddingTop: responsiveHeight(0.5),
  },
  orangeText: {
    color: AppColor.primary,
  },
});
export default styles;
