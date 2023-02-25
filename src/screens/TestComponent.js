import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { startBleManager, startBleScan, setListener } from "../utils/bluetooth";
import { useProfilePicture } from "../hooks";
import BleManager from "react-native-ble-manager";
import { NativeEventEmitter, NativeModules } from "react-native";

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

export default TestComponent = () => {
  const [uuid, setUUID] = useState();
  const [manager, setManager] = useState();

  // useEffect(() => {
  //   const manager = createBleManager();
  //   getNearbyDevices(manager, (device) => setUUID(device));
  // }, []);
  const handleDiscoverPeripheral = (peripheral) => {
    console.log("Got BLE peripheral", peripheral);
  };

  return (
    <View className="flex w-full h-full items-center justify-center">
      <Text
        onPress={() => {
          console.log("FUCK");
          BleManager.enableBluetooth();
          BleManager.start({ showAlert: false });
          const listener = bleManagerEmitter.addListener(
            "BleManagerDiscoverPeripheral",
            handleDiscoverPeripheral
          );
          // startBleManager();
          // setListener();
          // startBleScan();
          // console.log("HELLO");
        }}
      >
        init
      </Text>
      <Text
        onPress={() => {
          console.log("FUCK");
          BleManager.scan([], 5, true);
        }}
      >
        scan
      </Text>
    </View>
  );
};
