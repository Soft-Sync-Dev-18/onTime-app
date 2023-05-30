import { StyleSheet } from "react-native";
import {
    responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { TxtInput } from ".";
import { textColor, fontFamily } from "../../../globals/utilities/index";

export default StyleSheet.create({
  content: {
    width: responsiveWidth(85),
    backgroundColor: textColor.dotcolor,
    borderRadius: responsiveWidth(3),
    flexDirection: "row",
    height: responsiveHeight(6),
    justifyContent:'space-between',
    alignSelf:'flex-start'
  },
  TxtInput:{
      color:textColor.fontColor,
      fontFamily: fontFamily.appTextRegularGilroy,
      fontSize: responsiveFontSize(1.7),
  },
  iconStyles:{
    marginRight: responsiveWidth(2)
  },
  errorview:{
    marginTop:responsiveHeight(1),
    paddingLeft:responsiveWidth(1),
    flexDirection:"row",
    alignItems:"center",
  },
  errorText:{
    color:'rgba(200, 0, 0, 0.8)',
    fontFamily: fontFamily.appTextRegular,
    fontSize: responsiveFontSize(1.5)
  },
    
});