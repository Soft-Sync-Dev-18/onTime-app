import React from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  Image,
  ActivityIndicator,
} from 'react-native';
import styles from './style';
import {responsiveScreenHeight} from 'react-native-responsive-dimensions';
const Button = ({
  image,
  title,
  onpress,
  backgroundColor,
  showIcon = false,
  marginTop = 0,
  loading,
}) => {
  return (
    <TouchableOpacity
      onPress={onpress}
      style={{
        ...styles.mainView,
        backgroundColor: backgroundColor,
        marginTop: marginTop ? responsiveScreenHeight(marginTop) : null,
      }}>
      {loading ? (
        <View style={styles.innerView}>
          <ActivityIndicator size={'small'} color="white" />
        </View>
      ) : (
        <View style={styles.innerView}>
          {showIcon && (
            <Image source={image} style={styles.image} resizeMode="contain" />
          )}
          <Text style={styles.title}>{title}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};
export default Button;
