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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  heading: {
    color: colors.gray600,
    fontSize: responsiveFontSize(3),
    fontFamily: fontFamily.appTextBold,
    marginTop: responsiveHeight(3),
    alignSelf: 'center',
    textAlign: 'center',
    paddingHorizontal: responsiveWidth(10),
  },
  createAccountText: {
    fontSize: responsiveFontSize(1.8),
    fontFamily: fontFamily.appTextRegular,
    color: colors.gray600,
    alignSelf: 'center',
    textAlign: 'center',
    paddingTop: responsiveHeight(0.5),
    paddingHorizontal: responsiveWidth(10),
  },
  extraPadding: {
    paddingTop: responsiveHeight(2),
  },
});
export default styles;
