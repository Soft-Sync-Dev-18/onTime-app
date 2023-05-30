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
    width: responsiveWidth(60),
    height: responsiveHeight(35),
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: responsiveWidth(3),
    borderWidth: responsiveWidth(0.1),
    borderColor: 'white',
    marginHorizontal: responsiveHeight(1),
    marginBottom: responsiveHeight(1)
  },
  image: {
    height: responsiveWidth(70),
    width: responsiveWidth(40),
  },
  mainView2:{
      flexDirection:"row",
      width: responsiveWidth(55),
      alignSelf:'center',
      justifyContent:"space-between",
      alignItems:'center',
      marginTop: responsiveHeight(2)
  },
  Title:{
      color: textColor.white,
      fontFamily: fontFamily.appTextSemiBold,
      fontSize: responsiveFontSize(1.8)
  },
  time:{
      color: textColor.white,
      fontFamily: fontFamily.appTextRegular,
      fontSize: responsiveFontSize(1.4)
  },
  buton:{
      backgroundColor: textColor.white,
      width: responsiveWidth(25),
      alignItems:"center",
      height: responsiveHeight(5.5),
      justifyContent:"center",
      borderRadius: responsiveWidth(7),
      position: 'absolute',
      bottom: responsiveHeight(1),
      right: responsiveWidth(1)
  },
  start:{
      fontSize: responsiveFontSize(1.8),
      color: AppColor.primary,
      fontFamily: fontFamily.appTextBold
  }

});
