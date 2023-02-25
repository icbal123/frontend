import { Pressable, ScrollView, View } from "react-native";
import CText from "../common/CText";

const BaseModal = ({ goBack, children, title }) => {
    return <View
        className='flex flex-col w-full h-full'
    >
        <Pressable
            onPress={() => goBack()}
        >
            <View className="flex grow" />
        </Pressable>
        <View
            className="flex h-5/6 drop-shadow bg-fill-modal space-y-4 rounded-lg p-4 items-center"
        >
            <View>
                <CText styles='text-3xl font-bold' color='text-text-alternate'>{title}</CText>
            </View>
            <ScrollView
                className="flex w-full shrink"
            >
                {children}
            </ScrollView>
        </View>
    </View>;
};

export default BaseModal;