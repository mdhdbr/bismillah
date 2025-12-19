
// Heart - Core Firebase connection
import { initializeApp, getApps, getApp, FirebaseOptions } from "firebase/app";
import { getFirestore, Firestore } from "firebase/firestore";
import { getAuth, Auth } from "firebase/auth";
import { getStorage, FirebaseStorage } from "firebase/storage";

const firebaseConfig: FirebaseOptions = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Check if all required config values are present, especially for server-side rendering
const isConfigValid = firebaseConfig.apiKey && firebaseConfig.projectId;

const app =
  isConfigValid && !getApps().length
    ? initializeApp(firebaseConfig)
    : isConfigValid
    ? getApp()
    : null;

// Use getters to initialize services on-demand, preventing unnecessary errors.
let db: Firestore | null = null;
let auth: Auth | null = null;
let storage: FirebaseStorage | null = null;

const getDb = () => {
    if (!db && app) {
        db = getFirestore(app);
    }
    return db;
}


const getFirebaseAuth = () => {
    if (!auth && app) {
        auth = getAuth(app);
    }
    return auth;
}

const getFirebaseStorage = () => {
    if (!storage && app) {
        storage = getStorage(app);
    }
    return storage;
}

export { app, getDb, getFirebaseAuth, getFirebaseStorage };
