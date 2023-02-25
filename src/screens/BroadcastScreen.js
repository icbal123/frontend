import { useEffect, useRef, useState } from "react";
import { Animated } from "react-native";
import { View } from "react-native";
import TextButton from "../components/clickable/TextButton";
import TextLink from "../components/clickable/TextLink";
import SubtitledText from "../components/text/SubtitledText";
import { startBroadcast, stopBroadcast } from "../utils/bluetooth";

const BroadcastScreen = ({ navigation }) => {
  const [isBroadcasting, setIsBroadcasting] = useState(false);
  const [interval, setInterval] = useState(null);

  const scaleAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(1)).current;

  const toggleBroadcast = async (isBroadcasting) => {
    if (!isBroadcasting) {
      await startBroadcast();
    } else {
      stopBroadcast();
    }
    setIsBroadcasting(!isBroadcasting);
  };

  const duration = 1500;
  const [to, setTO] = useState();

  const resetValues = () => {
    scaleAnim.stopAnimation();
    opacityAnim.stopAnimation();
    scaleAnim.setValue(0);
    opacityAnim.setValue(1);
  };

  const reset = () => {
    resetValues();
    rippleOut();
  };

  const rippleOut = () => {
    Animated.timing(scaleAnim, {
      toValue: 1,
      duration: duration,
      useNativeDriver: true,
    }).start();
    Animated.timing(opacityAnim, {
      toValue: 0,
      duration: duration,
      useNativeDriver: true,
    }).start();

    setTO(setTimeout(reset, duration));
  };

  useEffect(() => {
    resetValues();
    if (isBroadcasting) rippleOut();
    else if (to) clearTimeout(to);

    return () => {
      if (to) clearTimeout(to);
    };
  }, [isBroadcasting]);

  return (
    <View className="w-full h-full flex relative bg-fill-background items-center justify-center p-9">
      <View className="flex absolute inset-0 items-center justify-center">
        <Animated.View
          style={{
            transform: [{ scale: scaleAnim }],
            width: "100%",
            height: "100%",
            opacity: opacityAnim,
            borderColor: "#0006B1",
            borderWidth: 10,
            borderRadius: 10000,
          }}
        />
      </View>
      <View className="w-full flex flex-col space-y-6 items-stretch">
        <SubtitledText
          align="center"
          text={isBroadcasting ? "we're live!" : "all quiet."}
          subtitle={
            isBroadcasting
              ? "sharing your profile with nearby people."
              : "people can't see you right now."
          }
        />
        <View className="flex flex-col space-y-2 items-center w-full">
          <View className="flex w-full">
            <TextButton
              isEnabled
              text={`${isBroadcasting ? "stop" : "start"} broadcasting`}
              onClick={() => toggleBroadcast(isBroadcasting)}
            />
          </View>
          <View>
            <TextLink
              text="edit your details >"
              onClick={() => navigation.navigate("ResumeScreen")}
            />
          </View>
        </View>
      </View>
      <View className="absolute bottom-9 left-9 right-9">
        <TextButton
          isEnabled
          text="view nearby profiles"
          onClick={() => {
            navigation.navigate("NearbyScreen");
          }}
        />
      </View>
    </View>
  );
};

export default BroadcastScreen;
