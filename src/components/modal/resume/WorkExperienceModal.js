import { useEffect, useState } from "react";
import { View } from "react-native";
import { getCurrentUserInfo, updateUser } from "../../../utils/accounts";
import CText from "../../common/CText";
import AddForm from "../../layouts/AddForm";
import BaseModal from "../BaseModal";

const renderWorkExperience = (exp) => {
    const formatOptions = { month: 'short', year: 'numeric' };
    return <View
        className="flex flex-col"
    >
        <CText color='text-text-alternate'>type: {exp.type}</CText>
        <CText color='text-text-alternate'>title: {exp.title}</CText>
        <CText color='text-text-alternate'>company: {exp.company}</CText>
        <CText color='text-text-alternate'>from {exp.from.toLocaleDateString('en-US', formatOptions)} to {exp.to.toLocaleDateString('en-US', formatOptions)}</CText>
        <CText color='text-text-alternate' styles='font-bold'>description</CText>
        {exp.description.map((desc, _) => <CText color='text-text-alternate'>{'- '}{desc}</CText>)}
        <CText color='text-text-alternate' styles='font-bold'>skills</CText>
        {exp.skills.map((skill, _) => <CText color='text-text-alternate'>{'- '}{skill}</CText>)}
    </View>;
};

const WorkExperienceModal = ({ navigation, route }) => {
    const [ initialValues, setInitialValues ] = useState();
    const goBack = () => navigation.pop();
    useEffect(() => {
        getCurrentUserInfo()
            .then(([ data ]) => {
                if (!data.experience) {
                    setInitialValues();
                    return;
                }

                setInitialValues(data.experience.map((exp, _) => {
                    return {
                        type: exp.type,
                        title: exp.title,
                        company: exp.company,
                        from: exp.from.toDate(),
                        to: exp.to.toDate(),
                        description: exp.description,
                        skills: exp.skills
                    };
                }));
            })
            .catch(console.error);
    }, []);

    const onSubmit = (values) => {
        updateUser({ experience: values })
            .then(goBack)
            .catch(console.error);
    };

    return <BaseModal
        title='Work Experience'
        goBack={goBack}
    >
        <AddForm 
            initialValues={initialValues}
            getComponent={renderWorkExperience}
            valueKeys={['type', 'title', 'company', 'from', 'to', 'description', 'skills']}
            valueLabels={['type', 'title', 'company', 'from', 'to', 'description', 'skills']}
            valueInputTypes={{
                'from': 'date',
                'to': 'date',
                'description': 'stringArr',
                'skills': 'stringArr'
            }}
            requiredValueKeys={['type', 'title', 'company', 'from', 'to', 'description', 'skills']}
            onSubmit={onSubmit}
        />
    </BaseModal>;
};

export default WorkExperienceModal;