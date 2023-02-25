import { View } from "react-native";
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
        <CText color='text-text-alternate'>from {education.from.toLocaleDateString('en-US', formatOptions)} to {education.to.toLocaleDateString('en-US', formatOptions)}</CText>
        <CText color='text-text-alternate'>GPA: {education.gpa !== undefined ? education.gpa : '-'}</CText>
        <CText color='text-text-alternate' styles='font-bold'>relevant_coursework</CText>
        {education.relevant_coursework !== undefined 
            ? education.relevant_coursework.map((cw, _) => <CText color='text-text-alternate'>{'- '}{cw}</CText>)
            : 'none to display.'
        }
    </View>;
};

const EducationModal = ({ navigation, route }) => {
    const onSubmit = (values) => {

    };

    return <BaseModal
        title='Education'
        goBack={() => navigation.pop()}
    >
        <AddForm 
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