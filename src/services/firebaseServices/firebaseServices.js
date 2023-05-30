import storage from '@react-native-firebase/storage';
import firestore, {firebase} from '@react-native-firebase/firestore';
import storageServices from '../storageServices/storage.services';
import toastServices from '../toastServices/toast.services';
import auth from '@react-native-firebase/auth';
import CommonServices from '../../services/commonServices/commomServices';
import moment from 'moment';
import RNRestart from 'react-native-restart';
import {CommonActions} from '@react-navigation/native';

///////////////// firestore functions
const uploadImage = async image => {
  if (image == null) {
    return null;
  }
  const uploadUri = image;
  let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);
  const extension = filename.split('.').pop();
  const name = filename.split('.').slice(0, -1).join('.');
  filename = name + Date.now() + '.' + extension;
  const storageRef = storage().ref(`photos/${filename}`);
  const task = storageRef.putFile(uploadUri);
  task.on('state_changed', taskSnapshot => {
    `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`;
  });

  try {
    await task;
    const url = await storageRef.getDownloadURL();
    return url;
  } catch (e) {
    return null;
  }
};
const getData = async (
  collection,
  condition = false,
  value = 'non',
  operator = '==',
  equalTo = 'non',
) => {
  let list = [];
  if (condition) {
    let querySnapshot = await firestore()
      .collection(collection)
      .where(value, operator, equalTo)
      .get();
    querySnapshot.docs.map(doc => {
      list.push({...doc.data(), id: doc.id});
    });
  } else {
    let querySnapshot = await firestore().collection(collection).get();
    querySnapshot.docs.map(doc => {
      list.push({...doc.data(), id: doc.id});
    });
  }

  return list;
};
const postData = async (collection, data) => {
  let timestamp = firestore.FieldValue.serverTimestamp();
  await firestore().collection(collection).add(data);
};
const updateData = async (id, collection, data) => {
  await firestore().collection(collection).doc(id).update(data);
};
const deletData = async (collection, id) => {
  await firestore().collection(collection).doc(id).delete();
  // toastService.showToast('Item deleted successfully');
};

//////////////////// auth sise function
const Login = async (email, password) => {
  try {
    let res = await auth().signInWithEmailAndPassword(email, password);
    await storageServices.setKey('user_id', res.user.uid);
    return res.user.uid;
  } catch (error) {
    return 'error';
  }
};
const signup = async (email, password) => {
  try {
    let res = await auth().createUserWithEmailAndPassword(email, password);
    await storageServices.setKey('user_id', res.user.uid);
    return res.user.uid;
  } catch (error) {
    return 'error: '+error;
  }
};
const signout = async (props) => {
  await auth()
    .signOut()
    .then(async() => {
      console.log('User signed out!');
      await storageServices.setKey('user_id', '');
      props.navigation.reset({
        index: 0,
        routes: [{name: 'Auth'}],
      });
      RNRestart.Restart();
      await firebaseServices.signout();
      await firebaseServices.googleSignout();
        
  }).catch(async()=>{
      await storageServices.setKey('user_id', '');
      props.navigation.reset({
        index: 0,
        routes: [{name: 'Auth'}],
      });
      RNRestart.Restart();
      await firebaseServices.signout();
      await firebaseServices.googleSignout();
     
  });
 
};
const getFCMToken = async id => {
  const user = await firestore().collection('Users').doc(id).get();
  let fcmToken = user.data().fcmToken;
  return fcmToken;
};
const getUserInfo = async (token = null) => {
  let obj = {};
  let id = await storageServices.getKey('user_id');
  if (token) {
    id = token;
  }
  const user = await firestore().collection('Users').doc(id).get();
  obj = {...user.data(), id: user.id};
  return obj;
};
const storeUserInfo = async (id, data) => {
  firestore()
    .collection('users')
    .doc(id)
    .set(data)
    .then(() => {
      // Alert.alert('Data Uploaded!', 'Your data submitted  Successfully!');
    })
    .catch(error => {});
  await storageServices.setKey('user_id', id);
};
const reAuthenticate = async currentPassword => {
  let user = await auth().currentUser;
  let cred = await auth().EmailAuthProvider.credential(
    user.email,
    currentPassword,
  );
  return user.reauthenticateWithCredential(cred);
};
const changePassword = async (currentPassword, newPassword) => {
  await reAuthenticate(currentPassword)
    .then(() => {
      let user = auth().currentUser;
      user
        .updatePassword(newPassword)
        .then(() => {})
        .catch(error => {
          console.log(error);
        });
    })
    .catch(error => {
      console.log(error);
    });
};
const changeEmail = (currentPassword, newEmail) => {
  this.reauthenticate(currentPassword)
    .then(() => {
      var user = firebase.auth().currentUser;
      user
        .updateEmail(newEmail)
        .then(() => {})
        .catch(error => {
          console.log(error);
        });
    })
    .catch(error => {
      console.log(error);
    });
};
const forgotPassword = async Email => {
  let res = '';
  await firebase.auth()
    .sendPasswordResetEmail(Email)
    .then(function (user) {
      //console.log("userrr",user);
      toastServices.showToast('Please check your email ');
    })
    .catch(function (e) {});
  return res;
};
export const appFBS = {
  uploadImage,
  getData,
  deletData,
  postData,
  updateData,
  Login,
  getUserInfo,
  signup,
  signout,
  storeUserInfo,
  changePassword,
  forgotPassword,
  getFCMToken,
  changeEmail,
};
