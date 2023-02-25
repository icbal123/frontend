import { View } from "react-native";
import BroadcastScreen from "./src/screens/BroadcastScreen";
import NearbyScreen from "./src/screens/NearbyScreen";
import ResumeScreen from "./src/screens/ResumeScreen";
import SummaryScreen from "./src/screens/SummaryScreen";

export default function App() {
  return (
    <View className="flex w-screen h-screen items-center justify-center">
      <SummaryScreen />
    </View>
  );
};