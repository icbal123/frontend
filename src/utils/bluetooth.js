import { BleManager } from "react-native-ble-plx";

const createBleManager = () => {
  const manager = new BleManager();
  manager.setLogLevel(LogLevel.Verbose);
  return manager;
};

const getNearbyDevices = ({ manager, callback }) => {
  manager.startDeviceScan(
    null,
    null,
    // { allowDuplicates: true },
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
