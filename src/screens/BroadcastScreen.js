import { useState } from "react";
import { View } from "react-native";
import TextButton from "../components/clickable/TextButton";
import TextLink from "../components/clickable/TextLink";
import SubtitledText from "../components/text/SubtitledText";

const BroadcastScreen = ({ navigation }) => {
  const [isBroadcasting, setIsBroadcasting] = useState(false);

  return (
    <View className="w-full h-full flex relative bg-fill-background items-center justify-center p-9">
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
        <View className="flex flex-col space-y-2 items-center">
          <TextButton
            isEnabled
            text={`${isBroadcasting ? "stop" : "start"} broadcasting`}
            onClick={() => setIsBroadcasting(!isBroadcasting)}
          />
          <TextLink
            text="edit your details"
            onClick={() => console.log("edit")}
          />
        </View>
      </View>
      <View className="absolute bottom-9 left-9 right-9">
        <TextButton isEnabled text="view nearby profiles" onClick={() => {}} />
      </View>
    </View>
  );
};

export default BroadcastScreen;
