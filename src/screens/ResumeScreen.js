import { useEffect, useState } from "react";
import { Pressable } from "react-native";
import { DeviceEventEmitter } from "react-native";
import { View } from "react-native";
import CircleButton from "../components/clickable/CircleButton";
import TextButton from "../components/clickable/TextButton";
import CircularImage from "../components/common/CircularImage";
import CText from "../components/common/CText";
import { Resume } from "../constants/keys";
import { modalMappings } from "../constants/modalMappings";
import { openGallery } from "../functions/camera";
import { checkFulfilledPL } from "../functions/validation";
import useProfilePicture from "../hooks/useProfilePicture";
import { getCurrentUserInfo } from "../utils/accounts";

const ResumeScreen = ({ navigation, route, setFulfilledPL }) => {
    const [ p, setP ] = useState({});
    const[ l, setL ] = useState(0);
    
  useEffect(() => {
    getCurrentUserInfo()
        .then(([ data ]) => {
            setP(data.p_info || {});
            setL(data.interests ? data.interests.length : 0);
        })
        .catch(console.error);

    DeviceEventEmitter.addListener('p_info updated', (newPInfo) => {
        if (setP) setP(newPInfo);
    });
    DeviceEventEmitter.addListener('interests updated', (newInterests) => {
        if (setL) setL(newInterests ? newInterests.length : 0); 
    });

    return () => {
        DeviceEventEmitter.removeAllListeners('p_info updated');
        DeviceEventEmitter.removeAllListeners('interests updated');
    };
  }, []);
  const openModal = (code) => {
    navigation.navigate(modalMappings[code]);
  };

  const processImage = (img) => {
    console.log(img);
  };

  const canExit = checkFulfilledPL(p, l);

  const exitComponent = (setFulfilledPL)
    ? <View
        className='absolute bottom-9 inset-x-9'
    >
        <TextButton
            isEnabled={canExit}
            text='complete for now'
            onClick={() => setFulfilledPL(true)}
        />
    </View>
    : <View
        className='absolute top-4 right-4'
    >
        <CircleButton 
            isEnabled
            char='X'
            color='bg-text-errorRed'
            onClick={() => navigation.pop()}
        />
    </View>;

  return (
    <View className="flex relative flex-col w-full h-full items-center justify-center bg-fill-background p-9">
      <View className="flex flex-col w-full space-y-6 items-center">
        <Pressable
          onPress={() => openGallery(processImage)}
        >
          <CircularImage width="w-1/2" url={useProfilePicture()} />
        </Pressable>
        <View>
          <CText styles="text-3xl font-bold">enter your details.</CText>
        </View>
        <View className="flex flex-col w-full space-y-4">
          <View>
            <TextButton
              isEnabled
              text="Personal Information"
              onClick={() => openModal(Resume.PERSONAL_INFORMATION)}
            />
          </View>
          <View>
            <TextButton
              isEnabled
              text="Work Experience"
              onClick={() => openModal(Resume.WORK_EXPERIENCE)}
            />
          </View>
          <View>
            <TextButton
              isEnabled
              text="Education"
              onClick={() => openModal(Resume.EDUCATION)}
            />
          </View>
          <View>
            <TextButton
              isEnabled
              text="Skills"
              onClick={() => openModal(Resume.SKILLS)}
            />
          </View>
          <View>
            <TextButton
              isEnabled
              text="Interests"
              onClick={() => openModal(Resume.INTERESTS)}
            />
          </View>
        </View>
      </View>
      {canExit && exitComponent}
    </View>
  );
};

export default ResumeScreen;
