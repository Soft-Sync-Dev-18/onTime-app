import React from 'react';
import {TouchableOpacity, Text, View, Image} from 'react-native';
import {appImages} from '../../../globals/utilities/index';
import styles from './styles';
const AuthHeader = ({title, onpress}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onpress} style={styles.logoView}>
        <Image source={appImages.backIcon} style={styles.backIcon} />
      </TouchableOpacity>
      <TouchableOpacity onPress={onpress} style={styles.logoView}>
      <View style={styles.TextView}>
        <Text style={styles.titleText}>{title}</Text>
      </View>
      </TouchableOpacity>
    </View>
  );
};
export default AuthHeader;
