import { StyleSheet, Text, View } from "react-native";
import TestComponent from "./src/screens/TestComponent";

export default function App() {
  return (
    <View className="flex w-screen h-screen items-center justify-center">
      <TestComponent />
    </View>
  );
};