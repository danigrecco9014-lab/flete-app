 
import { initializeApp } from "firebase/app";

import {
  initializeFirestore,
  CACHE_SIZE_UNLIMITED,
} from "firebase/firestore";

import {
  getAuth,
  GoogleAuthProvider,
} from "firebase/auth";

// import {
//   getMessaging,
// } from "firebase/messaging";

// CONFIG
const firebaseConfig = {
  apiKey: "AIzaSyCAzTTrOMmo06BAz0YAAhwQNeOmzOtiqS4",

  authDomain:
    "flete-app-112ff.firebaseapp.com",

  projectId: "flete-app-112ff",

  storageBucket:
    "flete-app-112ff.firebasestorage.app",

  messagingSenderId:
    "950913762831",

  appId:
    "1:950913762831:web:33b4d90abdc0278ea9457a",
};

// INIT
const app =
  initializeApp(firebaseConfig);

// FIRESTORE IOS FIX
// const db = initializeFirestore(app, {
//   cacheSizeBytes:
//     CACHE_SIZE_UNLIMITED,

//   // experimentalForceLongPolling:
//   //   true,
// });

const db = initializeFirestore(app, {
  cacheSizeBytes: 40 * 1024 * 1024, // 40MB
});

// AUTH
const auth = getAuth(app);

const provider =
  new GoogleAuthProvider();

// 👇 MESSAGING
// const messaging =
//   getMessaging(app);

// console.log("Firebase iniciado");

// EXPORTS
export {
  db,
  auth,
  provider,
  // messaging,
};