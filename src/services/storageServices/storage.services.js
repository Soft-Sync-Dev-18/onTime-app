import AsyncStorage from '@react-native-async-storage/async-storage';
const getKey = async key => {
  let res = await AsyncStorage.getItem(key);
  return res;
};
const setKey = async (name, value) => {
  await AsyncStorage.setItem(name, value);
};
const deleteKey = async key => {
  await AsyncStorage.removeItem(key);
};
export default storageServices = {
  getKey,
  setKey,
  deleteKey,
};
