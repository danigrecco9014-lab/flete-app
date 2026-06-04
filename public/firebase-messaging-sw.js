importScripts(
  "https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js"
);

importScripts(
  "https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js"
);

firebase.initializeApp({
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
});

const messaging =
  firebase.messaging();

messaging.onBackgroundMessage(
  (payload) => {

    self.registration.showNotification(
      payload.notification.title,
      {
        body:
          payload.notification.body,

        icon:
          "/pwa-192x192.png",
      }
    );
  }
);