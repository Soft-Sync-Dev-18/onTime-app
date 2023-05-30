import ImagePicker from 'react-native-image-crop-picker';

const selectPhoto = async setImage => {
  ImagePicker.openPicker({
    width: 300,
    height: 400,
  }).then(image => {
    console.log('image ', image);
    setImage(image.path);
  });
};
const takePhoto = async setImage => {
  ImagePicker.openCamera({
    width: 300,
    height: 400,
  }).then(image => {
    setImage(image);
  });
};
export default commonServices = {
  takePhoto,
  selectPhoto,
};
