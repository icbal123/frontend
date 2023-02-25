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
      className="flex w-full min-h-4 pb-1 flex-row justify-between border border-stroke-input rounded-lg px-2 py-1.5"
      style={styles}
    >
      <TextInput
        className="w-full text-lg font-secondary flex-1 leading-5"
        underlineColorAndroid='transparent'
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
