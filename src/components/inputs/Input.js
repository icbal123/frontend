import { Pressable, TextInput, View } from "react-native";

const Input = ({
  placeholder,
  value,
  onChangeText,
  children,
  style,
  secureTextEntry,
  onPressIcon,
}) => {
  return (
    <View
      keyboardShouldPersistTaps="handled"
      className="w-full pb-1 border-b flex-row justify-between"
      style={style}
    >
      <TextInput
        className="text-lg font-secondary flex-1 leading-5"
        placeholder={placeholder}
        editable
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
      />
      <Pressable hitSlop={10} onPress={onPressIcon}>
        {children}
      </Pressable>
    </View>
  );
};
export default Input;
