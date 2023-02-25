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
import RNAndroidLocationEnabler from "react-native-android-location-enabler";

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
  onPermissionsFail,
  options = { showAlert: false },
) => {
  let lst = [];
  let shouldRegisterListeners = false;

  if (Platform.OS === "android" && Platform.Version >= 23) {
    const btGranted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN);
    
    const onUserRefuse = () => {
      console.log('User refuse');
    };

    const onLocationPassed = async () => {
      try {
        const result = await RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({});
        if (result.includes('enabled')) {
          console.log('starting');
          await BleManager.start(options);
          shouldRegisterListeners = true;
        }
        else onUserRefuse();
      } catch (e) {
        onUserRefuse();
      }
    };

    const onBTPassed = async () => {
      await BleManager.enableBluetooth();

      const locGranted = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );
      if (locGranted === PermissionsAndroid.RESULTS.GRANTED) {
        await onLocationPassed();
      } else {
        const locReq = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );
        if (locReq === PermissionsAndroid.RESULTS.GRANTED) {
          await onLocationPassed();
        } else {
          onUserRefuse();
        }
      }
    }

    if (!shouldRegisterListeners) {
      onPermissionsFail();
      return;
    }

    if (btGranted === PermissionsAndroid.RESULTS.GRANTED) {
      await onPermissionsPassed();
    } else {
      const btReq = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN);
      if (btReq === PermissionsAndroid.RESULTS.GRANTED) await onBTPassed();
      else onUserRefuse();
    }
  }

  console.log('listener');
  const listener = bleManagerEmitter.addListener(
    "BleManagerDiscoverPeripheral",
    (p) => {
      console.log(p)
      lst = [...lst, p.id];
      setProfiles([...new Set(lst)]);
    }
  );
  setListener(listener);

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
