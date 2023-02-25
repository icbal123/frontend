import { auth } from "../utils/firebase";
import { useState, useEffect } from "react";
import BroadcastScreen from "./BroadcastScreen";
import ResumeScreen from "./ResumeScreen";
import { getCurrentUserInfo } from "../utils/accounts";
import LoginScreen from "./LoginScreen";

const HomeScreen = ({ navigation }) => {
  const [currentUser, setCurrentUser] = useState(auth.currentUser || null);
  const [p, setP] = useState({});
  const [l, setL] = useState(0);
  const [_, refresh] = useState(false);
  useEffect(() => {
    const doSomething = async () => {
      try {
        const userInfo = await getCurrentUserInfo();
        console.log(userInfo);
        // setP(userInfo.p_info);
        // setL(userInfo.interests.length);
        setP({ first_name: "a", last_name: "b", phone: "c" });
        setL(999);
      } catch (e) {}
    };
    doSomething();
  }, [currentUser]);
  return currentUser && p?.first_name && p?.last_name && p?.phone && l > 0 ? (
    <BroadcastScreen navigation={navigation} />
  ) : currentUser ? (
    <ResumeScreen navigation={navigation} refresh={refresh} />
  ) : (
    <LoginScreen navigation={navigation} setCurrentUser={setCurrentUser} />
  );
};

export default HomeScreen;
