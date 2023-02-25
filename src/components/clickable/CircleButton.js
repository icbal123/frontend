import { View } from "react-native";
import { TouchableOpacity } from "react-native";
import CText from "../common/CText";

const CircleButton = ({ isEnabled, char, onClick, color }) => {
    isEnabled = isEnabled && onClick !== undefined;
    color = color || 'bg-fill-buttonOn';
    const className = `w-6 h-6 items-center justify-center flex rounded-full ${isEnabled ? color : 'bg-fill-buttonOff'}`;
    if (!isEnabled) {
        return <View className={className}>
            <CText>{char}</CText>
        </View>;
    }

    return <TouchableOpacity
        className={className}
        onPress={() => onClick()}
    >
        <CText>{char}</CText>
    </TouchableOpacity>
};

export default CircleButton;