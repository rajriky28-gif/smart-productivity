import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAr3RFsqhZ5tLfCpgjSnXWjCbuDNV65QF8",
  authDomain: "stride-823b3.firebaseapp.com",
  databaseURL: "https://stride-823b3-default-rtdb.firebaseio.com",
  projectId: "stride-823b3",
  storageBucket: "stride-823b3.firebasestorage.app",
  messagingSenderId: "1022410265808",
  appId: "1:1022410265808:web:e0c1ad6ef56784bc48bad5",
  measurementId: "G-M13JDR6137"
};

let app;
let auth;
let googleProvider;
let analytics;

try {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  googleProvider = new GoogleAuthProvider();
  
  // Analytics might fail in some environments (e.g. ad blockers), so we catch it
  try {
    analytics = getAnalytics(app);
  } catch (err) {
    console.warn("Firebase Analytics failed to initialize:", err);
  }
} catch (error) {
  console.error("Firebase initialization failed:", error);
}

export { auth, googleProvider, analytics };
