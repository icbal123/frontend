import { useState } from "react";
import { View } from "react-native";
import CircleButton from "../clickable/CircleButton";
import TextButton from "../clickable/TextButton";
import TextLink from "../clickable/TextLink";
import CText from "../common/CText";
import Input from "./Input";

const ArrayInput = ({ label, placeholder, values, onValuesChange }) => {
    const [ input, setInput ] = useState();

    const addValue = (value) => {
        if (values === undefined) values = [];
        const newValues = [...values];
        newValues.push(value);
        onValuesChange(newValues);
        setInput();
    };

    const removeValue = (i) => {
        const newValues = [...values];
        newValues.splice(i, 1);
        onValuesChange(newValues.length > 0 ? newValues : undefined);
    };

    return <View
        className='flex flex-col w-full items-start'
    >
        <CText styles='text-lg font-bold' color='text-text-alternate'>{label}</CText>
        <View
            className='flex flex-col w-full'
        >
            {values && values.map((value, i) => <View
                key={`value-${i}`}
                className="flex flex-row space-x-1 border-b border-b-text-alternate py-4 items-center"
            >
                <CText color='text-text-alternate'>{value}</CText>
                <View className="grow" />
                <CircleButton 
                    isEnabled
                    color='bg-text-errorRed'
                    char='x'
                    onClick={() => removeValue(i)}
                />
            </View>)}
        </View>
        <View className="flex flex-row space-x-4 mt-4">
            <View className="grow">
                <Input 
                    placeholder={placeholder}
                    value={input}
                    onChangeText={(newVal) => setInput(newVal)}
                />
            </View>
            <View>
                <CircleButton
                    isEnabled={input !== undefined}
                    char='+'
                    onClick={() => addValue(input)}
                />
            </View>
        </View>
    </View>;
};

export default ArrayInput;