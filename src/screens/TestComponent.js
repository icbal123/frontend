import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { createBleManager, getNearbyDevices } from "../utils/bluetooth";
import { BleManager } from "react-native-ble-plx";
import { useProfilePicture } from "../hooks";

export default TestComponent = () => {
  const [uuid, setUUID] = useState();
  const [manager, setManager] = useState();

  // useEffect(() => {
  //   const manager = createBleManager();
  //   getNearbyDevices(manager, (device) => setUUID(device));
  // }, []);

  return (
    <View className="flex w-full h-full items-center justify-center">
      <Text
        onPress={() => {
          const manager = new BleManager();
          setManager(manager);
        }}
      >
        fuck
      </Text>
    </View>
  );
};
