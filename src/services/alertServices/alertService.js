import {Alert} from 'react-native';
import {storageServices} from '../storageServices/storage.services';
import {firebaseServices} from '../auth/firebase.services';
import {useNavigation} from '@react-navigation/native';
import {CommonActions} from '@react-navigation/native';

const show = (title, message) => {
  Alert.alert(title, message, [
    {
      text: 'OK',
      style: 'destructive',
    },
  ]);
};

const deleteAlert = () => {
  return new Promise((resolve, reject) => {
    Alert.alert('Delete', 'Are you sure you want to delete?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => {
          resolve();
        },
      },
    ]);
  });
};

const confirm = (message, okText, cancelText, title) => {
  return new Promise((resolve, reject) => {
    Alert.alert(
      title ? title : null,
      message,
      [
        {
          text: cancelText || 'Cancel',
          onPress: () => {
            reject();
          },
          style: 'cancel',
        },
        {text: okText || 'OK', onPress: () => resolve(true)},
      ],
      {cancelable: false},
    );
  });
};
const logoutAlert = props => {
  Alert.alert('Logout', 'Do You Want To Logout ', [
    {
      text: 'Cancel',
      onPress: () => console.log('Cancel Pressed'),
      style: 'cancel',
    },
    {text: 'OK', onPress: () => logout(props)},
  ]);
};
const logout = async props => {
  await storageServices.setKey('user_id', '');
  await firebaseServices.signout();
  await firebaseServices.googleSignout();
  props.navigation.navigate('Auth');
  // props.navigation.replace('Login');
  // props.navigation.dispatch(
  //   CommonActions.reset({
  //     index: 0,
  //     routes: [{name: 'Login'}],
  //   }),
  // );
};

export const alertServices = {
  show,
  deleteAlert,
  confirm,
  logoutAlert,
};
