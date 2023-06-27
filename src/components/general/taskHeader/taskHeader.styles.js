import {StyleSheet} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

import {fontFamily, colors} from '../../../globals/utilities/index';

export default StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: responsiveWidth(90),
    alignSelf: 'center',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  topHeadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  heading: {
    color: colors.gray600,
    fontFamily: fontFamily.appTextExtraBold,
    fontSize: responsiveFontSize(3.5),
    paddingLeft: responsiveWidth(1),
    width:'83%',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:35,
    backgroundColor: 'red',
    width: 35,
    height:35
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontSize:12,
    fontWeight:'600'
  },
  durationTopContainer: {
    backgroundColor: colors.gray500,
    borderRadius: responsiveHeight(2),
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: responsiveHeight(0.2),
  },
  timeText: {
    color: 'white',
    fontFamily: fontFamily.appTextRegular,
    fontWeight:"600",
    fontSize: responsiveFontSize(1.8),
    textAlign: 'center',
    textAlignVertical: 'center',
    width: responsiveWidth(22),
  },
  subTitle: {
    color: colors.gray600,
    fontFamily: fontFamily.appTextExtraBold,
    fontSize: responsiveFontSize(1.8),
    textAlign: 'center',
    textAlignVertical: 'center',
    letterSpacing: 1,
    paddingVertical: responsiveHeight(0.5),
  },
  bottomContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: responsiveWidth(90),
    marginTop: responsiveHeight(2),
  },
  innerContainer: {},
});
