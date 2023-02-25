import * as ImagePicker from "expo-image-picker";
import { PermissionsAndroid } from "react-native";

const openGallery = (callback) => {
    ImagePicker.launchImageLibraryAsync({ 
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.3
    })
    .then(({ assets }) => callback(assets[0]))
    .catch((e) => {
        callback();
    })
};

export { openGallery };