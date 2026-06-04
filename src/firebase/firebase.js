// // firebase.js
// import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore"; // <- Importar Firestore

// // Configuración de Firebase
// const firebaseConfig = {
//   apiKey: "AIzaSyCAzTTrOMmo06BAz0YAAhwQNeOmzOtiqS4",
//   authDomain: "flete-app-112ff.firebaseapp.com",
//   projectId: "flete-app-112ff",
//   storageBucket: "flete-app-112ff.firebasestorage.app",
//   messagingSenderId: "950913762831",
//   appId: "1:950913762831:web:33b4d90abdc0278ea9457a"
// };

// // Inicializar Firebase y Firestore
// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app); // <- Inicializar instancia de Firestore

// export { db }; // <- Exportar `db`



// firebase.js
// import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";
// import { getAuth, GoogleAuthProvider } from "firebase/auth"; // <- Importar Auth y GoogleAuthProvider

// const firebaseConfig = {
//   apiKey: "AIzaSyCAzTTrOMmo06BAz0YAAhwQNeOmzOtiqS4",
//   authDomain: "flete-app-112ff.firebaseapp.com",
//   projectId: "flete-app-112ff",
//   storageBucket: "flete-app-112ff.firebasestorage.app",
//   messagingSenderId: "950913762831",
//   appId: "1:950913762831:web:33b4d90abdc0278ea9457a"
// };

// // Inicializar Firebase
// const app = initializeApp(firebaseConfig);

// // Inicializar servicios
// const db = getFirestore(app);
// const auth = getAuth(app);
// const provider = new GoogleAuthProvider();
// console.log("Firebase iniciado");
// export { db, auth, provider };


// import { initializeApp } from "firebase/app";

// import {
//   initializeFirestore,
// } from "firebase/firestore";

// import {
//   getAuth,
//   GoogleAuthProvider,
// } from "firebase/auth";

// const firebaseConfig = {
//   apiKey:
//     "AIzaSyCAzTTrOMmo06BAz0YAAhwQNeOmzOtiqS4",

//   authDomain:
//     "flete-app-112ff.firebaseapp.com",

//   projectId: "flete-app-112ff",

//   storageBucket:
//     "flete-app-112ff.firebasestorage.app",

//   messagingSenderId:
//     "950913762831",

//   appId:
//     "1:950913762831:web:33b4d90abdc0278ea9457a",
// };

// // APP
// const app =
//   initializeApp(firebaseConfig);

// // FIRESTORE IOS FIX
// const db =
//   initializeFirestore(app, {
//     experimentalForceLongPolling: true,
//   });

// // AUTH
// const auth = getAuth(app);

// const provider =
//   new GoogleAuthProvider();

// console.log("Firebase iniciado");

// export {
//   db,
//   auth,
//   provider,
// };


// import { initializeApp } from "firebase/app";

// import {
//   initializeFirestore,
//   CACHE_SIZE_UNLIMITED,
// } from "firebase/firestore";

// import {
//   getAuth,
//   GoogleAuthProvider,
// } from "firebase/auth";

// const firebaseConfig = {
//   apiKey: "AIzaSyCAzTTrOMmo06BAz0YAAhwQNeOmzOtiqS4",
//   authDomain: "flete-app-112ff.firebaseapp.com",
//   projectId: "flete-app-112ff",
//   storageBucket:
//     "flete-app-112ff.firebasestorage.app",
//   messagingSenderId: "950913762831",
//   appId:
//     "1:950913762831:web:33b4d90abdc0278ea9457a",
// };

// // INIT
// const app = initializeApp(firebaseConfig);

// // FIRESTORE IOS FIX
// const db = initializeFirestore(app, {
//   cacheSizeBytes: CACHE_SIZE_UNLIMITED,
//   experimentalForceLongPolling: true,
// });

// // AUTH
// const auth = getAuth(app);

// const provider =
//   new GoogleAuthProvider();

// console.log("Firebase iniciado");

// export {
//   db,
//   auth,
//   provider,
// };

import { initializeApp } from "firebase/app";

import {
  initializeFirestore,
  CACHE_SIZE_UNLIMITED,
} from "firebase/firestore";

import {
  getAuth,
  GoogleAuthProvider,
} from "firebase/auth";

import {
  getMessaging,
} from "firebase/messaging";

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
const db = initializeFirestore(app, {
  cacheSizeBytes:
    CACHE_SIZE_UNLIMITED,

  experimentalForceLongPolling:
    true,
});

// AUTH
const auth = getAuth(app);

const provider =
  new GoogleAuthProvider();

// 👇 MESSAGING
const messaging =
  getMessaging(app);

console.log("Firebase iniciado");

// EXPORTS
export {
  db,
  auth,
  provider,
  messaging,
};