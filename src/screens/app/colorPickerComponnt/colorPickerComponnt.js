import React, { useState } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { responsiveWidth } from "react-native-responsive-dimensions";
// import Animated, {
//   useAnimatedStyle,
//   useSharedValue,
// } from "react-native-reanimated";

import ColorPicker, {
  Panel1,
  Swatches,
  colorKit,
  PreviewText,
  HueCircular,
} from "reanimated-color-picker";

export default function ColorPickerComponnt({
  setColor,
  color,
  selectedColor,
  setselectedColor,
}) {
  const [showModal, setShowModal] = useState(false);

//   const customSwatches = new Array(6)
//     .fill("#fff")
//     .map(() => colorKit.randomRgbColor().hex());

  //   const selectedColor = useSharedValue(customSwatches[0]);
  //   const backgroundColorStyle = useAnimatedStyle(() => ({
  //     backgroundColor: selectedColor.value,
  //   }));

  const onColorSelect = (color) => {
    // console.log(color.hex, "color.hex");
    setselectedColor(color.hex);
    setColor(color.hex);
  };

  return (
    <>
      <View style={styles.pickerContainer}>
        <ColorPicker
          value={selectedColor}
          sliderThickness={35}
          thumbSize={24}
          onChange={onColorSelect}
          boundedThumb
        >
          <HueCircular
            containerStyle={styles.hueContainer}
            // thumbInnerStyle={{ borderColor: "#fff", borderWidth: 1 }}
            thumbShape="circle"
            boundedThumb
          >
            <Panel1
              thumbShape="circle"
              boundedThumb
              style={{ ...styles.panelStyle, ...styles.boxShadow }}
            />
          </HueCircular>
        </ColorPicker>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  boxShadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    backgroundColor: "orange",
  },
  pickerContainer: {
    alignSelf: "center",
    width: 300,
    // height: 300,
    // alignItems: "center",
    // justifyContent: "center",
    // width: responsiveWidth(80),
    // backgroundColor: "#fff",
    // padding: 20,
    // borderRadius: 20,
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 5,
    // },
    // shadowOpacity: 0.34,
    // shadowRadius: 6.27,

    // elevation: 10,
  },
  hueContainer: {
    justifyContent: "center",
  },
  panelStyle: {
    width: "73%",
    height: "73%",
    alignSelf: "center",
    borderRadius: 100,
  },
  previewTxtContainer: {
    paddingTop: 20,
    marginTop: 20,
    borderTopWidth: 1,
    borderColor: "#bebdbe",
  },
  swatchesContainer: {
    paddingTop: 20,
    marginTop: 20,
    borderTopWidth: 1,
    borderColor: "#bebdbe",
    alignItems: "center",
    flexWrap: "nowrap",
    gap: 10,
  },
  swatchStyle: {
    borderRadius: 20,
    height: 30,
    width: 30,
    margin: 0,
    marginBottom: 0,
    marginHorizontal: 0,
    marginVertical: 0,
  },
  openButton: {
    width: "100%",
    borderRadius: 20,
    paddingHorizontal: 40,
    paddingVertical: 10,
    backgroundColor: "#fff",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  closeButton: {
    position: "absolute",
    bottom: 20,
    borderRadius: 20,
    paddingHorizontal: 40,
    paddingVertical: 10,
    alignSelf: "center",
    backgroundColor: "#fff",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});
