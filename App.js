import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import "react-native-gesture-handler";
import Navigator from "./src/routes/Navigator";

export default function App() {
  return (
    <NavigationContainer theme={DefaultTheme}>
      <Navigator />
    </NavigationContainer>
  );
}
