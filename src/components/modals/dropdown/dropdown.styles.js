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
    width: responsiveWidth(40),
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: responsiveWidth(2),
    height: responsiveHeight(30),
    alignSelf: 'center',
  },
  cancelText: {
    color: colors.gray600,
    fontSize: responsiveFontSize(2),
    fontFamily: fontFamily.appTextMedium,
    height: responsiveHeight(4),
    borderBottomColor: colors.gray600,
    borderBottomWidth: 0.5,
    width: responsiveWidth(30),
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});
export default styles;
