import { Routes, Route, Navigate } from "react-router-dom";

import Login from "../Pages/Login";
import Home from "../Pages/Home";
import Pedidos from "../Pages/Pedidos";
import Gastos from "../Pages/Gastos";
import Calendario from "../Pages/Calendario";
import Resumen from "../Pages/Resumen";
import Facturas from "../Pages/Facturas";
import Perfil from "../Pages/Perfil";
import Recordatorios from "../Pages/Recordatorios"; 
import Fondo from "../Pages/Fondo";

import ProtectedRoute from "./protectedRoute";

function AppRoutes() {
  const user = JSON.parse(localStorage.getItem("usuarioActivo"));

  return (
    <Routes>
      <Route
        path="/"
        element={
          user ? <Navigate to="/home" /> : <Login />
        }
      />

      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />

      <Route
        path="/pedidos"
        element={
          <ProtectedRoute>
            <Pedidos />
          </ProtectedRoute>
        }
      />

      <Route
        path="/gastos"
        element={
          <ProtectedRoute>
            <Gastos />
          </ProtectedRoute>
        }
      />

 <Route
        path="/fondo"
        element={
          <ProtectedRoute>
            <Fondo />
          </ProtectedRoute>
        }
      />
      <Route
        path="/calendario"
        element={
          <ProtectedRoute>
            <Calendario />
          </ProtectedRoute>
        }
      />

      <Route
        path="/resumen"
        element={
          <ProtectedRoute>
            <Resumen />
          </ProtectedRoute>
        }
      />    
      <Route
        path="/facturas"
        element={
          <ProtectedRoute>
            <Facturas />
          </ProtectedRoute>
        }
      />

      <Route
        path="/perfil"
        element={
          <ProtectedRoute>
            <Perfil />
          </ProtectedRoute>
        }
      />

        <Route
        path="/recordatorios"
        element={
          <ProtectedRoute>
            <Recordatorios />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default AppRoutes;