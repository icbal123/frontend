import { auth } from "../utils/firebase";
import { useState, useEffect } from "react";
import BroadcastScreen from "./BroadcastScreen";
import ResumeScreen from "./ResumeScreen";
import { getCurrentUserInfo } from "../utils/accounts";
import LoginScreen from "./LoginScreen";
import { View } from "react-native";
import { ActivityIndicator } from "react-native";
import CText from "../components/common/CText";
import { checkFulfilledPL } from "../functions/validation";

const HomeScreen = ({ navigation }) => {
  const [currentUser, setCurrentUser] = useState(auth.currentUser || null);
  const [_, refresh] = useState(false);
  const [ loading, setLoading ] = useState(true);
  const [ fulfilledPL, setFulfilledPL ] = useState(false);

  useEffect(() => {
    const doSomething = async () => {
      setLoading(true);

      try {
        const [ userInfo ] = await getCurrentUserInfo();
        setFulfilledPL(checkFulfilledPL(userInfo.p_info, userInfo.interests.length));
        setLoading(false);
      } catch (e) {
        setLoading(false);
      }
    };
    doSomething();
  }, [currentUser]);

  if (loading) return <View
    className="flex flex-col w-full h-full items-center justify-center bg-fill-background"
  >
    <View
      className="flex flex-col items-center"
    >
      <ActivityIndicator 
        size='large'
        className="mb-4"
      />
      <CText>fetching your data...</CText>
    </View>
  </View>;

  if (!currentUser) return <LoginScreen navigation={navigation} setCurrentUser={setCurrentUser} />;
  console.log(fulfilledPL);
  if (fulfilledPL) return <BroadcastScreen navigation={navigation} />;
  return <ResumeScreen navigation={navigation} refresh={refresh} setFulfilledPL={(newPL) => setFulfilledPL(newPL)} />;
};

export default HomeScreen;
