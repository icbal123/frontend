import { useState, useEffect } from "react";
import { startScan, stopScan } from "../utils/bluetooth";
import { Pressable, View } from "react-native";
import CircularImage from "../components/common/CircularImage";
import CText from "../components/common/CText";

const ProfileTile = ({ profile }) => {
  return (
    <Pressable>
      <View className="flex flex-col space-y-1 items-center w-1/2 p-4">
        <CircularImage />
        <CText>{profile}</CText>
      </View>
    </Pressable>
  );
};

const NearbyScreen = ({ navigation, route }) => {
  const [profiles, setProfiles] = useState([]);
  useEffect(() => {
    async function doSomething() {
      const intv = await startScan(setProfiles, () => {
        navigation.pop();
      });
      setTimeout(() => {
        console.log(profiles);
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
