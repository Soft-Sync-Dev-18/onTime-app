import React, { useState } from 'react';
import {
  View,
  StatusBar,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import AuthHeader from '../../../components/general/AuthHeader';
import { TxtInput as TextInput } from '../../../components/general/TxtInput';
import { AppColor, appImages } from '../../../globals/utilities';
import styles from './forgetPassword.styles';
import SocialButton from '../../../components/feed/cardLogin';
import { validateEmail } from '../../../services/validationServices/validationServices';
import toastServices from '../../../services/toastServices/toast.services';
import { appFBS } from '../../../services/firebaseServices/firebaseServices';
const ForgetPassword = props => {
  const [loading, setloading] = useState(false);
  const [email, setEmail] = useState('');
  const [resetEmailSend, setresetEmailSend] = useState(false);
  const resetPassword = async () => {

    if (!validateEmail(email)) {
      toastServices.showToast('Please enter valid email');
      return;
    } else {
      setloading(true);
      await appFBS.forgotPassword(email);
      // props.navigation.navigate('Login');
      setresetEmailSend(!resetEmailSend);
    }
    setloading(false);
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={'white'} barStyle="dark-content" />
      <AuthHeader title={''} onpress={() => props.navigation.goBack()} />
      <ScrollView style={styles.mainView}>
        <Image source={appImages.orangeLogo} style={styles.image} />
        <Text style={styles.heading}>
          {resetEmailSend ? 'Check your email' : 'Forgot password?'}
        </Text>
        <Text style={styles.descriptionText}>
          {resetEmailSend
            ? 'We’ve sent you a password reset link if you’ve created an account with the email provided..'
            : '  Enter your email address and we’ll send you a password reset link ifyou’ve created an account with us.'}
        </Text>
        <View style={styles.wrapper}>
          {!resetEmailSend && (
            <TextInput
              placeholder={'Email-address'}
              itsStyle={styles.inputText}
              onChangeText={text => setEmail(text)}
              value={email}
              keyboardType="email-address"
            />
          )}

          {resetEmailSend ? (
            <SocialButton
              backgroundColor={AppColor.primary}
              image={appImages.google}
              showIcon={false}
              title={'Go Back to Login'}
              marginTop={2}
              loading={loading}
              onpress={() => props.navigation.goBack()}
            />
          ) : (
            <SocialButton
              backgroundColor={AppColor.primary}
              image={appImages.google}
              showIcon={false}
              title={'Send Password Reset Link'}
              marginTop={2}
              loading={loading}
              onpress={() => resetPassword()}
            />
          )}

          {/* <Text style={styles.createAccountText}>Forgot password?</Text> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ForgetPassword;
