import React, {useEffect, useState} from 'react';
import {
  View,
  StatusBar,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from 'react-native';
import styles from './home.styles';
import SwipeableFlatList from 'react-native-swipeable-list';
import DeleteConfirmationModal from '../../../components/modals/deleteConfirmation/deleteConfirmation';
import moment from 'moment';
import {appFBS} from '../../../services/firebaseServices/firebaseServices';
import storageServices from '../../../services/storageServices/storage.services';
import {AppHeader} from '../../../components/general/AppHeader';
import firestore from '@react-native-firebase/firestore';
import {appImages} from '../../../globals/utilities';
const Home = props => {
  const [schedulesList, setschedulesList] = useState([]);
  const [deleteModal, setdeleteModal] = useState(false);
  const [selectedSchedule, setselectedSchedule] = useState('');
  const [myId, setmyId] = useState('');

  useEffect(() => {
    firestore().collection('schedule').onSnapshot(onResult);
  }, []);
  async function onResult(QuerySnapshot) {
    let changes = QuerySnapshot.docChanges();
    changes.forEach(async element => {
      await getSchedules();
    });
  }
  const getSchedules = async () => {
    let id = await storageServices.getKey('user_id');
    setmyId(id);
    let data = await appFBS.getData('schedule', true, 'addedBy', '==', id);
    setschedulesList(data);
  };
  const renderItem = item => {
    return (
      <TouchableOpacity
        onPress={() => {
          
          let startTimeSplit=item.time.split(":")
          let startHour=startTimeSplit[0].trim()
          let MinSplit=startTimeSplit[1].split(" ")
          let startMin=MinSplit[0].trim()
          let AMPM=MinSplit[1].trim()
          console.log(startHour,startMin,MinSplit[1].trim())
          let startTIme=new Date()
          props.navigation.navigate('Tasks', {data: {...item,startHour,startMin,AMPM}})
        }}
        style={styles.itemContainer}
        activeOpacity={1}>
        <Text style={styles.itemNameText}>{item.name}</Text>
        <Text style={styles.itemTimeText}>{item.time}</Text>
      </TouchableOpacity>
    );
  };
  const deleteItem = async (item, index) => {
    await appFBS.deletData('schedule', item.id);
    setdeleteModal(false);
  };
  const QuickActions = (item, index) => {
    return (
      <View style={styles.qaContainer}>
        <View style={[styles.button, styles.button2]}>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('EditSchedule', {item: item});
            }}>
            <Text style={[styles.buttonText]}>Edit</Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.button, styles.button3]}>
          <TouchableOpacity
            onPress={() => {
              setdeleteModal(true);
              setselectedSchedule(item);
            }}>
            <Text style={[styles.buttonText]}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={'white'} barStyle="dark-content" />
      <AppHeader time={moment().format('MMM D,ddd')} />
      <View style={styles.flatlistContainer}>
        <SwipeableFlatList
          keyExtractor={(item, index) => index.toString()}
          data={schedulesList}
          renderItem={({item}) => renderItem(item)}
          maxSwipeDistance={150}
          renderQuickActions={({item, index}) => QuickActions(item, index)}
          contentContainerStyle={styles.contentContainerStyle}
          shouldBounceOnMount={true}
        />
      </View>
      <View style={styles.bottonTabContainer}>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('Setting')}
          style={styles.tabIconButton}>
          <Image style={styles.tabIconImage} source={appImages.settingIcon} />
          <Text style={styles.tabButtonText}>Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('AddSchedule')}
          style={styles.tabIconButton}>
          <Image style={styles.tabIconImage} source={appImages.plusIcon} />
          <Text style={[styles.tabButtonText, styles.orangeText]}>Add</Text>
        </TouchableOpacity>
      </View>
      <DeleteConfirmationModal
        onpressCancel={() => setdeleteModal(false)}
        onpressDelete={() => deleteItem(selectedSchedule)}
        setVisible={setdeleteModal}
        visible={deleteModal}
        TaskName={selectedSchedule?.name}
        type={'Schedule'}
      />
    </SafeAreaView>
  );
};
export default Home;
