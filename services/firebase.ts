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
let initError;

try {
  // Safe initialization: Check if app exists before creating to prevent duplicate initialization errors
  if (getApps().length === 0) {
    app = initializeApp(firebaseConfig);
  } else {
    app = getApp();
  }

  // Initialize services
  auth = getAuth(app);
  googleProvider = new GoogleAuthProvider();
  
  // Analytics might fail in some environments (e.g. ad blockers), so we catch it independently
  if (typeof window !== 'undefined') {
    try {
      analytics = getAnalytics(app);
    } catch (err) {
      console.warn("Firebase Analytics failed to initialize:", err);
    }
  }
} catch (error: any) {
  initError = error;
  // Catching specific "auth not registered" errors to prevent full app crash
  console.error("Critical Firebase Initialization Error:", error);
  if (error.message && error.message.includes("auth has not been registered")) {
      console.error("VERSION MISMATCH DETECTED: This error usually means 'firebase/app' and 'firebase/auth' are loading different versions. Check index.html importmap.");
  }
}

export { auth, googleProvider, analytics, initError };