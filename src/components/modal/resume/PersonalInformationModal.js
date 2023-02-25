import { Text } from "react-native";
import CText from "../../common/CText";
import BaseModal from "../BaseModal";

const PersonalInformationModal = ({ navigation, route }) => {
    return <BaseModal
        title='Personal Information'
        goBack={() => navigation.pop()}
    >
        <Text>personal</Text>
    </BaseModal>;
};

export default PersonalInformationModal;