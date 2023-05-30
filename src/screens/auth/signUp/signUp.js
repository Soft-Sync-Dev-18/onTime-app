import React, {useState} from 'react';
import {
  View,
  StatusBar,
  Text,
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
import styles from './signUp.styles';
import SocialButton from '../../../components/feed/cardLogin';
import {signupDetailsFormValidation} from '../../../services/validationServices/validationServices';
import toastServices from '../../../services/toastServices/toast.services';
import {CommonActions} from '@react-navigation/native';
import {appFBS} from '../../../services/firebaseServices/firebaseServices';
import {useFormik} from 'formik';
const Signup = props => {
  const [secure, setSecure] = useState(true);
  const [loading, setloading] = useState(false);
  const initialValues = {
    name:'',
    email: '',
    password: '',
    confirmPassword:''
  };
  const {values, errors, touched, setFieldValue, setFieldTouched, isValid} =
    useFormik({
      initialValues: initialValues,
      validateOnBlur: true,
      validateOnChange: true,
      validate: signupDetailsFormValidation,
      onSubmit: () => {},
    });
  const onSubmit = async () => {
    console.log('umar 1'+(isValid && Object.keys(touched).length > 0));
    if (isValid && Object.keys(touched).length > 0) {
      console.log('umar 2');
      try {
        await signInUser();
      } catch (error) {
        console.log('umarError'+error);
      }
    }else{
      if (!values.name) {
        toastServices.showToast('name is required');
        return;
      } else if (values.name.length < 2) {
        toastServices.showToast('name should have atleast two alphabets');
        return;
      } else if (/\d/.test(values.name)) {
        toastServices.showToast('name should not contain any numbers');
        return;
      }else if (!values.email) {
        toastServices.showToast('Email is required');
        return;
      } else if (!validateEmail(values.email)) {
        toastServices.showToast('Email is not valid');
        return;
      }else if (!values.password) {
        toastServices.showToast('password is required');
        return;
      } else if (values.password.length < 8) {
        toastServices.showToast('password  should have atleast eight alphabets');
        return;
      }else if (!values.confirmPassword) {
        toastServices.showToast('confirm password is required');
        return;
      } else if (values.confirmPassword.length < 8) {
        toastServices.showToast('password  should have atleast eight alphabets');
        return;
      } else if (values.password !== values.confirmPassword) {
        toastServices.showToast('password & confirm password not match');
        return;
      }
     
    }
  };
  const signInUser = async () => {
    setloading(true);
    let response = await appFBS.signup(
      values.email.trim(),
      values.password.trim(),
    );
    if (response !== 'error') {
      let obj = {
        name: values.name,
        email: values.email,
        profilePicture: '',
        id: response,
      };
      await appFBS.postData('users', obj);
      props.navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'App'}],
        }),
      );
    } else {
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
      <AuthHeader onpress={() => props.navigation.goBack()} title="" />
      <ScrollView style={styles.mainView}>
        <Image source={appImages.orangeLogo} style={styles.image} />
        <Text style={styles.heading}>Create your account</Text>
        <View style={styles.wrapper}>
        <TextInput
            placeholder={'Name'}
            itsStyle={styles.inputText}
            value={values.name}
            onChangeText={val => setFieldValue('name', val)}
            onBlur={() => setFieldTouched('name', true)}
          />
          {errors?.name && touched.name && (
            <Text style={styles.errorText}>{errors?.name}</Text>
          )}
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
          <TextInput
            value={values.confirmPassword}
            placeholder={'Confirm-Password'}
            itsStyle={styles.inputText}
            isSecure={secure}
            onChangeText={val => setFieldValue('confirmPassword', val)}
            onBlur={() => setFieldTouched('confirmPassword', true)}
          />
          {errors?.confirmPassword && touched.confirmPassword && (
            <Text style={styles.errorText}>{errors?.confirmPassword}</Text>
          )}
          <SocialButton
            backgroundColor={AppColor.primary}
            image={appImages.google}
            showIcon={false}
            title={'Signup'}
            marginTop={2}
            loading={loading}
            onpress={() => onSubmit()}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
    </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
export default Signup;

export const validateEmail = mail => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(mail).toLowerCase());
};