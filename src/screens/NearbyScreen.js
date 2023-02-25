import { useState, useEffect } from "react";
import { Image, TouchableWithoutFeedback, View } from "react-native";
import { startScan, stopScan } from "../utils/bluetooth";
import CText from "../components/common/CText";

const ProfileTile = ({ profile }) => {
  return (
    <TouchableWithoutFeedback>
      <View className="flex flex-col space-y-1 items-center w-1/2 p-4">
        <Image
          source={{
            uri: "https://reactnative.dev/img/tiny_logo.png",
          }}
          className="rounded-full w-full aspect-square object-cover"
        />
        <CText>{profile}</CText>
      </View>
    </TouchableWithoutFeedback>
  );
};

const NearbyScreen = ({ navigation, route }) => {
  const [profiles, setProfiles] = useState(["a", "b"]);
  const [listener, setListener] = useState(null);
  useEffect(() => {
    async function doSomething() {
      const intv = await startScan(setListener, setProfiles);
      setTimeout(() => {
        stopScan(intv);
      }, 30000);
    }
    doSomething();
  }, []);

  return (
    <View className="flex flex-col justify-start items-center bg-fill-background w-full h-full p-9 space-y-6">
      <CText styles="text-3xl font-bold">here's who we found.</CText>
      <View className="flex flex-row flex-wrap">
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
