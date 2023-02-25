import { TextInput, View } from "react-native";

const Input = ({
  placeholder,
  value,
  onChangeText,
  styles,
  inputMode,
  secureTextEntry,
}) => {
  return (
    <View
      className="flex w-full min-h-4 pb-1 border-b flex-row justify-between"
      style={styles}
    >
      <TextInput
        className="w-full text-lg font-secondary flex-1 leading-5"
        placeholder={placeholder}
        editable
        value={value}
        onChangeText={onChangeText}
        inputMode={inputMode}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};
export default Input;
