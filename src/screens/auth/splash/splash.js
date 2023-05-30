import React, {useEffect, useState} from 'react';
import {
  View,
  StatusBar,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import {AppColor, appImages, colors} from '../../../globals/utilities';
import styles from './splash.styles';
import storeServices from '../../../services/storageServices/storage.services';
import LinearGradient from 'react-native-linear-gradient';
const Splash = props => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    Loading();
  }, []);
  async function Loading() {
    setTimeout(async () => {
      let id = await storeServices.getKey('user_id');
      if (id) {
        console.log('', id);
        props.navigation.replace('App');
      } else {
        props.navigation.replace('Welcome');
      }
    }, 3000);
  }

  return (
    <View style={styles.container}>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        colors={[AppColor.LinearGradientcolor1, AppColor.LinearGradientcolor2]}
        style={styles.container}>
        <StatusBar
          backgroundColor={'transparent'}
          translucent={true}
          barStyle="light-content"
        />
        <View style={styles.imageView}>
          <Image
            source={appImages.whiteLogo}
            style={styles.logoImage}
            resizeMode="contain"
          />
        </View>
        {loading ? (
          <View style={styles.indicator}>
            <ActivityIndicator size={'large'} color={'white'} />
          </View>
        ) : null}
      </LinearGradient>
    </View>
  );
};
export default Splash;
