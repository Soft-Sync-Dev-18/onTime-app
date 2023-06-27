import { StyleSheet } from "react-native";
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import {
  AppColor,
  colors,
  fontFamily,
  textColor,
} from "../../../globals/utilities";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  mainContainer: {
    flex: 1,
  },
  infoContainer: {
    paddingTop: responsiveHeight(2),
    paddingHorizontal: responsiveWidth(5),
  },
  heading: {
    fontSize: responsiveFontSize(3.5),
    color: colors.gray600,
    fontFamily: fontFamily.appTextExtraBold,
    textAlign: "left",
    textAlignVertical: "center",
    marginTop: responsiveHeight(1),
    width: responsiveWidth(90),
    alignSelf: "center",
  },
  inputContainer: {
    width: responsiveWidth(90),
    alignSelf: "center",
    justifyContent: "space-evenly",
  },
  durationText: {
    fontSize: responsiveFontSize(1.6),
    color: colors.gray600,
    fontFamily: fontFamily.appTextRegular,
  },
  labelText: {
    fontSize: responsiveFontSize(2),
    color: colors.gray600,
    fontFamily: fontFamily.appTextExtraBold,
  },
  colorContainer: {
    flexDirection: "row",
    width: responsiveWidth(90),
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: responsiveHeight(4),
  },
  durationButton: {
    width: responsiveWidth(8),
    borderBottomWidth: 1,
    borderBottomColor: colors.gray600,
    alignItems: "center",
    justifyContent: "center",
  },
  colorBUtton: {
    width: responsiveWidth(20),
    height: responsiveHeight(5),
    borderRadius: responsiveWidth(2),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  addColorButton: {
    width: responsiveWidth(80),
    height: responsiveHeight(6.33),
    backgroundColor: AppColor.secondry,
    borderRadius: 8,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    marginTop: responsiveHeight(2),
    marginBottom: responsiveHeight(3),
  },
  addColorButtonText: {
    color: "white",
    fontSize: 18,
    fontFamily: fontFamily.appTextBlack,
  },
  colorModalContainer: {
    width: responsiveWidth(90),
    backgroundColor: "white",
    alignSelf: "center",
    borderRadius: responsiveWidth(3),
  },
  colorPicker: {
    width: responsiveWidth(90),
    height: responsiveHeight(35),
    marginTop: responsiveHeight(2.5),
    marginBottom: responsiveHeight(2.5),
  },
  colorModalHeadingText: {
    color: colors.gray600,
    fontSize: responsiveFontSize(3),
    paddingHorizontal: responsiveWidth(5),
    fontFamily: fontFamily.appTextExtraBold,
    textAlign: "left",
    marginTop: responsiveHeight(5),
  },

  /////////////////////////////bottom Container styles
  bottonTabContainer: {
    position: "absolute",
    bottom: 0,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: responsiveWidth(100),
    justifyContent: "space-between",
    paddingVertical: responsiveHeight(0.6),
    paddingBottom: 20,
    paddingHorizontal: responsiveWidth(6),
  },
  tabIconButton: {
    alignItems: "center",
    paddingVertical: responsiveHeight(0.5),
  },
  tabIconImage: {
    resizeMode: "contain",
    height: responsiveHeight(4.5),
    width: responsiveWidth(7.5),
  },
  tabButtonText: {
    fontSize: responsiveFontSize(1.6),
    color: colors.gray600,
    fontFamily: fontFamily.appTextBold,
    paddingTop: responsiveHeight(0.5),
  },
  orangeText: {
    color: AppColor.primary,
  },
  indicatorView: {
    borderRadius: responsiveWidth(7 / 2),
    height: responsiveWidth(7),
    width: responsiveWidth(7),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: AppColor.primary,
  },
  contentContainerStyle: {
    paddingBottom: responsiveHeight(30),
  },
});
export default styles;
