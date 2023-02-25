import BleManager from "react-native-ble-manager";
import BLEAdvertiser from "react-native-ble-advertiser";
import {
  userBroadcasting,
  getCurrentUserInfo,
  getAllUserInfo,
  getUserInfoByUUID,
} from "./accounts";
import {
  NativeEventEmitter,
  NativeModules,
  PermissionsAndroid,
  Platform,
} from "react-native";
import RNAndroidLocationEnabler from "react-native-android-location-enabler";

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

// const eventEmitter = new NativeEventEmitter(NativeModules.BLEAdvertiser);

const startBroadcast = async () => {
  const current_user = (await getCurrentUserInfo())[0];
  await userBroadcasting(true);
  BLEAdvertiser.setCompanyId(0x4c);
  BLEAdvertiser.broadcast(current_user.uuid, [], {
    advertiseMode: BLEAdvertiser.ADVERTISE_MODE_LOW_LATENCY,
  })
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
  setProfiles,
  onPermissionsFail,
  options = { showAlert: false }
) => {
  let lst = [];
  let shouldRegisterListeners = false;

  let userInfo = (await getAllUserInfo()).map((item) => {
    return item.uuid;
  });

  if (Platform.OS === "android" && Platform.Version >= 23) {
    const btGranted = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN
    );
    const onUserRefuse = () => {
      console.log("User refuse");
    };

    const onLocationPassed = async () => {
      try {
        const result =
          await RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({});
        if (result.includes("enabled")) {
          console.log("starting");
          await BleManager.start(options);
          shouldRegisterListeners = true;
        } else onUserRefuse();
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
    };

    if (btGranted === PermissionsAndroid.RESULTS.GRANTED) {
      await onPermissionsPassed();
    } else {
      const btReq = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN
      );
      if (btReq === PermissionsAndroid.RESULTS.GRANTED) await onBTPassed();
      else onUserRefuse();
    }
  }
  if (!shouldRegisterListeners) {
    onPermissionsFail();
    return;
  }
  bleManagerEmitter.addListener(
    "BleManagerDiscoverPeripheral",
    (deviceData) => {
      // console.log(userInfo);
      if (
        deviceData?.advertising?.serviceUUIDs &&
        deviceData.advertising.serviceUUIDs.length > 0 &&
        deviceData.advertising.serviceUUIDs[0].length > 10
      ) {
        getUserInfoByUUID(deviceData.advertising?.serviceUUIDs[0])
          .then((x) => {
            if (x[0]?.email) {
              lst.push(x[0]);
              setProfiles([...new Set(lst)]);
            }
          })
          .catch((e) => {
            console.log(e);
          });
      }
    }
  );
  BleManager.scan([], 5, true);
  const scanInterval = setInterval(async () => {
    userInfo = (await getAllUserInfo()).map((item) => {
      return item.uuid;
    });
    console.log("Scanning...");
    BleManager.scan([], 5, true);
  }, 10000);

  return scanInterval;
};

const stopScan = async (interval) => {
  await BLEAdvertiser.stopScan();
  clearInterval(interval);
};

export { startScan, stopScan, startBroadcast, stopBroadcast };
