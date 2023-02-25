import { View } from "react-native";
import CText from "../../common/CText";
import AddForm from "../../layouts/AddForm";
import BaseModal from "../BaseModal";

const renderSkills = (skill) => {
    return <View
        className="flex flex-col"
    >
        <CText color='text-text-alternate'>category: {skill.category}</CText>
        <CText color='text-text-alternate'>name: {skill.name}</CText>
        <CText color='text-text-alternate'>proficiency: {skill.proficiency}</CText>

    </View>;
};

const SkillsModal = ({ navigation, route }) => {
    const onSubmit = (values) => {

    };

    return <BaseModal
        title='Skills'
        goBack={() => navigation.pop()}
    >
        <AddForm 
            getComponent={renderSkills}
            valueKeys={['category', 'name', 'proficiency']}
            valueLabels={['category', 'name', 'proficiency']}
            valueInputTypes={{
                'proficiency': 'numeric'
            }}
            requiredValueKeys={['category', 'name', 'proficiency']}
            onSubmit={onSubmit}
        />
    </BaseModal>;
};

export default SkillsModal;