import { View } from "react-native";
import TextButton from "../components/clickable/TextButton";
import CText from "../components/common/CText";
import { Resume } from "../components/common/keys";

const ResumeScreen = () => {
    const openModal = (code) => {

    };

    return <View
        className="flex flex-col w-full h-full items-center justify-center bg-fill-background p-9"
    >
        <View
            className="flex flex-col w-full space-y-6 items-center"
        >
            <CText styles='text-3xl font-bold'>enter your details.</CText>
            <View
                className="flex flex-col w-full space-y-4"
            >
                <View>
                    <TextButton 
                        text='Personal Information'
                        onClick={() => openModal(Resume.PERSONAL_INFORMATION)}
                    />
                </View>
                <View>
                    <TextButton 
                        text='Work Experience'
                        onClick={() => openModal(Resume.WORK_EXPERIENCE)}
                    />
                </View>
                <View>
                    <TextButton 
                        text='Education'
                        onClick={() => openModal(Resume.EDUCATION)}
                    />
                </View>
                <View>
                    <TextButton 
                        text='Skills'
                        onClick={() => openModal(Resume.SKILLS)}
                    />
                </View>
                <View>
                    <TextButton 
                        text='Interests'
                        onClick={() => openModal(Resume.INTERESTS)}
                    />
                </View>
            </View>
        </View>
    </View>
};

export default ResumeScreen;