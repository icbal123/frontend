import { useState } from "react";
import { View } from "react-native";
import TextButton from "../clickable/TextButton";
import ArrayInput from "../inputs/ArrayInput";
import DateInput from "../inputs/DateInput";
import Input from "../inputs/Input";

const Form = ({ 
    keys, 
    requiredKeys, 
    labels, 
    inputTypes,
    submitButtonLabel, 
    onSubmit 
}) => {
    const getDefaultObj = () => Object.fromEntries(keys.map((k, _) => [k, undefined]));
    const [ obj, setObj ] = useState(getDefaultObj());
    requiredKeys = requiredKeys || [];
    submitButtonLabel = submitButtonLabel || 'save';
    inputTypes = inputTypes || {};

    const changeObj = (key, value) => {
        obj[key] = value;
        setObj({...obj});
    };

    return <View
        className="flex flex-col w-full space-y-4"
    >
        <View
            className="flex flex-col w-full space-y-3"
        >
            {keys.map((key, i) => {
                const changeFn = (newVal) => changeObj(key, newVal);
                let inputComponent;
                if (key in inputTypes) {
                    switch(inputTypes[key]) {
                        case 'date':
                            inputComponent = <DateInput 
                                label={labels[i]}
                                value={obj[key]}
                                onDateChange={changeFn}
                            />;
                            break;
                        case 'stringArr':
                            inputComponent = <ArrayInput 
                                label={labels[i]}
                                values={obj[key]}
                                onValuesChange={changeFn}
                            />;
                            break;
                        case 'numeric':
                            inputComponent = <Input
                                placeholder={labels[i]}
                                value={obj[key]}
                                inputMode='numeric'
                                onChangeText={changeFn}
                            />; 
                            break;
                    }
                } else {
                    inputComponent = <Input
                        placeholder={labels[i]}
                        value={obj[key]}
                        onChangeText={changeFn}
                    />; 
                }

                return <View
                    key={`input-${i}`} 
                >
                    {inputComponent}
                </View>
            })}
        </View>
        <View>
            <TextButton 
                isEnabled={requiredKeys.reduce((prev, curKey) => {
                    const curValid = obj[curKey] !== undefined;
                    if (prev === undefined) return curValid;
                    return curValid && prev; 
                })}
                text={submitButtonLabel}
                onClick={() => {
                    onSubmit(obj);
                    setObj(getDefaultObj());
                }}
            />
        </View>
    </View>;
};

export default Form;