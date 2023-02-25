import { useEffect, useState } from "react";
import { View } from "react-native";
import { getCurrentUserInfo, updateUser } from "../../../utils/accounts";
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
    const [ initialValues, setInitialValues ] = useState();
    const goBack = () => navigation.pop();
    useEffect(() => {
        getCurrentUserInfo()
            .then(([ data ]) => {
                if (!data.skills) {
                    setInitialValues();
                    return;
                }

                setInitialValues(data.skills);
            })
            .catch(console.error);
    }, []);

    const onSubmit = (values) => {
        updateUser({ skills: values })
            .then(goBack)
            .catch(console.error);
    };

    return <BaseModal
        title='Skills'
        goBack={goBack}
    >
        <AddForm 
            initialValues={initialValues}
            getComponent={renderSkills}
            valueKeys={['category', 'name', 'proficiency']}
            valueLabels={['category', 'name', 'proficiency (out of 10)']}
            valueInputTypes={{
                'proficiency': 'numeric'
            }}
            requiredValueKeys={['category', 'name', 'proficiency']}
            onSubmit={onSubmit}
        />
    </BaseModal>;
};

export default SkillsModal;