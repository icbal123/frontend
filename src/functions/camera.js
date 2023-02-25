import * as ImagePicker from "expo-image-picker";
import { PermissionsAndroid } from "react-native";

const openGallery = (callback) => {
    ImagePicker.launchImageLibraryAsync({ allowsEditing: true })
    .then(({ assets }) => callback(assets[0]))
    .catch((e) => callback())
};

export { openGallery };