import React, {useState} from 'react';
import {
  View,
  StatusBar,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
} from 'react-native';

import AuthHeader from '../../../components/general/AuthHeader';
import {TxtInput as TextInput} from '../../../components/general/TxtInput';
import {AppColor, appImages} from '../../../globals/utilities';
import styles from './login.styles';
import SocialButton from '../../../components/feed/cardLogin';
import {loginDetailsFormValidation} from '../../../services/validationServices/validationServices';
import toastServices from '../../../services/toastServices/toast.services';
import {CommonActions} from '@react-navigation/native';
import {appFBS} from '../../../services/firebaseServices/firebaseServices';
import {useFormik} from 'formik';
const Login = props => {
  const [secure, setSecure] = useState(true);
  const [loading, setloading] = useState(false);
  const initialValues = {
    email: '',
    password: '',
  };
  const {values, errors, touched, setFieldValue, setFieldTouched, isValid} =
    useFormik({
      initialValues: initialValues,
      validateOnBlur: true,
      validateOnChange: true,
      validate: loginDetailsFormValidation,
      onSubmit: () => {},
    });
  const onSubmit = async () => {
    if (isValid && Object.keys(touched).length > 0) {
      try {
        console.log('invalid credentials');
        await loginUser();
      } catch (error) {
        console.log(error);
      }
    }else{
      toastServices.showToast( "Please enter valid credentials");
    }
  };
  const loginUser = async () => {
    setloading(true);
    let response = await appFBS.Login(
      values.email.trim(),
      values.password.trim(),
    );
    if (response !== 'error') {
      props.navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'App'}],
        }),
      );
    } else {
     // console.log('invalid credentials');
      toastServices.showToast(response + ' invalid credentials');
    }
    setloading(false);
  };

  return (
    <KeyboardAvoidingView
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    style={styles.container}>
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <SafeAreaView>
      <StatusBar
        backgroundColor={'white'}
        barStyle="dark-content"
        translucent={false}
      />
      <AuthHeader title={''} onpress={() => props.navigation.goBack()} />
      <ScrollView style={styles.mainView}>
        <Image source={appImages.orangeLogo} style={styles.image} />
        <Text style={styles.heading}>Login</Text>
        <View style={styles.wrapper}>
          <TextInput
            placeholder={'Email-address'}
            itsStyle={styles.inputText}
            value={values.email}
            onChangeText={val => setFieldValue('email', val)}
            onBlur={() => setFieldTouched('email', true)}
            keyboardType="email-address"
          />
          {errors?.email && touched.email && (
            <Text style={styles.errorText}>{errors?.email}</Text>
          )}
          <TextInput
            value={values.password}
            placeholder={'Password'}
            itsStyle={styles.inputText}
            isSecure={secure}
            onChangeText={val => setFieldValue('password', val)}
            onBlur={() => setFieldTouched('password', true)}
          />
          {errors?.password && touched.password && (
            <Text style={styles.errorText}>{errors?.password}</Text>
          )}
          <SocialButton
            backgroundColor={AppColor.primary}
            image={appImages.google}
            showIcon={false}
            title={'Login with Password'}
            marginTop={2}
            loading={loading}
            onpress={() => onSubmit()}
          />
          <TouchableOpacity
            onPress={() => props.navigation.navigate('ForgetPassword')}>
            <Text style={styles.createAccountText}>Forgot password?</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
    </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
export default Login;
