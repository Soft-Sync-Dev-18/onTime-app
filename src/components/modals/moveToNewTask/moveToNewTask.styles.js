import {StyleSheet} from 'react-native';

import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {AppColor, colors, fontFamily} from '../../../globals/utilities';
const styles = StyleSheet.create({
  container: {},
  modalView: {
    backgroundColor: 'white',
    width: responsiveWidth(90),
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: responsiveWidth(2),
    paddingBottom: responsiveHeight(2),
  },
  icon: {
    height: responsiveHeight(4),
    width: responsiveWidth(7),
    marginTop: responsiveHeight(2),
    marginBottom: responsiveHeight(2),
    resizeMode: 'contain',
  },

  heading: {
    fontSize: responsiveFontSize(2.2),
    color: colors.gray500,
    fontFamily: fontFamily.appTextExtraBold,
    textAlign: 'center',
    paddingTop: responsiveHeight(1),
    lineHeight: 20,
    paddingHorizontal: responsiveWidth(10),
  },
  subHEading: {
    fontSize: responsiveFontSize(2),
    color: colors.gray600,
    fontFamily: fontFamily.appTextRegular,
    textAlign: 'center',
    paddingTop: responsiveHeight(1),
    paddingHorizontal: responsiveWidth(10),
  },
});
export default styles;
