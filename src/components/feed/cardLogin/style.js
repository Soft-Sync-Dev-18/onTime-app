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
} from '../../../globals/utilities/index';

export default StyleSheet.create({
  mainView: {
    width: responsiveWidth(90),
    marginVertical: responsiveHeight(3),
    paddingVertical: responsiveHeight(0.8),
    backgroundColor: 'white',
    alignSelf:'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: responsiveWidth(3),
  },
  image: {
    height: responsiveHeight(3),
    width: responsiveWidth(10),
    resizeMode: 'contain',
  },
  innerView: {
    marginVertical: responsiveHeight(1.5),
    paddingHorizontal: responsiveWidth(3),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  title: {
    color: 'white',
    paddingLeft: responsiveWidth(0.5),
    fontSize: responsiveFontSize(2),
    fontFamily: fontFamily.appTextSemiBold,
    // paddingVertical: responsiveHeight(0.8),
  },
});
