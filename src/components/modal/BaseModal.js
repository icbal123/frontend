import { TouchableWithoutFeedback } from "react-native";
import { View } from "react-native";
import CText from "../common/CText";

const BaseModal = ({ goBack, children, title }) => {
    return <View
        className='flex w-full h-full bg-transparent'
    >
        <TouchableWithoutFeedback 
            onPress={() => goBack()}
        >
            <View className='flex w-full h-full' />
        </TouchableWithoutFeedback>
        <View
            className='absolute inset-10 drop-shadow bg-fill-modal flex flex-col space-y-4 items-center'
        >
            <View>
                <CText styles='text-3xl font-bold'>{title}</CText>
            </View>
            <View
                className="grow w-full"
            >
                {children}
            </View>
        </View>
    </View>;
};

export default BaseModal;