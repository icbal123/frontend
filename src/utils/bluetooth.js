import BleManager from "react-native-ble-manager";
import BLEAdvertiser from "react-native-ble-advertiser";
import { getAndroidId } from "react-native-device-info";
import { userBroadcasting, getCurrentUserInfo } from "./accounts";
import {
  NativeEventEmitter,
  NativeModules,
  PermissionsAndroid,
  Platform,
} from "react-native";

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

const toHex = (str) => {
  var result = "0x";
  for (var i = 0; i < str.length; i++) {
    result += str.charCodeAt(i).toString(16);
  }
  return Number(result);
};

const startBroadcast = async () => {
  const current_user = (await getCurrentUserInfo())[0];
  const android_id = await getAndroidId();
  await userBroadcasting(true);
  BLEAdvertiser.setCompanyId(toHex(android_id));
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

const startScan = async (
  setListener,
  setProfiles,
  options = { showAlert: false }
) => {
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
  const listener = bleManagerEmitter.addListener(
    "BleManagerDiscoverPeripheral",
    (p) => {
      lst = [...lst, p];
    }
  );
  setListener(listener);
  setProfiles([...new Set(lst)]);

  BleManager.scan([], 5, true);
  const scanInterval = setInterval(() => {
    BleManager.scan([], 5, true);
  }, 10000);

  return scanInterval;
};

const stopScan = async (interval) => {
  BleManager.stopScan();
  clearInterval(interval);
};

export { startScan, stopScan, startBroadcast, stopBroadcast };
