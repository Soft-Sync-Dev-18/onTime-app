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
    resizeMode: 'contain',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: responsiveWidth(90),
    paddingHorizontal: responsiveWidth(10),
    paddingVertical: responsiveWidth(5),
  },
  cancelButton: {
    backgroundColor: 'white',
    width: responsiveHeight(16),
    height: responsiveHeight(6),
    borderRadius: responsiveWidth(2),
    borderColor: colors.gray600,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnStyle: {
    backgroundColor: colors.google,
    width: responsiveHeight(16),
    height: responsiveHeight(6),
    borderRadius: responsiveWidth(2),
    alignItems: 'center',
    justifyContent: 'center',
    // marginTop: responsiveHeight(4),
  },
  btnText: {
    fontSize: responsiveFontSize(1.8),
    fontFamily: fontFamily.appTextMedium,
    color: 'white',
  },
  cancelText: {
    color: colors.gray600,
  },
  heading: {
    fontSize: responsiveFontSize(2.2),
    color: colors.gray600,
    fontFamily: fontFamily.appTextExtraBold,
    textAlign: 'center',
    paddingTop: responsiveHeight(1),
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
