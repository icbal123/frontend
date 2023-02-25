import { View } from "react-native";
import BroadcastScreen from "./src/screens/BroadcastScreen";

export default function App() {
  return (
    <View className="flex w-screen h-screen items-center justify-center">
      <BroadcastScreen />
    </View>
  );
};