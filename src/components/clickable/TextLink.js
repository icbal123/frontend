import { TouchableWithoutFeedback } from "react-native";
import CText from "../common/CText";

const TextLink = ({ text, onClick }) => {
    onClick = onClick || (() => {});
    return <TouchableWithoutFeedback
        onPress={() => onClick()}
    >
        <CText styles='text-sm' color='text-text-link'>{`${text} >`}</CText>
    </TouchableWithoutFeedback>
};

export default TextLink;