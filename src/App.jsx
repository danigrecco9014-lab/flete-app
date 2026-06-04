 
// import './App.css';
// import React from 'react';
// import Sidebar from './Components/Sidebar';
// import Header from './Components/Header';
// import Calendario from './Pages/Calendario';
// import Cancelados from './Pages/Cancelados';
// import Estadisticas from './Pages/Estadisticas';
// import FinalizarDia from './Pages/FinalizarDia';
// import Gastos from './Pages/Gastos';
// import Pedidos from './Pages/Pedidos';
// // import Recordatorios from './Pages/Recordatorios'



// // function App() {
  

// //   return (
// //     <>
// //       <h1 className='text-red-500 font-bold'>Hola </h1>
// //     </>
// //   )
// // }

// // export default App

// import { useState } from "react";

// function App() {
//   const [seccion, setSeccion] = useState("Pedidos");

//   function renderContenido() {
//     switch (seccion) {
//       case "Pedidos":
//         return <Pedidos />;
//       case "Estadisticas":
//         return <Estadisticas />;
//       case "Gastos":
//         return <Gastos />;
//       case "Calendario":
//         return <Calendario />;
//       case "Cancelados":
//         return <Cancelados />;
//       // case "Recordatorios":
//       //   return <Recordatorios />;
//       case "FinalizarDia":
//         return <FinalizarDia />;
//       default:
//         return <Pedidos />;
//     }
//   }

//   return (
//     <div className="flex h-screen">
    
//       <Sidebar setSeccion={setSeccion} />
//       <div className="flex flex-col flex-1">
      
//         <Header />
//         <main className="p-4 overflow-auto">{renderContenido()}</main>
//       </div>
//     </div>
//   );
// }

// export default App;


// import React from "react";
// import ReactDOM from "react-dom/client";
// import { BrowserRouter } from "react-router-dom";
// import AppRoutes from "./routes/AppRoutes";
// import "./index.css";

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <AppRoutes />
//     </BrowserRouter>
//   </React.StrictMode>
// );

// import AppRoutes from "./routes/AppRoutes";

// function App() {
//   return <AppRoutes />;
// }

// export default App;


// import AppRoutes from "./routes/AppRoutes";

// function App() {
//   return <AppRoutes />;
// }

// export default App;


// function App() {
//   const [seccion, setSeccion] = useState("Pedidos");

//   function renderContenido() {
//     switch (seccion) {
//       case "Pedidos":
//         return <Pedidos />;
//       case "Estadisticas":
//         return <Estadisticas />;
//       case "Gastos":
//         return <Gastos />;
//       case "Calendario":
//         return <Calendario />;
//       case "Cancelados":
//         return <Cancelados />;
//       case "FinalizarDia":
//         return <FinalizarDia />;
//       default:
//         return <Pedidos />;
//     }
//   }

//   return (
//     <div className="flex h-screen">
//       <Sidebar setSeccion={setSeccion} />
//       <div className="flex flex-col flex-1">
//         <Header />
//         <main className="p-4 overflow-auto">
//           {renderContenido()}
//         </main>
//       </div>
//     </div>
//   );
// }


// import { useState } from "react";

// import Sidebar from "./Components/Sidebar";
// import Header from "./Components/Header";

// import Calendario from "./Pages/Calendario";
 
// import Estadisticas from "./Pages/Estadisticas";
// import FinalizarDia from "./Pages/FinalizarDia";
// import Gastos from "./Pages/Gastos";
// import Pedidos from "./Pages/Pedidos";

// function App() {
//   const [seccion, setSeccion] = useState("Pedidos");

//   const renderContenido = () => {
//     switch (seccion) {
//       case "Pedidos": return <Pedidos />;
//       case "Estadisticas": return <Estadisticas />;
//       case "Gastos": return <Gastos />;
//       case "Calendario": return <Calendario />;
    
//       case "FinalizarDia": return <FinalizarDia />;
//       default: return <Pedidos />;
//     }
//   };

//   return (
//     <div className="flex h-screen">
//       <Sidebar setSeccion={setSeccion} />

//       <div className="flex flex-col flex-1">
//         <Header />

//         <main className="p-4 overflow-auto">
//           {renderContenido()}
//         </main>
//       </div>
//     </div>
//   );
// }

// export default App;

 

// import { useState } from "react";

// import Sidebar from "./Components/Sidebar";
// import Header from "./Components/Header";

// import Pedidos from "./Pages/Pedidos";
// import Gastos from "./Pages/Gastos";
// import Calendario from "./Pages/Calendario";
// import Estadisticas from "./Pages/Estadisticas";
// import FinalizarDia from "./Pages/FinalizarDia";

// function App() {
//   const [seccion, setSeccion] = useState("Pedidos");

//   const renderContenido = () => {
//     switch (seccion) {
//       case "Pedidos":
//         return <Pedidos />;
//       case "Gastos":
//         return <Gastos />;
//       case "Calendario":
//         return <Calendario />;
//       case "Estadisticas":
//         return <Estadisticas />;
//       case "FinalizarDia":
//         return <FinalizarDia />;
//       default:
//         return <Pedidos />;
//     }
//   };

//   return (
//     <div className="flex h-screen">
//       <Sidebar setSeccion={setSeccion} />

//       <div className="flex flex-col flex-1">
//         <Header />

//         <main className="p-4 overflow-auto">
//           {renderContenido()}
//         </main>
//       </div>
//     </div>
//   );
// }

// export default App;

// import { Routes, Route, Navigate } from "react-router-dom";

// import Login from "../Pages/Login";
// import Home from "../Pages/Home";
// import Pedidos from "../Pages/Pedidos";
// import Gastos from "../Pages/Gastos";
// import Calendario from "../Pages/Calendario";
// import Resumen from "../Pages/Resumen";
// import Perfil from "../Pages/Perfil";

// import ProtectedRoute from "./ProtectedRoute";

// function AppRoutes() {
//   const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));

//   return (
//     <Routes>
//       <Route
//         path="/"
//         element={
//           usuarioActivo ? <Navigate to="/home" /> : <Login />
//         }
//       />

//       <Route
//         path="/home"
//         element={
//           <ProtectedRoute>
//             <Home />
//           </ProtectedRoute>
//         }
//       />

//       <Route
//         path="/pedidos"
//         element={
//           <ProtectedRoute>
//             <Pedidos />
//           </ProtectedRoute>
//         }
//       />

//       <Route
//         path="/gastos"
//         element={
//           <ProtectedRoute>
//             <Gastos />
//           </ProtectedRoute>
//         }
//       />

//       <Route
//         path="/calendario"
//         element={
//           <ProtectedRoute>
//             <Calendario />
//           </ProtectedRoute>
//         }
//       />

//       <Route
//         path="/resumen"
//         element={
//           <ProtectedRoute>
//             <Resumen />
//           </ProtectedRoute>
//         }
//       />

//       <Route path="*" element={<Navigate to="/" />} />
//     </Routes>
//   );
// }

// export default AppRoutes;
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

      {/* SOLO SI HAY SESIÓN */}
      {usuarioActivo && <NavMenu />}
    </div>
  );
}

export default App;