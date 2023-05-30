//import liraries
import React, {useState,useEffect} from 'react';
import {View, Text, StyleSheet, SafeAreaView, StatusBar} from 'react-native';
import AuthHeader from '../../../components/general/AuthHeader';
import styles from './setting.styles';
import SocialButton from '../../../components/feed/cardLogin';
import {AppColor, appImages} from '../../../globals/utilities';
import Button from '../../../components/general/button';
import {ScrollView} from 'native-base';

import LogoutConfirmation from '../../../components/modals/logoutConfirmation/logoutConfirmation';
import {appFBS} from '../../../services/firebaseServices/firebaseServices';
let isMounted = true;
const Setting = props => {
  const [logoutVisibility, setlogoutVisibility] = useState(false);
  const logoutUser = async () => {
    await appFBS.signout(props);
     setTimeout(async ()=>  {
      setlogoutVisibility(false);
    }
    , 2000);

  };
  useEffect(() => {
                 // note mutable flag
    
    return () => { isMounted = false }; // cleanup toggles value, if unmounted
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'dark-content'} backgroundColor="white" />
      <ScrollView style={{flex: 1}}>
        <AuthHeader
          onpress={() => props.navigation.goBack()}
          title="Settings"
        />
        <SocialButton
          backgroundColor={AppColor.primary}
          image={appImages.google}
          showIcon={false}
          title={'Annual Subscription'}
          marginTop={2}
        />
        <Button marginTop={1} title={'Support us'} />
        <Button marginTop={2} title={'Monthly subscription'} />
        <Text style={styles.heading}>Why is OnTime a subscription app?</Text>
        <Text style={styles.createAccountText}>
          We’re a small company trying to make a difference.
        </Text>
        <Text style={[styles.createAccountText, styles.extraPadding]}>
          Always 100% ad free
        </Text>
        <SocialButton
          backgroundColor={AppColor.primary}
          image={appImages.google}
          showIcon={false}
          title={'Start 14 day free trial'}
          marginTop={2}
        />
        <Button
          onPress={() => setlogoutVisibility(true)}
          marginTop={15}
          title={'Logout'}
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
    </SafeAreaView>
  );
};

export default Setting;
