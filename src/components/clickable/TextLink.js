import { View , Pressable } from "react-native";
import CText from "../common/CText";

const TextLink = ({ text, color, onClick }) => {
    color = color || 'text-text-link';
    onClick = onClick || (() => {});
    return <Pressable
        onPress={() => onClick()}
    >
        <View> 
            <CText styles='text-sm' color={color}>{text}</CText>
        </View>
    </Pressable>
};

export default TextLink;