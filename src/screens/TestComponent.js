import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { createBleManager, getNearbyDevices } from "../utils/bluetooth";
import { useProfilePicture } from "../hooks";

export default TestComponent = () => {
  const [ uuid, setUUID ] = useState();

  useEffect(() => {
    const manager = createBleManager();
    getNearbyDevices(manager, (device) => setUUID(device));
  }, []);

  return (
    <View className="flex w-full h-full items-center justify-center">
      <Text>{uuid}</Text>
    </View>
  );
};
