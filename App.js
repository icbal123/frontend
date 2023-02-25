import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { StatusBar } from "react-native";
import "react-native-gesture-handler";
import Navigator from "./src/routes/Navigator";

export default function App() {
  return <>
    <StatusBar hidden />
    <NavigationContainer theme={DefaultTheme}>
      <Navigator />
    </NavigationContainer>
  </>;
}
