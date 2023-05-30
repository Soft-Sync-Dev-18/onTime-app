import React from 'react';
import {TouchableOpacity, Text, View, ActivityIndicator} from 'react-native';
import {responsiveHeight} from 'react-native-responsive-dimensions';
import {styles} from './styles';
import {colors} from '../../../globals/utilities';
const BorderButton = ({
  onPress,
  title,
  disabled,
  loading = false,
  marginTop,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        ...styles.container,
        marginTop: marginTop ? responsiveHeight(marginTop) : null,
      }}
      disabled={disabled}>
      {loading ? (
        <ActivityIndicator size="small" color={colors.gray600} />
      ) : (
        <Text style={styles.title}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

export default BorderButton;
