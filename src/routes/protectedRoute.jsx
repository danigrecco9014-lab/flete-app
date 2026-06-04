// import { Navigate } from "react-router-dom";

// const ProtectedRoute = ({ children }) => {
//   const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));

//   if (!usuarioActivo) {
//     return <Navigate to="/" />;
//   }

//   return children;
// };

// export default ProtectedRoute;      

// import { Navigate } from "react-router-dom";

// const ProtectedRoute = ({ children }) => {
//   const user = JSON.parse(localStorage.getItem("usuarioActivo"));

//   if (!user) {
//     return <Navigate to="/" />;
//   }

//   return children;
// };

// export default ProtectedRoute;


import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("usuarioActivo"));

  if (!user) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;