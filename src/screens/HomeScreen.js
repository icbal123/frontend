import { auth } from "../utils/firebase";
import { useState } from "react";
import BroadcastScreen from "./BroadcastScreen";
import LoginScreen from "./LoginScreen";

const HomeScreen = ({ navigation }) => {
  const [currentUser, setCurrentUser] = useState(auth.currentUser || null);
  return currentUser ? (
    <BroadcastScreen navigation={navigation} />
  ) : (
    <LoginScreen navigation={navigation} setCurrentUser={setCurrentUser} />
  );
};

export default HomeScreen;
