import React from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  Image,
  ImageBackground,
} from 'react-native';
import {colors, Icon} from 'react-native-elements';
import {StyleSheet} from 'react-native';
import {AppColor, textColor} from '../../../globals/utilities/index';
import {fontFamily} from '../../constants/fonts';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import styles from './style';
import {Itemlist} from '../listItem';

export const HomeCard = props => {
  const {
    image,
    Title,
    timeago,
    des,
    onPress,
    likesCount,
    messCount,
    modalPress,
    likePress,
    IconName,
    IconColor,
    sharePress,
    messPress,
  } = props;
  return (
    <ImageBackground
      source={image}
      style={styles.mainView}
      imageStyle={{borderRadius: responsiveWidth(3)}}>
      <View style={styles.mainView2}>
        <Text style={styles.Title}>{Title}</Text>
        <Text style={styles.time}>{timeago}</Text>
      </View>
      <TouchableOpacity style={styles.buton} onPress={onPress}>
          <Text style={styles.start}>{'Start'}</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};
