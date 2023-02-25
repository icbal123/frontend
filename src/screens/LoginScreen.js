import { View, Text } from "react-native";
import { useState } from "react";
import Input from "../components/inputs/Input";
import { auth } from "../utils/firebase";
import TextButton from "../components/clickable/TextButton";
import { createUser, loginUser } from "../utils/accounts";

const LoginScreen = ({ navigation, setCurrentUser }) => {
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <View className="w-full h-full flex relative items-center justify-center p-9">
      <Text className="text-3xl">Login/Signup</Text>
      <View className="pt-12 pb-2 w-full flex flex-col space-y-6 items-stretch">
        <Input placeholder="Email" value={email} onChangeText={setEmail} />
        <Input
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>
      <Text className="text-md text-text-errorRed pb-8">{error}</Text>
      <TextButton
        isEnabled
        text="Login"
        onClick={async () => {
          // navigation.navigate("BroadcastScreen");
          await loginUser({ email, password })
            .then((res) => {
              setCurrentUser(auth.currentUser);
              setError("");
            })
            .catch((err) => {
              console.log(err);
              setError("Email or password is incorrect");
            });
        }}
      />
      <View className="py-2" />
      <TextButton
        isEnabled
        text="Signup"
        onClick={async () => {
          // navigation.navigate("NearbyScreen");
          await createUser({ email, password })
            .then((res) => {
              setCurrentUser(auth.currentUser);
              setError("");
            })
            .catch((err) => {
              console.log(err);
              setError("We were unable to create your account");
            });
        }}
      />
    </View>
  );
};

export default LoginScreen;
