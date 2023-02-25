import { View, Text } from "react-native";
import { useState } from "react";
import Input from "../components/inputs/Input";
import { auth } from "../utils/firebase";
import TextButton from "../components/clickable/TextButton";
import { createUser, loginUser } from "../utils/accounts";
import CText from "../components/common/CText";

const LoginScreen = ({ navigation, setCurrentUser }) => {
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <View className="w-full h-full flex relative items-center justify-center p-9 bg-fill-background">
      <View className="flex w-full bg-fill-modal drop-shadow rounded-lg p-9 items-center">
        <CText styles="text-3xl font-bold" color='text-fill-secondary'>welcome to</CText>
        <CText styles="text-2xl font-bold" color='text-fill-primary'>ConferenceConnect.</CText>
        <View className="pt-12 pb-2 w-full flex flex-col space-y-4 items-stretch">
          <View>
            <Input placeholder="email" value={email} onChangeText={setEmail} />
          </View>
          <View>
            <Input
              placeholder="password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>
        </View>
        <CText styles="text-md text-text-errorRed pb-5">{error}</CText>
        <TextButton
          isEnabled
          text="login"
          onClick={async () => {
            // navigation.navigate("BroadcastScreen");
            await loginUser({ email, password })
              .then((res) => {
                setCurrentUser(auth.currentUser);
                setError("");
              })
              .catch((err) => {
                console.log(err);
                setError("email or password is incorrect");
              });
          }}
        />
        <View className="py-1" />
        <TextButton
          isEnabled
          text="sign up"
          onClick={async () => {
            // navigation.navigate("NearbyScreen");
            await createUser({ email, password })
              .then((res) => {
                setCurrentUser(auth.currentUser);
                setError("");
              })
              .catch((err) => {
                console.log(err);
                setError("we were unable to create your account");
              });
          }}
        />
      </View>
    </View>
  );
};

export default LoginScreen;
