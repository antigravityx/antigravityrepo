// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, initializeFirestore, persistentLocalCache, persistentMultipleTabManager } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB-R13v-FAZTH0pkrOPdXs0ZyVaGcpUvcE",
  authDomain: "webappred.firebaseapp.com",
  projectId: "webappred",
  storageBucket: "webappred.firebasestorage.app",
  messagingSenderId: "613503023704",
  appId: "1:613503023704:web:4946f1c916773a69d3e82d",
  measurementId: "G-PTR4W06Y36"
};

// Initialize Firebase (singleton pattern)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Initialize Firebase services
const auth = getAuth(app);

// Initialize Firestore with offline persistence
let db: ReturnType<typeof getFirestore>;
try {
  db = initializeFirestore(app, {
    localCache: persistentLocalCache({
      tabManager: persistentMultipleTabManager()
    })
  });
} catch (error) {
  // If already initialized, get the existing instance
  db = getFirestore(app);
}

export { app, auth, db };
