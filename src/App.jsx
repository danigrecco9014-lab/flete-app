 

// import { useEffect } from "react";

// import Sidebar from "./Components/Sidebar";
// import NavMenu from "./Components/NavMenu";
// import AppRoutes from "./routes/AppRoutes";

// import { getToken, onMessage } from "firebase/messaging";
// import { messaging } from "./firebase/firebase";

// function App() {
//   const usuarioActivo = localStorage.getItem("usuarioActivo");

//   // =========================
//   // PUSH NOTIFICATIONS
//   // =========================

//   useEffect(() => {
//     if (!usuarioActivo) return;

//     // =========================
//     // 1. REGISTRAR SERVICE WORKER (CLAVE)
//     // =========================
//     if ("serviceWorker" in navigator) {
//       navigator.serviceWorker
//         .register("/firebase-messaging-sw.js")
//         .then((registration) => {
//           console.log("SW registrado:", registration);
//         })
//         .catch((err) => {
//           console.log("Error SW:", err);
//         });
//     }

//     // =========================
//     // 2. PEDIR PERMISO + TOKEN
//     // =========================
//     const pedirPermiso = async () => {
//       try {
//         const permiso = await Notification.requestPermission();
//         console.log("PERMISO:", permiso);

//         if (permiso === "granted") {
//           const token = await getToken(messaging, {
//             vapidKey:
//               "BJOGGYT1HkfRteB981sRehHwX2ZFe834DaBN8HvDhdtOg1Fd0HL3Fb9dSy-4t60gAHG--qbnm2joqKJltnOJPw0",
//           });

//           console.log("TOKEN FCM:", token);
//         }
//       } catch (error) {
//         console.log("ERROR FCM:", error);
//       }
//     };

//     pedirPermiso();

//     // =========================
//     // 3. MENSAJES EN PRIMER PLANO
//     // =========================
//     const unsubscribe = onMessage(messaging, (payload) => {
//       console.log("MENSAJE:", payload);

//       if (Notification.permission === "granted") {
//         new Notification(payload.notification?.title || "Nuevo mensaje", {
//           body: payload.notification?.body || "",
//           icon: "/pwa-192x192.png",
//         });
//       }
//     });

//     return () => {
//       if (typeof unsubscribe === "function") {
//         unsubscribe();
//       }
//     };
//   }, [usuarioActivo]);

//   return (
//     <div className="flex min-h-screen">
//       <Sidebar />

//       <div className="flex flex-col flex-1">
//         <AppRoutes />
//       </div>

//       {usuarioActivo && <NavMenu />}
//     </div>
//   );
// }

// export default App;

import Sidebar from "./Components/Sidebar";
import NavMenu from "./Components/NavMenu";
import AppRoutes from "./routes/AppRoutes";

function App() {
  const usuarioActivo = localStorage.getItem("usuarioActivo");

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="flex flex-col flex-1">
        <AppRoutes />
      </div>

      {usuarioActivo && <NavMenu />}
    </div>
  );
}

export default App;