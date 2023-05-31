//import liraries
import React, {Component, useState, useMemo} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import ReactNativeModal from 'react-native-modal';
import styles from './addSchedule.styles';
import moment from 'moment';
import {TxtInput as TextInput} from '../../../components/general/TxtInput';
import TimePicker from 'react-native-wheel-time-picker';
import {SafeAreaView} from 'react-native-safe-area-context';
import {appImages, colors, fontFamily} from '../../../globals/utilities';
import AuthHeader from '../../../components/general/AuthHeader';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import storageServices from '../../../services/storageServices/storage.services';
import toastServices from '../../../services/toastServices/toast.services';
import {appFBS} from '../../../services/firebaseServices/firebaseServices';
const AddSchedule = props => {
  const [scheduleName, setScheduleName] = useState(null);
  const [visible, setVisible] = useState(false);
  const [newTime, setNewTime] = useState(null);
  const [currentTime, setcurrentTime] = useState(null);
  const MILLISECONDS_PER_MINUTE = 60 * 1000;
  const MILLISECONDS_PER_HOUR = 60 * 60 * 1000;
  const MILLISECONDS_PER_DAY = 24 * MILLISECONDS_PER_HOUR;
  const [timeValue, setTimeValue] = useState(Date.now() % MILLISECONDS_PER_DAY);
  const [loading, setloading] = useState(false);
  const [hour, min] = useMemo(() => {
    return [
      Math.floor(timeValue / MILLISECONDS_PER_HOUR),
      Math.floor((timeValue % MILLISECONDS_PER_HOUR) / MILLISECONDS_PER_MINUTE),
      Math.floor((timeValue % MILLISECONDS_PER_MINUTE) / 1000),
    ];
  }, [timeValue]);
  const addNewSchedule = async obj => {
    setloading(true);
    let id = await storageServices.getKey('user_id');
    obj = {...obj, addedBy: id};
    await appFBS.postData('schedule', obj);
    setNewTime(null);
    setScheduleName(null);
    setcurrentTime(null);
    toastServices.showToast('Schedule added');
    setloading(false);
    props.navigation.goBack();
  };
  const validateInfo = async () => {
    let obj = {};
    if (!scheduleName || scheduleName.length == 0) {
      toastServices.showToast('Please enter schedule name');
    } else if (currentTime == null && newTime == null) {
      toastServices.showToast('Please select schedule time');
    } else {
      if (currentTime) {
        obj = {...obj, time: currentTime, name: scheduleName};
      } else {
        obj = {...obj, time: newTime, name: scheduleName};
      }
      await addNewSchedule(obj);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <AuthHeader
        onpress={() => props.navigation.goBack()}
        title="New schedule"
      />
      <Text style={styles.label}>Schedule Name</Text>
      <View style={styles.inputContainer}>
        <TextInput
          value={scheduleName}
          onChangeText={setScheduleName}
          title="Schedule Name"
          placeholder={'Schedule Name'}
        />
      </View>
      <Text style={styles.label}>Start Time</Text>
      <TouchableOpacity
        style={styles.startTimeButtons}
        onPress={() => {
          setcurrentTime(null);
          setVisible(true);
        }}>
        <Text style={styles.text}>{newTime ? newTime : 'Select Time'} </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          setNewTime(null);
          setcurrentTime(moment().format('hh:mm a'));
        }}
        style={{...styles.startTimeButtons, marginTop: 5}}>
        <Text style={styles.text}>
          {currentTime ? currentTime : 'Start Now'}{' '}
        </Text>
      </TouchableOpacity>
      <View style={styles.bottonTabContainer}>
        <TouchableOpacity
          onPress={() => props.navigation.goBack()}
          style={styles.tabIconButton}>
          <Image style={styles.tabIconImage} source={appImages.cancelIcon} />
          <Text style={styles.tabButtonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => validateInfo()}
          disabled={loading}
          style={styles.tabIconButton}>
          {loading ? (
            <View style={styles.indicatorView}>
              <ActivityIndicator color={'white'} size="small" />
            </View>
          ) : (
            <Image style={styles.tabIconImage} source={appImages.doneIcon} />
          )}
          <Text style={[styles.tabButtonText, styles.orangeText]}>Save</Text>
        </TouchableOpacity>
      </View>
      <ReactNativeModal
        isVisible={visible}
        onBackButtonPress={() => setVisible(false)}
        onBackdropPress={() => setVisible(false)}
        backdropColor="black"
        backdropOpacity={0.5}>
        <View style={styles.modalView}>
          <Text style={styles.modalHeading}> Select Time</Text>
          <View>
            <TimePicker
              value={timeValue}
              timeFormat={[ 'hours12', ':', 'min','am/pm',]}
              wheelProps={{
                wheelHeight: responsiveHeight(8),
                itemHeight: responsiveHeight(6),
                selectedColor: colors.gray600,
                disabledColor: 'gray',
                displayCount: 3,
                containerStyle: {
                  height: responsiveHeight(12),
                  width: responsiveWidth(25),
                },
                textStyle: {
                  fontFamily: fontFamily.appTextMedium,
                  fontSize: responsiveFontSize(3),
                },
              }}
            
              onChange={newValue => {
                setTimeValue(newValue);
                let hours = Math.floor(newValue / MILLISECONDS_PER_HOUR);
                let min = Math.floor(
                  (newValue % MILLISECONDS_PER_HOUR) / MILLISECONDS_PER_MINUTE,
                );
                let time = ` ${
                  hours === 0 ? '12' : hours > 12 ? hours % 12 : hours
                }:${min < 10 ? '0' + min : min} ${hours >= 12 ? 'PM' : 'AM'}`;

                setNewTime(time);
              }}
              containerStyle={styles.timePicker}
            />
          </View>
          <TouchableOpacity
            onPress={() => setVisible(false)}
            style={styles.modalOKButtons}>
            <Text style={{...styles.text, color: 'white'}}> OK</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setVisible(false)}
            style={styles.modalCancelButtons}>
            <Text style={styles.text}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </ReactNativeModal>
    </SafeAreaView>
  );
};
export default AddSchedule;
