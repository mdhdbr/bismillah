
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

// This function safely initializes and returns the Firebase app instance.
// It ensures the app is initialized only once.
const getFirebaseApp = () => {
  if (getApps().length > 0) {
    return getApp();
  }
  
  // Check if all required config values are present
  const isConfigValid = firebaseConfig.apiKey && firebaseConfig.projectId;
  if (!isConfigValid) {
    // console.error("Firebase config is invalid. Check your environment variables.");
    return null;
  }
  
  return initializeApp(firebaseConfig);
};

// Export getters that lazily initialize services, ensuring the app is ready.
const getDb = (): Firestore | null => {
  const app = getFirebaseApp();
  return app ? getFirestore(app) : null;
};

const getFirebaseAuth = (): Auth | null => {
  const app = getFirebaseApp();
  return app ? getAuth(app) : null;
};

const getFirebaseStorage = (): FirebaseStorage | null => {
  const app = getFirebaseApp();
  return app ? getStorage(app) : null;
};

// Export the app getter as well, though direct use should be rare.
export { getFirebaseApp as app, getDb, getFirebaseAuth, getFirebaseStorage };
