import { TouchableOpacity, View } from "react-native";
import CText from "../common/CText";

const Accordion = ({ title, isExpanded, setIsExpanded, children }) => {
    return <View
        className="flex flex-col rounded overflow-hidden"
    >
        <TouchableOpacity
            className="flex w-full px-5 py-3 bg-fill-primary"
            onPress={() => setIsExpanded(!isExpanded)}
        >
            <CText styles='text-xl font-bold'>{title}</CText>
        </TouchableOpacity>
        {isExpanded && <View
            className="flex w-full p-4 bg-fill-secondary"
        >
            {children}
        </View>}
    </View>
};

export default Accordion;