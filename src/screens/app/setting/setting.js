//import liraries
import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Image,
  Dimensions,
  TextInput,
} from "react-native";
import AuthHeader from "../../../components/general/AuthHeader";
import styles from "./setting.styles";
import SocialButton from "../../../components/feed/cardLogin";
import { AppColor, appImages } from "../../../globals/utilities";
import Button from "../../../components/general/button";
import { ScrollView } from "native-base";
import BottomSheet from "react-native-gesture-bottom-sheet";
import LogoutConfirmation from "../../../components/modals/logoutConfirmation/logoutConfirmation";
import { appFBS } from "../../../services/firebaseServices/firebaseServices";
import { responsiveHeight } from "react-native-responsive-dimensions";
import firestore from "@react-native-firebase/firestore";
// import image from './../../../globals/utilities/assets/Capture.PNG'
let isMounted = true;
const Setting = (props) => {
  const [logoutVisibility, setlogoutVisibility] = useState(false);
  const bottomSheet = useRef();
  const logoutUser = async () => {
    await appFBS.signout(props);
    setTimeout(async () => {
      setlogoutVisibility(false);
    }, 2000);
  };
  useEffect(() => {
    // note mutable flag

    return () => {
      isMounted = false;
    }; // cleanup toggles value, if unmounted
  }, []);

  const [codeMatched, setCodeMatched] = useState(false);
  const [codeValue, setCodeValue] = useState("");

  useEffect(() => {
    firestore().collection("redeemCodes").onSnapshot(onResult);
  }, []);

  async function onResult(QuerySnapshot) {
    let changes = QuerySnapshot.docChanges();
    changes.forEach(async (element) => {
      await getSchedules();
    });
  }
  const [arrCodes, setArrCodes] = useState([]);
  const getSchedules = async () => {
    let id = await storageServices.getKey("codes");
    // setmyId(id);
    let data = await appFBS.getData("redeemCodes");

    let arr = [Object.values(data[0])[0]];
    setArrCodes(arr[0]);
    // setschedulesList(data);
  };
  useEffect(() => {
    console.log(arrCodes, "arrCodes");
  }, [arrCodes]);

  const arrayMatch = (e) => {
    console.log(e);
    if (arrCodes.includes(e)) {
      setCodeMatched(true);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={"dark-content"} backgroundColor="white" />
      <ScrollView style={{ flex: 1 }}>
        <AuthHeader
          onpress={() => props.navigation.goBack()}
          title="Settings"
        />
        <SocialButton
          backgroundColor={AppColor.primary}
          image={appImages.google}
          showIcon={false}
          title={"Annual Subscription"}
          marginTop={2}
        />
        <Button marginTop={1} title={"Support us"} />
        <Button marginTop={2} title={"Monthly subscription"} />
        <Text style={styles.heading}>Why is OnTime a subscription app?</Text>
        <Text style={styles.createAccountText}>
          Weâ€™re a small company trying to make a difference.
        </Text>
        <Text style={[styles.createAccountText, styles.extraPadding]}>
          Always 100% ad free
        </Text>
        <SocialButton
          backgroundColor={AppColor.primary}
          image={appImages.google}
          showIcon={false}
          title={"Start 14 day free trial"}
          marginTop={2}
        />

        <Button
          onPress={() => {setCodeMatched(false);bottomSheet.current.show();}}
          // marginTop={2}
          title={"Custom Redeem"}
        />
        <Button
          onPress={() => setlogoutVisibility(true)}
          marginTop={8}
          title={"Logout"}
        />
        <Text style={[styles.createAccountText, styles.extraPadding]}>
          Version 1.0.0
        </Text>
      </ScrollView>
      <LogoutConfirmation
        onpressCancel={() => setlogoutVisibility(false)}
        onpressLogout={() => logoutUser()}
        setVisible={setlogoutVisibility}
        visible={logoutVisibility}
      />
      <BottomSheet
        hasDraggableIcon
        ref={bottomSheet}
        sheetBackgroundColor="#fff"
        height={Dimensions.get("window").height - 50}
      >
        <View
          style={{
            display: "flex",
            alignItem: "center",
            // justifyContent: "center",
            width: "100%",
            height: "100%",
            backgroundColor: "white",
            padding: 20,
          }}
        >
          <View
            style={{
              display: "flex",
              alignItems: "center",
              padding: 40,
            }}
          >
            {!codeMatched ? (
              <Image
                style={{ width: 200, height: 200 }}
                source={appImages.bottomSheetPic}
              />
            ) : (
              <Image
                style={{
                  width: 200,
                  height: 200,
                  borderRadius: 50,
                  marginTop: responsiveHeight(8),
                }}
                source={appImages.bottomSheetPic2}
              />
            )}
            <Text
              style={{
                color: "black",
                fontSize: 30,
                alignContent: "center",
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              {!codeMatched
                ? `Redeem Code for Ocean Journal`
                : `All Access for Ocean Journal`}
            </Text>
            {false ? (
              <Text
                style={{
                  color: "#bebebf",
                  textAlign: "center",
                }}
              >
                1 month free, then $4.99/month
              </Text>
            ) : null}
          </View>
          {!codeMatched ? (
            <TextInput
              placeholder="Enter Code"
              placeholderTextColor={"#bebebf"}
              style={{
                borderColor: "#f1f1f3",
                borderWidth: 1,
                color: "black",
                padding: 10,
                fontSize: 24,
                textAlign: "center",
                marginTop: responsiveHeight(5),
                letterSpacing:3,
                fontWeight:'600'
              }}
              value={codeValue}
              onChangeText={(e) => {
                if (e.length <= 6) {
                  setCodeValue(e);
                  if (e.length === 6) {
                    arrayMatch(e);
                  }
                }
              }}
            />
          ) : null}
          {codeMatched ? (
            <>
              <Button
                onPress={() => bottomSheet.current.close()}
                marginTop={23}
                backgroundColor={"#067afb"}
                title={"Redeem Offer"}
              />
              <Text
                style={{
                  color: "#bebebf",
                  marginTop: responsiveHeight(2),
                  textAlign: "center",
                }}
              >
                Terms And Conditons
              </Text>
            </>
          ) : null}
          <Text
            style={{
              color: "#bebebf",
              marginTop: responsiveHeight(32),
              textAlign: "center",
            }}
          >
            Terms And Conditons
          </Text>
        </View>
      </BottomSheet>
    </SafeAreaView>
  );
};


export default Setting;