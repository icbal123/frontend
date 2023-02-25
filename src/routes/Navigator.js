import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import NearbyScreen from "../screens/NearbyScreen";
import ResumeScreen from "../screens/ResumeScreen";
import LoginScreen from "../screens/LoginScreen";
import SummaryScreen from "../screens/SummaryScreen";
import PersonalInformationModal from "../components/modal/resume/PersonalInformationModal";

const MainStack = createNativeStackNavigator();
const RootStack = createNativeStackNavigator();

function MainStackScreen() {
  return (
    <MainStack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={"HomeScreen"}
    >
      <MainStack.Screen name="HomeScreen" component={HomeScreen} />
      <MainStack.Screen name="NearbyScreen" component={NearbyScreen} />
      <MainStack.Screen name="ResumeScreen" component={ResumeScreen} />
      <MainStack.Screen name="SummaryScreen" component={SummaryScreen} />
      <MainStack.Screen name="LoginScreen" component={LoginScreen} />
    </MainStack.Navigator>
  );
}

function Navigator() {
  return (
    <RootStack.Navigator
      mode="modal"
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: "transparent" },
        cardOverlayEnabled: true,
        cardStyleInterpolator: ({ current: { progress } }) => ({
          cardStyle: {
            opacity: progress.interpolate({
              inputRange: [0, 0.5, 0.9, 1],
              outputRange: [0, 0.25, 0.7, 1],
            }),
          },
          overlayStyle: {
            opacity: progress.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 0.5],
              extrapolate: "clamp",
            }),
          },
        }),
      }}
      initialRouteName="Main"
    >
      <RootStack.Screen
        name="Main"
        component={MainStackScreen}
        options={{ headerShown: false }}
      />
      <RootStack.Group screenOptions={{ presentation: "modal" }}>
        <RootStack.Screen
          name="PersonalInformationModal"
          component={PersonalInformationModal}
        />
      </RootStack.Group>
    </RootStack.Navigator>
  );
}

export default Navigator;
