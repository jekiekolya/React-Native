// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// Additional Libraries
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyB-qg3MiAy6e4fbkJfMQq6S8x_dejW9hww",
  authDomain: "react-native-hw-c7c5a.firebaseapp.com",
  projectId: "react-native-hw-c7c5a",
  storageBucket: "react-native-hw-c7c5a.appspot.com",
  messagingSenderId: "854402692624",
  appId: "1:854402692624:web:e709d4e8cd2b98825e3c95",
  measurementId: "G-1QE2YX9VMS",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
