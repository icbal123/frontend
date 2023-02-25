import BleManager from "react-native-ble-manager";
import BLEAdvertiser from "react-native-ble-advertiser";
import { userBroadcasting, getCurrentUserInfo } from "./accounts";
import {
  NativeEventEmitter,
  NativeModules,
  PermissionsAndroid,
  Platform,
} from "react-native";

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

const eventEmitter = new NativeEventEmitter(NativeModules.BLEAdvertiser);

const startBroadcast = async () => {
  const current_user = (await getCurrentUserInfo())[0];
  await userBroadcasting(true);
  BLEAdvertiser.setCompanyId(0xdeadbeef1337);
  BLEAdvertiser.broadcast(current_user.uuid, [], null)
    .then((x) => console.log(x))
    .catch((err) => console.log(err));
};

const stopBroadcast = async () => {
  await userBroadcasting(false);
  BLEAdvertiser.stopBroadcast()
    .then((success) => console.log("Stop Broadcast Successful", success))
    .catch((error) => console.log("Stop Broadcast Error", error));
};

const startScan = async (setProfiles, options = { showAlert: false }) => {
  let lst = [];
  BleManager.enableBluetooth();
  if (Platform.OS === "android" && Platform.Version >= 23) {
    const result = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    );
    if (result) {
      console.log("Permission is OK");
      await BleManager.start(options);
    } else {
      const result2 = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );
      if (result2) {
        console.log("User accept");
        await BleManager.start(options);
      } else {
        console.log("User refuse");
      }
    }
  }
  eventEmitter.addListener("onDeviceFound", (deviceData) => {
    console.log(deviceData);
  });
  setProfiles([...new Set(lst)]);
  BLEAdvertiser.setCompanyId(0xdeadbeef1337);
  BLEAdvertiser.scan([], {});
  const scanInterval = setInterval(() => {
    console.log("Scanning...");
    BLEAdvertiser.scan([], {});
  }, 10000);

  return scanInterval;
};

const stopScan = async (interval) => {
  await BLEAdvertiser.stopScan();
  clearInterval(interval);
};

export { startScan, stopScan, startBroadcast, stopBroadcast };
