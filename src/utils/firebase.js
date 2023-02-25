// Import the functions you need from the SDKs you need
import { getApps, getApp, initializeApp } from "firebase/app";
import {
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth/react-native";
import { getFirestore, initializeFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCAqvQ2SnVdfxlabQ0Mz6fyr4mudHknwDA",
  authDomain: "icbal-7b9c6.firebaseapp.com",
  projectId: "icbal-7b9c6",
  storageBucket: "icbal-7b9c6.appspot.com",
  messagingSenderId: "286976378947",
  appId: "1:286976378947:web:1070a5f3a3f47c777becf6",
  measurementId: "G-78YEC17MST",
};

// Initialise Firebase App
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Initialise Firebase Auth
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// Initialise Cloud Firestore
export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
  useFetchStreams: false,
});

// Initialise Cloud Storage
export const storage = getStorage(app);
