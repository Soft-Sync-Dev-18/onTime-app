import React from 'react';
import {View, Text, TextInput, Image, TouchableOpacity} from 'react-native';
import {textColor} from '../../constants/colors';
import {Icon} from 'react-native-elements';
import {
  responsiveFontSize,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {appImages} from '../../../globals/utilities/assets/index';
import styles from './style';

export const SearchInput = ({
  placeholder,
  onChangeText,
  MyStyles,
  value,
  itsStyle,
  iconName,
  iconType,
  iconStyles,
  iconSize,
  keyboardType,
  imageName,
  iconColor = '#2F2E41',
  apply = false,
  isSecure,
  onPress,
  maxLength,
  numofline,
  right = false,
  left = false,
  multiline,
  ...otherProps
}) => {
  return (
    <View>
      <View style={[styles.content, MyStyles]}>
        <View>
          {iconName && left && (
            <TouchableOpacity onPress={onPress}>
              <Icon
                style={iconStyles}
                name={iconName}
                type={iconType}
                color={iconColor}
                size={iconSize ? iconSize : responsiveFontSize(3)}
              />
            </TouchableOpacity>
          )}

          {imageName && (
            <TouchableOpacity onPress={onPress} style={styles.imgStyles}>
              <Image source={appImages[imageName]} />
            </TouchableOpacity>
          )}
        </View>
        <View>
          <TextInput
            placeholder={placeholder}
            style={[styles.TxtInput, itsStyle]}
            onChangeText={onChangeText}
            placeholderTextColor="#ccc"
            keyboardType={keyboardType}
            secureTextEntry={isSecure}
            maxLength={maxLength}
            numberOfLines={numofline}
            multiline={multiline}
            value={value}
            {...otherProps}
          />
        </View>

        <View>
          {iconName && right && (
            <TouchableOpacity onPress={onPress}>
              <Icon
                style={[iconStyles, styles.iconStyles]}
                name={iconName}
                type={iconType}
                color={iconColor}
                size={iconSize ? iconSize : responsiveFontSize(3)}
              />
            </TouchableOpacity>
          )}

          {imageName && (
            <TouchableOpacity onPress={onPress} style={styles.imgStyles}>
              <Image source={appImages[imageName]} />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};
