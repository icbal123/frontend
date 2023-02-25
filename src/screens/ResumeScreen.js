import { Pressable } from "react-native";
import { View } from "react-native";
import TextButton from "../components/clickable/TextButton";
import CircularImage from "../components/common/CircularImage";
import CText from "../components/common/CText";
import { Resume } from "../constants/keys";
import { modalMappings } from "../constants/modalMappings";
import { openGallery } from "../functions/camera";

const ResumeScreen = ({ navigation, route }) => {
    const openModal = (code) => {
        navigation.navigate(modalMappings[code]);
    };

    const processImage = (img) => {
        console.log(img);
    };

    return <View
        className="flex flex-col w-full h-full items-center justify-center bg-fill-background p-9"
    >
        <View
            className="flex flex-col w-full space-y-6 items-center"
        >
            <Pressable
                //onPress={() => console.log('press')}
                onPress={() => openGallery(processImage)}
            >
                <CircularImage width='w-1/2' />
            </Pressable>
            <View>
                <CText styles='text-3xl font-bold'>enter your details.</CText>
            </View>
            <View
                className="flex flex-col w-full space-y-4"
            >
                <View>
                    <TextButton
                        isEnabled
                        text='Personal Information'
                        onClick={() => openModal(Resume.PERSONAL_INFORMATION)}
                    />
                </View>
                <View>
                    <TextButton
                        isEnabled 
                        text='Work Experience'
                        onClick={() => openModal(Resume.WORK_EXPERIENCE)}
                    />
                </View>
                <View>
                    <TextButton
                        isEnabled 
                        text='Education'
                        onClick={() => openModal(Resume.EDUCATION)}
                    />
                </View>
                <View>
                    <TextButton
                        isEnabled 
                        text='Skills'
                        onClick={() => openModal(Resume.SKILLS)}
                    />
                </View>
                <View>
                    <TextButton
                        isEnabled 
                        text='Interests'
                        onClick={() => openModal(Resume.INTERESTS)}
                    />
                </View>
            </View>
        </View>
    </View>
};

export default ResumeScreen;