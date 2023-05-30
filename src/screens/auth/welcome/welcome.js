import React, {useState} from 'react';
import {
  View,
  StatusBar,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from 'react-native';
import {responsiveHeight} from 'react-native-responsive-dimensions';
import {AppButton as Button} from '../../../components/general/button';
import auth from '@react-native-firebase/auth';
import {AppColor, appImages, colors} from '../../../globals/utilities';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {CommonActions} from '@react-navigation/native';
import {appFBS} from '../../../services/firebaseServices/firebaseServices';
import {
  Settings,
  AccessToken,
  GraphRequest,
  GraphRequestManager,
  LoginManager,
} from 'react-native-fbsdk-next';
import styles from './welcome.styles';
import BorderLine from '../../../components/general/borderLine/borderLine';
import SocialButton from '../../../components/feed/cardLogin';

const Welcome = props => {
  GoogleSignin.configure({
    webClientId:
      '1000392128370-ssv4mcirinri7ntr487v7afh9mvrcit7.apps.googleusercontent.com',
  });
  Settings.setAppID('588177585999460');
  const [loading, setloading] = useState(false);
  const googleHandler = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const {idToken, user} = await GoogleSignin.signIn();

      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      await auth()
        .signInWithCredential(googleCredential)
        .then(async e => {
          let user1 = {
            name: user.name,
            email: user.email,
            profilePicture: '',
            id: idToken,
          };

          console.log('====================================');
          console.log(user1);
          console.log('====================================');

          await appFBS.postData('users', user1) 
          .then(() => {
              props.navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [{name: 'App'}],
                }),
              );
            })
            .catch(error => alertService.show(error));
         
         });
    } catch (error) {
      //navigation.navigate("Main");
      console.log(error, '----');
    }
  };
 
  const loginWithfacebookHandler = async () => {
    // if(LoginManager.getInstance()!=null){
    // LoginManager.getInstance().logOut();
    // }
    // console.log(LoginManager.getI)
    // LoginManager.logOut();
    LoginManager.logInWithPermissions(['public_profile', 'email']).then(
      function (result) {
        if (result.isCancelled) {
          console.log('Login cancelled');
        } else {
          console.log('Login success with permissions: ' + result);
          AccessToken.getCurrentAccessToken().then(async data => {
            const processRequest = new GraphRequest(
              '/me?fields=name,email,picture.type(large)',
              null,
              await getResponseInfo,
            );
            // Start the graph request.
            new GraphRequestManager().addRequest(processRequest).start();

            const {accessToken} = data;
            const facebookCredential =
              auth.FacebookAuthProvider.credential(accessToken);

            // Sign-in the user with the credential
            // console.log(facebookCredential);
            await auth()
              .signInWithCredential(facebookCredential)
              .then(async e => {});

            // initUser(accessToken);
          });
        }
      },
      function (error) {
        console.log('Login fail with error: ' + error);
      },
    );
  };
  const getResponseInfo = async (error, result) => {
    console.log('result', result.email);
    if (error) {
      //Alert for the Error
    } else {
      //response alert

      let user1 = {
        name: user.name,
        email: user.email,
        profilePicture: '',
        id: idToken,
      };

      console.log('====================================');
      console.log(user1);
      console.log('====================================');

      await appFBS.postData('users', user1) 
      .then(() => {
          props.navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{name: 'App'}],
            }),
          );
        })
        .catch(error => alertService.show(error));
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={'white'} barStyle="dark-content" />
      <Image source={appImages.orangeLogo} style={styles.logoImage} />
      <SocialButton
        backgroundColor={colors.facebook}
        image={appImages.facebook}
        title={'Login with Facebook'}
        showIcon={true}
        marginTop={8}
        onpress={() =>{loginWithfacebookHandler()}}
      />
      <SocialButton
        backgroundColor={colors.google}
        image={appImages.google}
        title={'Login with Google'}
        showIcon={true}
        onpress={() =>{googleHandler()}}
      />
      <BorderLine marginTop={4} />
      <SocialButton
        backgroundColor={AppColor.primary}
        image={appImages.google}
        title={'Login with Password'}
        showIcon={false}
        marginTop={3}
        onpress={() => props.navigation.navigate('Login')}
      />
      <TouchableOpacity onPress={() => props.navigation.navigate('Signup')}>
        <Text style={styles.createAccountText}>Create an account</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
export default Welcome;
