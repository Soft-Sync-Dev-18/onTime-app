import { responsiveFontSize } from "react-native-responsive-dimensions"

const fontSize = {
  h1: responsiveFontSize(4.5),
  h2: responsiveFontSize(4),
  h3: responsiveFontSize(3.5),
  h4: responsiveFontSize(3),
  h5: responsiveFontSize(2.5),
  h6: responsiveFontSize(2),
  input: responsiveFontSize(1.75),
  large: responsiveFontSize(2),
  medium: responsiveFontSize(1.75),
  regular: responsiveFontSize(1.5),
  small: responsiveFontSize(1.25),
  tiny: responsiveFontSize(1)
}


export  {fontSize}