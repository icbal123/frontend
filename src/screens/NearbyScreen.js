import { Image } from "react-native";
import { TouchableWithoutFeedback } from "react-native";
import { View } from "react-native";
import { useState } from "react";
import CText from "../components/common/CText";

const ProfileTile = ({ profile }) => {
  return (
    <TouchableWithoutFeedback className="flex flex-col space-y-1">
      <Image
        source={{
          uri: "https://reactnative.dev/img/tiny_logo.png",
        }}
        className="rounded-full w-full h-full object-cover"
      />
      <CText>{profile}</CText>
    </TouchableWithoutFeedback>
  );
};

const NearbyScreen = ({ navigation }) => {
  const [profiles, setProfiles] = useState(["a", "b"]);

  return (
    <View className="flex flex-col justify-start items-center w-full h-full p-9 space-y-6">
      <CText styles="font-bold">here's who we found.</CText>
      <View className="grid cols-2">
        {profiles.length > 0 ? (
          profiles.map((profile, i) => (
            <ProfileTile profile={profile} key={i} />
          ))
        ) : (
          <CText>we haven't found anyone yet.</CText>
        )}
      </View>
    </View>
  );
};

export default NearbyScreen;
