import {StyleSheet} from 'react-native';
import {color} from 'react-native-reanimated';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {
  AppColor,
  textColor,
  fontFamily,
  colors,
} from '../../../globals/utilities/';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: textColor.white,
    paddingTop: responsiveHeight(1),
  },
  MainView: {
    height: responsiveHeight(20),
    width: responsiveWidth(100),
    borderBottomLeftRadius: responsiveWidth(5),
    borderBottomRightRadius: responsiveWidth(5),
    backgroundColor: AppColor.primary,
    zIndex: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: responsiveWidth(5),
    paddingVertical: responsiveHeight(1),
  },
  headerText: {
    fontSize: responsiveFontSize(2),
    color: colors.black,
  },
  headerTextBold: {
    fontWeight: '900',
  },
  /////////////////////////////// flatList Style
  flatListContainer: {
    // maxHeight: responsiveHeight(30),
    // minHeight: responsiveHeight(20),
    flex:1
  },

  itemTopContainer: {
    alignSelf: 'center',
    width: responsiveWidth(90),
    // height: responsiveHeight(11),
    borderRadius: responsiveWidth(2),
    // backgroundColor: 'white',
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
    // elevation: 2,
    marginVertical: responsiveHeight(1),
    // justifyContent: 'space-between',
    // flexDirection: 'row',
    // alignItems: 'center',
    // paddingHorizontal: responsiveWidth(5),
  },
  innerContainer: {
    alignSelf: 'center',
    width: responsiveWidth(90),
    height: responsiveHeight(11.5),
    borderRadius: responsiveWidth(2),
    // borderTopLeftRadius: responsiveWidth(2),
    // borderTopRightRadius: responsiveWidth(2),
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: responsiveWidth(5),
  },
  itemBottomTimeContainer: {
    width: responsiveWidth(90),
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomRightRadius: responsiveWidth(2),
    borderBottomLeftRadius: responsiveWidth(2),
    // paddingVertical: responsiveHeight(0.5),
  },
  bottonTimerText: {
    fontSize: responsiveFontSize(2.2),
    color: 'white',
    fontFamily: fontFamily.appTextBold,
  },
  ///////////////////////////timer style
  playPauseButtonContainer: {
    alignSelf: 'center',
    backgroundColor: 'white',
    height: responsiveWidth(14),
    width: responsiveWidth(14),
    borderRadius: responsiveWidth(14 / 2),
    alignItems: 'center',
    justifyContent: 'center',
  },
  couterTimeText: {
    fontSize: responsiveFontSize(3.8),
    color: 'white',
    fontFamily: fontFamily.appTextSemiBold,
  },
  couterTimeTextBlack: {
    fontSize: responsiveFontSize(2.5),
    color: '#000',
    fontFamily: fontFamily.appTextRegular,
    marginTop:100
  },
  couterTimeRedText: {
    fontSize: responsiveFontSize(3.8),
    color: 'red',
    fontFamily: fontFamily.appTextSemiBold,
  },
  timerContainer: {
    alignSelf: 'center',
    marginTop: responsiveHeight(2),
    backgroundColor: colors.gray600,
    height: responsiveWidth(50),
    width: responsiveWidth(50),
    borderRadius: responsiveWidth(25),
    alignItems: 'center',
    justifyContent: 'center',
  },
  absoluteTimeContainer: {
    position: 'absolute',
    alignSelf: 'center',
    zIndex: 10,
  },
  timerText: {
    color: 'yellow',
    fontSize: 15,
    fontWeight: '500',
    zIndex: 100,
    borderWidth: 1,
    borderColor: 'red',
  },
  itemContainer: {
    alignItems: 'flex-start',
    alignSelf: 'center',
    justifyContent: 'space-between',
    maxWidth: responsiveWidth(60),
    minWidth: responsiveWidth(25),
  },
  itemNameText: {
    color: 'white',
    fontFamily: fontFamily.appTextExtraBold,
    fontSize: responsiveFontSize(2),
    maxWidth: responsiveWidth(60),
  },
  row: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
  },
  text: {
    fontWeight: "bold",
    color: "white",
    fontSize: 32,
  },
  underlayRight: {
    flex: 1,
    backgroundColor: "teal",
    justifyContent: "flex-start",
  },
  underlayLeft: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "flex-end",
  },
  itemTimeText: {
    color: 'white',
    fontFamily: fontFamily.appTextExtraBold,
    fontSize: responsiveFontSize(2),
  },
  itemDurationText: {
    color: 'white',
    fontFamily: fontFamily.appTextRegular,
    fontSize: responsiveFontSize(2),
  },
  addButton: {
    position: 'absolute',
    height: responsiveWidth(15),
    width: responsiveWidth(15),
    borderRadius: responsiveWidth(15 / 2),
    backgroundColor: AppColor.primary,
    alignItems: 'center',
    justifyContent: 'center',
    bottom: responsiveHeight(5),
    right: responsiveWidth(5),
  },
  button: {
    height: responsiveHeight(8),
    width: responsiveWidth(20),
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: responsiveWidth(2),
  },
  button2: {
    backgroundColor: colors.facebook,
    marginRight: responsiveWidth(1),
  },
  button3: {
    backgroundColor: colors.google,
  },
  buttonText: {
    fontSize: responsiveFontSize(2),
    color: 'white',
    fontFamily: fontFamily.appTextBold,
  },
  qaContainer: {
   // flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems:'center',
    paddingRight:50
   // paddingHorizontal: responsiveWidth(5),
  },

  bottonTabContainer: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: responsiveWidth(100),
    justifyContent: 'space-between',
    paddingHorizontal: responsiveWidth(6),
    paddingBottom:18
  },
  tabIconButton: {
    alignItems: 'center',
    paddingVertical: responsiveHeight(0.5),
  },
  tabIconImage: {
    resizeMode: 'contain',
    height: responsiveHeight(4.5),
    width: responsiveWidth(7.5),
  },
  tabButtonText: {
    fontSize: responsiveFontSize(1.6),
    color: colors.gray600,
    fontFamily: fontFamily.appTextBold,
    paddingTop: responsiveHeight(0.5),
  },
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    opacity: 0.5,
    flex:1,
    backgroundColor: '#FFFFFF10',
    justifyContent: 'center',
    alignItems: 'center'
  },
  orangeText: {
    color: AppColor.primary,
  },
  borderContainer: {
    height: responsiveHeight(1),
    width: responsiveWidth(90),
    alignSelf: 'center',
    borderRadius: responsiveWidth(1),
    backgroundColor: colors.gray400,
  },
  completedContainer: {
    // maxHeight: responsiveHeight(20),
  },
  compltedItem: {
    height: responsiveFontSize(8),
  },
  compltedItemTitleText: {
    textDecorationLine: 'line-through',
    color: colors.gray300,
  },
});
export default styles;
