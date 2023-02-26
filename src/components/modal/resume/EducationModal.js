import { useEffect, useState } from "react";
import { View } from "react-native";
import { getDateStr } from "../../../functions/date";
import { getCurrentUserInfo, updateUser } from "../../../utils/accounts";
import CText from "../../common/CText";
import AddForm from "../../layouts/AddForm";
import BaseModal from "../BaseModal";

const renderEducation = (education) => {
    const formatOptions = { month: 'short', year: 'numeric' };
    return <View
        className="flex flex-col"
    >
        <CText color='text-text-alternate'>country: {education.type}</CText>
        <CText color='text-text-alternate'>institution: {education.title}</CText>
        <CText color='text-text-alternate'>from {getDateStr(education.from)} to {getDateStr(education.to)}</CText>
        <CText color='text-text-alternate'>GPA: {education.gpa !== null ? education.gpa : '-'}</CText>
        <CText color='text-text-alternate' styles='font-bold'>relevant coursework</CText>
        {education.relevant_coursework !== null 
            ? education.relevant_coursework.map((cw, _) => <CText color='text-text-alternate'>{'- '}{cw}</CText>)
            : <CText color='text-text-alternate'>none to display.</CText>
        }
    </View>;
};

const EducationModal = ({ navigation, route }) => {
    const [ initialValues, setInitialValues ] = useState();
    const goBack = () => navigation.pop();
    useEffect(() => {
        getCurrentUserInfo()
            .then(([ data ]) => {
                if (!data.education) {
                    setInitialValues();
                    return;
                }

                setInitialValues(data.education.map((ed, _) => {
                    return {
                        country: ed.country,
                        institution: ed.institution,
                        from: ed.from.toDate(),
                        to: ed.to.toDate(),
                        gpa: ed.gpa,
                        relevant_coursework: ed.relevant_coursework
                    };
                }));
            })
            .catch(console.error);
    }, []);

    const onSubmit = (values) => {
        updateUser({ education: values })
            .then(goBack)
            .catch(console.error);
    };

    return <BaseModal
        title='Education'
        goBack={goBack}
    >
        <AddForm 
            initialValues={initialValues}
            getComponent={renderEducation}
            valueKeys={['country', 'institution', 'from', 'to', 'gpa', 'relevant_coursework']}
            valueLabels={['country', 'institution', 'from', 'to', 'GPA', 'relevant coursework']}
            valueInputTypes={{
                'from': 'date',
                'to': 'date',
                'gpa': 'numeric',
                'relevant_coursework': 'stringArr'
            }}
            requiredValueKeys={['country', 'institution', 'from', 'to']}
            onSubmit={onSubmit}
        />
    </BaseModal>;
};

export default EducationModal;