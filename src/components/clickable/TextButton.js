import { TouchableOpacity } from "react-native";
import CText from "../common/CText";

const TextButton = ({ text, onClick, isEnabled }) => {
    isEnabled = isEnabled && (onClick !== undefined);
    const fillColor = isEnabled ? 'bg-fill-buttonOn' : 'bg-fill-buttonOff';
    return <TouchableOpacity
        onPress={() => {
            if (isEnabled) onClick();
        }}
        className={`flex flex-col ${fillColor} items-center justify-center w-full rounded-lg px-3 py-3`}
    >
        <CText>{text}</CText>
    </TouchableOpacity>;
};

export default TextButton;