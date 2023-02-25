import { useEffect, useState } from "react";
import { getCurrentUserInfo, updateUser } from "../../../utils/accounts";
import CText from "../../common/CText";
import AddForm from "../../layouts/AddForm";
import BaseModal from "../BaseModal"

const renderInterest = ({ interest }) => {
    return <CText color='text-text-alternate'>{interest}</CText>;
};

const InterestsModal = ({ navigation, route }) => {
    const [ initialValues, setInitialValues ] = useState();
    const goBack = () => navigation.pop();
    useEffect(() => {
        getCurrentUserInfo()
            .then(([ data ]) => {
                if (!data.interests) {
                    setInitialValues();
                    return;
                }

                setInitialValues(data.interests);
            })
            .catch(console.error);
    }, []);

    const onSubmit = (values) => {
        updateUser({ interests: values })
            .then(goBack)
            .catch(console.error);
    };

    return <BaseModal
        title='Interests'
        goBack={() => navigation.pop()}
    >
        <AddForm 
            initialValues={initialValues}
            getComponent={renderInterest}
            valueKeys={['interest']}
            valueLabels={['enter an interest...']}
            requiredValueKeys={['interest']}
            onSubmit={onSubmit}
        />
    </BaseModal>;
};

export default InterestsModal;