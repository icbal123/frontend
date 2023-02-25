import Form from "../../layouts/Form";
import BaseModal from "../BaseModal"

const InterestsModal = ({ navigation, route }) => {
    const onSubmit = ({ interests }) => {

    };

    return <BaseModal
        title='Interests'
        goBack={() => navigation.pop()}
    >
        <Form
            keys={['interests']}
            labels={['interests']}
            inputTypes={{ 'interests': 'stringArr' }}
            requiredKeys={['interests']}
            onSubmit={onSubmit}
        />
    </BaseModal>;
};

export default InterestsModal;