import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BroadcastScreen from "../screens/BroadcastScreen";
import NearbyScreen from "../screens/NearbyScreen";
import ResumeScreen from "../screens/ResumeScreen";
import LoginScreen from "../screens/LoginScreen";
import { auth } from "../utils/firebase";

const Stack = createNativeStackNavigator();

function Navigator() {
  const currentUser = auth.currentUser || null;
  const initialRouteName = currentUser ? "BroadcastScreen" : "LoginScreen";
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={initialRouteName}
    >
      <Stack.Screen name="BroadcastScreen" component={BroadcastScreen} />
      <Stack.Screen name="NearbyScreen" component={NearbyScreen} />
      <Stack.Screen name="ResumeScreen" component={ResumeScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
    </Stack.Navigator>
  );
}

export default Navigator;
