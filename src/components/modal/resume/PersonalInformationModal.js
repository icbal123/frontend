import Form from "../../layouts/Form";
import BaseModal from "../BaseModal";

const PersonalInformationModal = ({ navigation, route }) => {
    return <BaseModal
        title='Personal Information'
        goBack={() => navigation.pop()}
    >
        
        <Form 
            keys={['first_name', 'last_name', 'phone', 'website', 'linkedin', 'github' ]}
            labels={['first name', 'last name', 'phone', 'website', 'linkedin', 'github']}
            requiredKeys={['first_name', 'last_name', 'phone']}
            onSubmit={(newObj) => console.log(newObj)}
            submitButtonLabel='Save'
        />
    </BaseModal>;
};

export default PersonalInformationModal;