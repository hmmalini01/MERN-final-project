import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBJkCwtZyCrU42zGT49SMRpnYR8FhPnjYI",
  authDomain: "cartoon-bfe23.firebaseapp.com",
  projectId: "cartoon-bfe23",
  storageBucket: "cartoon-bfe23.firebasestorage.app",
  messagingSenderId: "211751977292",
  appId: "1:211751977292:web:b6dbeb9a5e53c747e24fe9",
  measurementId: "G-F3NBNXKDY3"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);