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
    backgroundColor: 'white',
    width: responsiveWidth(90),
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  timeText: {
    color: colors.gray600,
    fontFamily: fontFamily.appTextBold,
    fontSize: responsiveFontSize(2),
  },
  image: {
    height: responsiveWidth(10),
    width: responsiveWidth(30),
    resizeMode: 'contain',
  },
});
