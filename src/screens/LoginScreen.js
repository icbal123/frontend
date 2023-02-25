import { View, Text, TextInput } from "react-native";
import { useState } from "react";
import Input from "../components/inputs/Input";
import TextButton from "../components/clickable/TextButton";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <View className="flex flex-col justify-start items-center w-full h-full p-9 space-y-6">
      <Text>Fuck</Text>
      <Input placeholder="Email" value={email} onChangeText={setEmail} />
      <Input
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextButton
        isEnabled
        text="Login"
        onClick={() => {
          navigation.navigate("BroadcastScreen");
        }}
      />
    </View>
  );
};

export default LoginScreen;
