import {Toast} from 'native-base';
const showToast = msg => {
  Toast.show({
    title: msg,
    placement: 'bottom',
    background: 'black',
    color: 'white',
    duration: 3000,
  });
};
export default toastService = {
  showToast,
};
