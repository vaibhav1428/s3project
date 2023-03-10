import React from 'react';
import {TouchableOpacity, Text, View} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import styles from './styles';
import ImagePickerCropper from 'react-native-image-crop-picker';
import { Icon } from '@rneui/base';

const ImagePicker = React.forwardRef(({onFileSelected}, ref) => {
  const options = [
    {
      name: 'Take from camera',
      icon: <Icon color={"#5D3FD3"} size={21} name="camera" />,
      onPress: () => {
        ImagePickerCropper.openCamera({
          width: 300,
          height: 300,
          cropping: true,
          freeStyleCropEnabled: true,
          includeBase64:true
        })
          .then((images) => {
            onFileSelected(images);
          })
          .catch((error) => {});
      },
    },
    {
      name: 'Choose from Gallery',
      icon: <Icon name="image" color={"#5D3FD3"} size={21} />,
      onPress: () => {
        ImagePickerCropper.openPicker({
          width: 300,
          height: 300,
          cropping: true,
          freeStyleCropEnabled: true,
          includeBase64:true
        })
          .then((images) => {
            onFileSelected(images);
          })
          .catch((error) => {});
      },
    },
  ];

  
  return (
    <RBSheet
      ref={ref}
      height={190}
      openDuration={250}
      dragFromTopOnly
      closeOnDragDown
      customStyles={{
        container: {
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
        },
      }}>
      <View style={styles.optionsWrapper}>
        {options.map(({name, onPress, icon}) => (
          <TouchableOpacity
            onPress={onPress}
            style={styles.pickerOption}
            key={name}>
            {icon}
            <Text style={styles.text}>{name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </RBSheet>
  );
});

export default ImagePicker;
