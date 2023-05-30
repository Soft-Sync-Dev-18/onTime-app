import {StyleSheet} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {TxtInput} from '.';
import {
  textColor,
  fontFamily,
  AppColor,
  colors,
} from '../../../globals/utilities/index';

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: responsiveWidth(90),
    flexDirection: 'row',
    alignSelf: 'center',
    height: responsiveHeight(6),
  },
  backIcon: {
    height: responsiveHeight(4.5),
    width: responsiveWidth(3.5),
    resizeMode: 'contain',
  },
  titleText: {
    color: colors.gray600,
    fontFamily: fontFamily.appTextBold,
    fontSize: responsiveFontSize(1.8),
    paddingLeft: responsiveWidth(5),
  },
});
