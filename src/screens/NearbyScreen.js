import { useState, useEffect } from "react";
import { startScan, stopScan } from "../utils/bluetooth";
import { Pressable, View } from "react-native";
import CircularImage from "../components/common/CircularImage";
import CText from "../components/common/CText";
import { ScrollView } from "react-native";
import { storage } from "../utils/firebase";
import { getDownloadURL, ref } from "@firebase/storage";

const ProfileTile = ({ navigation, profile }) => {
  const [ imageLoading, setImageLoading ] = useState(true);
  const [ imageURL, setImageURL ] = useState();
  
  useEffect(() => {
    setImageLoading(true);
    getDownloadURL(ref(storage, profile.photoURL))
        .then((url) => {
            setImageURL(url);
            setImageLoading(false);
        })
        .catch((e) => setImageLoading(false));
  }, [ profile ]);

  return (
    <Pressable
      className="flex w-full"
        onPress={() => navigation.navigate('SummaryScreen', { email: profile.email, data: profile })}
    >
      <View className="flex flex-col space-y-1 items-center w-1/2 p-4">
        <CircularImage url={imageURL} isLoading={imageLoading} />
        <CText>{profile.p_info.first_name}</CText>
      </View>
    </Pressable>
  );
};

const NearbyScreen = ({ navigation, route }) => {
  const [profiles, setProfiles] = useState([]);
  const [ intv, setIntv ] = useState();

  useEffect(() => {
    startScan(setProfiles, () => navigation.pop())
      .then((intv) => {
        setIntv(intv);
      })
      .catch(console.error);
    // async function doSomething() {
    //   const intv = await startScan(setProfiles, () => {
    //     navigation.pop();
    //   });
    //   setTimeout(() => {
    //     stopScan(intv);
    //   }, 30000);
    // }
  }, []);

  useEffect(() => {
    return () => {
      if (intv) stopScan(intv);
    }
  }, [ intv ]);
  return (
    <View className="flex flex-col justify-start items-center bg-fill-background w-full h-full px-9 pt-9 space-y-6">
      <CText styles="text-3xl font-bold">here's who we found.</CText>
      {profiles.length > 0 ? <ScrollView className="flex w-full">
        <View className="flex flex-row flex-wrap w-full">
            {profiles.map((profile, i) => {
                return <ProfileTile navigation={navigation} profile={profile} key={i} />;
            })}
        </View>
      </ScrollView>
      : <CText styles='mt-6'>we haven't found anyone yet.</CText>
      }
        
    </View>
  );
};

export default NearbyScreen;
