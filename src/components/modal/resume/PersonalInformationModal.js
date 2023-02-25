import { useEffect, useState } from "react";
import { getCurrentUserInfo, updateUser } from "../../../utils/accounts";
import Form from "../../layouts/Form";
import BaseModal from "../BaseModal";

const PersonalInformationModal = ({ navigation, route }) => {
    const [ initialValues, setInitialValues ] = useState();
    const goBack = () => navigation.pop();

    useEffect(() => {
        getCurrentUserInfo()
            .then(([ data ]) => {
                if (!data.p_info) {
                    setInitialValues();
                    return;
                }

                setInitialValues([
                    data.p_info.first_name,
                    data.p_info.last_name,
                    data.p_info.phone,
                    data.p_info.website,
                    data.p_info.linkedin,
                    data.p_info.github
                ]);
            })
            .catch(console.error);
    }, []);

    const onSubmit = (obj) => {
        updateUser({ p_info: obj })
            .then(goBack)
            .catch(console.error);
    };

    return <BaseModal
        title='Personal Information'
        goBack={goBack}
    >
        <Form 
            shouldPreserveValues
            initialValues={initialValues}
            keys={['first_name', 'last_name', 'phone', 'website', 'linkedin', 'github' ]}
            labels={['first name', 'last name', 'phone', 'website', 'linkedin', 'github']}
            requiredKeys={['first_name', 'last_name', 'phone']}
            onSubmit={onSubmit}
            submitButtonLabel='Save'
        />
    </BaseModal>;
};

export default PersonalInformationModal;