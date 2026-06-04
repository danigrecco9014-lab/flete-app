// import Sidebar from "./Components/Sidebar";
// import NavMenu from "./Components/NavMenu";
// import AppRoutes from "./routes/AppRoutes";

// import { useEffect } from "react";

// import { getToken } from "firebase/messaging";

// import { messaging } from "./firebase/firebase";

// function App() {
//   const usuarioActivo = localStorage.getItem("usuarioActivo");
// useEffect(() => {

//   const pedirPermiso =
//     async () => {

//       try {

//         const permiso =
//           await Notification.requestPermission();

//         console.log("PERMISO:", permiso);

//         if (
//           permiso === "granted"
//         ) {

//           const token =
//             await getToken(
//               messaging,
//               {
//                 vapidKey:
//                   "BJOGGYT1HkfRteB981sRehHwX2ZFe834DaBN8HvDhdtOg1Fd0HL3Fb9dSy-4t60gAHG--qbnm2joqKJltnOJPw0",
//               }
//             );

//           console.log(
//             "TOKEN FCM:",
//             token
//           );
//         }

//       } catch (error) {

//         console.log(
//           "ERROR FCM:",
//           error
//         );
//       }
//     };

//   pedirPermiso();

// }, []);
//   return (
//     <div className="flex min-h-screen">
//       <Sidebar />

//       <div className="flex flex-col flex-1">
//         <AppRoutes />
//       </div>

//       {/* SOLO SI HAY SESIÓN */}
//       {usuarioActivo && <NavMenu />}
//     </div>
//   );
// }

// export default App;

// import { useEffect } from "react";

// import Sidebar from "./Components/Sidebar";
// import NavMenu from "./Components/NavMenu";
// import AppRoutes from "./routes/AppRoutes";

// import { getToken } from "firebase/messaging";
// import { onMessage } from "firebase/messaging";
// import { messaging } from "./firebase/firebase";

// function App() {
//   const usuarioActivo = localStorage.getItem("usuarioActivo");

//   // =========================
//   // PUSH NOTIFICATIONS
//   // =========================

//   useEffect(() => {
//     onMessage(messaging, (payload) => {
//   console.log("MENSAJE:", payload);

//   if (Notification.permission === "granted") {
//     new Notification(payload.notification.title, {
//       body: payload.notification.body,
//       icon: "/pwa-192x192.png",
//     });
//   }
// });
    
//     if (!usuarioActivo) return;

//     const pedirPermiso = async () => {
//       try {
//         const permiso = await Notification.requestPermission();

//         console.log("PERMISO:", permiso);

//         if (permiso === "granted") {
//           console.log("MESSAGING:", messaging);
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
//   }, [usuarioActivo]);

//   return (
//     <div className="flex min-h-screen">
//       <Sidebar />

//       <div className="flex flex-col flex-1">
//         <AppRoutes />
//       </div>

//       {/* SOLO SI HAY SESIÓN */}
//       {usuarioActivo && <NavMenu />}
//     </div>
//   );
// }

// export default App;


import { useEffect } from "react";

import Sidebar from "./Components/Sidebar";
import NavMenu from "./Components/NavMenu";
import AppRoutes from "./routes/AppRoutes";

import { getToken } from "firebase/messaging";
import { onMessage } from "firebase/messaging";
import { messaging } from "./firebase/firebase";

function App() {
  const usuarioActivo = localStorage.getItem("usuarioActivo");

  // =========================
  // PUSH NOTIFICATIONS
  // =========================

  useEffect(() => {
    if (!usuarioActivo) return;

    // Pedir permiso SOLO una vez
    const pedirPermiso = async () => {
      try {
        const permiso = await Notification.requestPermission();
        console.log("PERMISO:", permiso);

        if (permiso === "granted") {
          const token = await getToken(messaging, {
            vapidKey:
              "BJOGGYT1HkfRteB981sRehHwX2ZFe834DaBN8HvDhdtOg1Fd0HL3Fb9dSy-4t60gAHG--qbnm2joqKJltnOJPw0",
          });

          console.log("TOKEN FCM:", token);
        }
      } catch (error) {
        console.log("ERROR FCM:", error);
      }
    };

    pedirPermiso();

    // Foreground messages (PC + móvil en app abierta)
    const unsubscribe = onMessage(messaging, (payload) => {
      console.log("MENSAJE:", payload);

      if (Notification.permission === "granted") {
        new Notification(payload.notification?.title || "Nuevo mensaje", {
          body: payload.notification?.body || "",
          icon: "/pwa-192x192.png",
        });
      }
    });

    // cleanup correcto
    return () => {
      if (typeof unsubscribe === "function") {
        unsubscribe();
      }
    };
  }, [usuarioActivo]);

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