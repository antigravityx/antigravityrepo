// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB-R13v-FAZTH0pkrOPdXs0ZyVaGcpUvcE",
  authDomain: "webappred.firebaseapp.com",
  projectId: "webappred",
  storageBucket: "webappred.firebasestorage.app",
  messagingSenderId: "613503023704",
  appId: "1:613503023704:web:4946f1c916773a69d3e82d",
  measurementId: "G-PTR4W06Y36"
};

// Initialize Firebase (singleton pattern to avoid multiple instances)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Initialize Firebase services
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Analytics (only in browser)
let analytics;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

export { app, auth, db, storage, analytics };
