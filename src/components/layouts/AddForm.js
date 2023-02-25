import { useEffect, useState } from "react";
import { View } from "react-native";
import CircleButton from "../clickable/CircleButton";
import TextButton from "../clickable/TextButton";
import Form from "./Form";

const AddForm = ({ 
    initialValues,
    getComponent,
    valueKeys,
    requiredValueKeys,
    valueLabels,
    valueInputTypes,
    submitButtonLabel,
    onSubmit
 }) => {
    const [ values, setValues ] = useState(initialValues || []);
    submitButtonLabel = submitButtonLabel || 'save';

    useEffect(() => setValues(initialValues || []), [ initialValues ]);

    const addValue = (value) => {
        const newValues = [...values];
        newValues.push(value);
        setValues(newValues);
    };

    const removeValue = (i) => {
        const newValues = [...values];
        newValues.splice(i, 1);
        setValues(newValues);
    };

    return <View
        className='flex flex-col space-y-4 w-full'
    >
        <View
            className='flex flex-col'
        >
            {values && values.map((value, i) => <View
                key={`value-${i}`}
                className='flex flex-row py-4 border-b border-b-text-alternate items-center'
            >
                {getComponent(value)}
                <View className="flex grow" />
                <CircleButton
                    isEnabled
                    char='X'
                    color='bg-text-errorRed'
                    onClick={() => removeValue(i)}
                />
            </View>)}
        </View>
        <Form
            keys={valueKeys}
            requiredKeys={requiredValueKeys}
            labels={valueLabels}
            inputTypes={valueInputTypes}
            submitButtonLabel='add'
            onSubmit={(obj) => addValue(obj)}
        />
        <View>
            <TextButton 
                isEnabled
                text={submitButtonLabel}
                onClick={() => onSubmit(values)}
            />
        </View>
    </View>
};

export default AddForm;