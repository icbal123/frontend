import BleManager from "react-native-ble-manager";
import { NativeEventEmitter, NativeModules } from "react-native";

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

const handleDiscoverPeripheral = (peripheral) => {
  console.log("Got BLE peripheral", peripheral);
};

const startBleManager = (options = { showAlert: false }) => {
  console.log(BleManager);
  BleManager.start(options);
  return true;
};

const setListener = () => {
  const listener = bleManagerEmitter.addListener(
    "BleManagerDiscoverPeripheral",
    handleDiscoverPeripheral
  );
  return listener;
};

const startBleScan = () => {
  BleManager.scan([], 5, true);
};

const stopBleScan = () => {
  BleManager.stopScan();
};

export { startBleManager, startBleScan, stopBleScan, setListener };
