import React from 'react';
import {View, Text, TextInput, Image, TouchableOpacity} from 'react-native';
import {Icon} from 'react-native-elements';
import {
  responsiveFontSize,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {colors} from '../../../globals/utilities';

import styles from './style';

export const TxtInput = ({
  placeholder,
  onChangeText,
  value,
  keyboardType,
  isSecure,
  onPress,
  maxLength,
  numofline,
  multiline,
  editable = true,
  onBlur,
  ...otherProps
}) => {
  return (
    <View style={styles.mainView}>
      <TextInput
        editable={editable}
        placeholder={placeholder}
        style={styles.TxtInput}
        onChangeText={onChangeText}
        placeholderTextColor={colors.gray400}
        keyboardType={keyboardType}
        secureTextEntry={isSecure}
        maxLength={maxLength}
        numberOfLines={numofline}
        multiline={multiline}
        value={value}
        onBlur={onBlur}
        {...otherProps}
      />
    </View>
  );
};
