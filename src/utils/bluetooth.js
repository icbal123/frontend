import { BleManager } from "react-native-ble-manager";

const startBleManager = async (options = undefined) => {
  await BleManager.start(options);
  return true;
};

const getNearbyDevices = (manager, callback = ((scannedDevice) => {})) => {
  manager.startDeviceScan(
    null,
    { allowDuplicates: true },
    (error, scannedDevice) => {
      if (error) {
        console.log(error);
      } else {
        callback(scannedDevice);
      }
    }
  );
  return () => {
    manager.stopDeviceScan();
  };
};

export { createBleManager, getNearbyDevices };
