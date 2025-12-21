import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAjaktKEkGJImkCweSdvQL5BwUU3EyiNGo",
  authDomain: "smart-productivity-caf6d.firebaseapp.com",
  projectId: "smart-productivity-caf6d",
  storageBucket: "smart-productivity-caf6d.firebasestorage.app",
  messagingSenderId: "436536954842",
  appId: "1:436536954842:web:2e739493bfe2618d95fae3",
  measurementId: "G-V9QXCQLXTD"
};

let app;
let auth;
let googleProvider;
let analytics;

try {
  // Safe initialization: Check if app exists before creating
  if (getApps().length === 0) {
    app = initializeApp(firebaseConfig);
  } else {
    app = getApp();
  }

  auth = getAuth(app);
  googleProvider = new GoogleAuthProvider();
  
  // Analytics might fail in some environments (e.g. ad blockers), so we catch it independently
  try {
    if (typeof window !== 'undefined') {
      analytics = getAnalytics(app);
    }
  } catch (err) {
    console.warn("Firebase Analytics failed to initialize:", err);
  }
} catch (error) {
  console.error("Firebase initialization failed:", error);
}

export { auth, googleProvider, analytics };