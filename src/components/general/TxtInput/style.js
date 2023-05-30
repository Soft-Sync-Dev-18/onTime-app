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
  mainView: {
    width: responsiveWidth(90),
    alignSelf: 'center',
    marginVertical: responsiveHeight(1),
  },
  titleText: {
    fontSize: responsiveFontSize(2),
    color: 'black',
    fontFamily: fontFamily.appTextSemiBold,
    paddingLeft: responsiveWidth(2),
    paddingBottom: responsiveHeight(0.5),
  },
  TxtInput: {
    color: colors.gray800,
    fontFamily: fontFamily.appTextRegular,
    fontSize: responsiveFontSize(1.8),
    width: responsiveWidth(90),
    height: responsiveHeight(6.5),
    borderWidth: 1,
    borderRadius: responsiveWidth(2),
    textAlign: 'left',
    textAlignVertical: 'center',
    paddingLeft: responsiveWidth(3),
  },
});
