import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Lock, LogOut, ShieldCheck } from "lucide-react";

import Nav from "../Components/NavMenu";

function Perfil() {
  // =========================
  // USUARIOS
  // =========================

  const usuarios = [
    {
      usuario: "daniel",
      password: "flete1234",
      nombre: "Daniel",
    },
    {
      usuario: "oscar",
      password: "flete1234",
      nombre: "Oscar",
    },
  ];

  // =========================
  // STATES
  // =========================

  const [usuario, setUsuario] = useState("");

  const [password, setPassword] = useState("");
const navigate = useNavigate();
  const [usuarioActivo, setUsuarioActivo] = useState(null);

  const [error, setError] = useState("");

  // =========================
  // MANTENER SESION
  // =========================

  useEffect(() => {
    const sesionGuardada = localStorage.getItem("usuarioActivo");

    if (sesionGuardada) {
      setUsuarioActivo(JSON.parse(sesionGuardada));
    }
  }, []);

  // =========================
  // LOGIN
  // =========================

  const handleLogin = (e) => {
    e.preventDefault();

    const encontrado = usuarios.find(
      (u) => u.usuario === usuario && u.password === password,
    );

    if (encontrado) {
      setUsuarioActivo(encontrado);

      localStorage.setItem("usuarioActivo", JSON.stringify(encontrado));

      setError("");

      setUsuario("");

      setPassword("");
    } else {
      setError("Usuario o contraseña incorrectos");
    }
  };

  // =========================
  // LOGOUT
  // =========================

const cerrarSesion = () => {
  localStorage.removeItem("usuarioActivo");
  window.location.href = "/login";
};
  // =========================
  // JSX
  // =========================

  return (
    <div className="min-h-screen bg-gray-100 pb-28">
      {/* HEADER */}
      <div
        className="
          bg-linear-to-r
          from-indigo-600
          to-green-600
          px-5
          pt-10
          pb-12
          rounded-b-[35px]
          shadow-lg
        "
      >
        <div className="flex items-center gap-3">
          <div
            className="
              bg-white/20
              p-3
              rounded-2xl
              backdrop-blur-sm
            "
          >
            <User className="text-white" size={28} />
          </div>

          <div>
            <h1
              className="
                text-3xl
                font-bold
                text-white
              "
            >
              Perfil 
            </h1>

            <p
              className="
                text-blue-100
                text-sm
              "
            >
              Gestión de usuario y sesión
            </p>
          </div>
        </div>
      </div>

      {/* CONTENIDO */}
      <div className="px-4 -mt-6">
        <div
          className="
            bg-white
            rounded-[30px]
            shadow-lg
            p-6
          "
        >
          {usuarioActivo ? (
            <>
              {/* SESION ACTIVA */}
              <div className="text-center">
                <div
                  className="
                    w-24
                    h-24
                    rounded-full
                    bg-linear-to-r
                    from-blue-500
                    to-indigo-500
                    flex
                    items-center
                    justify-center
                    mx-auto
                    shadow-lg
                  "
                >
                  <User size={42} className="text-white" />
                </div>

                <h2
                  className="
                    text-2xl
                    font-bold
                    mt-5
                    text-gray-800
                  "
                >
                  {usuarioActivo.nombre}
                </h2>

                <div
                  className="
                    flex
                    items-center
                    justify-center
                    gap-2
                    mt-2
                    text-green-600
                    font-medium
                  "
                >
                  <ShieldCheck size={18} />
                  Sesión activa
                </div>
              </div>

              {/* INFO */}
              <div
                className="
                  mt-8
                  bg-gray-50
                  rounded-3xl
                  p-5
                  space-y-4
                "
              >
                <div>
                  <p
                    className="
                      text-xs
                      text-gray-400
                    "
                  >
                    Usuario
                  </p>

                  <p
                    className="
                      font-semibold
                      text-gray-800
                    "
                  >
                    {usuarioActivo.usuario}
                  </p>
                </div>

                <div>
                  <p
                    className="
                      text-xs
                      text-gray-400
                    "
                  >
                    Estado
                  </p>

                  <p
                    className="
                      font-semibold
                      text-green-600
                    "
                  >
                    Conectado
                  </p>
                </div>
              </div>

              {/* BOTON */}
              <button
                onClick={cerrarSesion}
                className="
                  mt-6
                  w-full
                  bg-red-500
                  hover:bg-red-600
                  text-white
                  py-4
                  rounded-2xl
                  font-semibold
                  flex
                  items-center
                  justify-center
                  gap-2
                  transition-all
                "
              >
                <LogOut size={20} />
                Cerrar sesión
              </button>
            </>
          ) : (
            <>
              {/* LOGIN */}
              <div className="mb-6">
                <h2
                  className="
                    text-2xl
                    font-bold
                    text-gray-800
                  "
                >
                  Iniciar sesión
                </h2>

                <p className="text-gray-500 mt-1">
                  Accede con tu usuario y contraseña
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                {/* USUARIO */}
                <div>
                  <label
                    className="
                      text-sm
                      text-gray-600
                      mb-2
                      block
                    "
                  >
                    Usuario
                  </label>

                  <div
                    className="
                      flex
                      items-center
                      gap-3
                      bg-gray-100
                      rounded-2xl
                      px-4
                      py-3
                    "
                  >
                    <User size={20} className="text-gray-400" />

                    <input
                      type="text"
                      value={usuario}
                      onChange={(e) => setUsuario(e.target.value)}
                      placeholder="Ingrese usuario"
                      className="
                        bg-transparent
                        outline-none
                        w-full
                      "
                      required
                    />
                  </div>
                </div>

                {/* PASSWORD */}
                <div>
                  <label
                    className="
                      text-sm
                      text-gray-600
                      mb-2
                      block
                    "
                  >
                    Contraseña
                  </label>

                  <div
                    className="
                      flex
                      items-center
                      gap-3
                      bg-gray-100
                      rounded-2xl
                      px-4
                      py-3
                    "
                  >
                    <Lock size={20} className="text-gray-400" />

                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Ingrese contraseña"
                      className="
                        bg-transparent
                        outline-none
                        w-full
                      "
                      required
                    />
                  </div>
                </div>

                {/* ERROR */}
                {error && (
                  <div
                    className="
                      bg-red-50
                      border
                      border-red-100
                      text-red-600
                      text-sm
                      rounded-2xl
                      px-4
                      py-3
                    "
                  >
                    {error}
                  </div>
                )}

                {/* BOTON */}
                <button
                  type="submit"
                  className="
                    w-full
                    bg-linear-to-r
                    from-blue-600
                    to-indigo-600
                    text-white
                    py-4
                    rounded-2xl
                    font-semibold
                    shadow-lg
                    hover:scale-[1.01]
                    transition-all
                  "
                >
                  Ingresar
                </button>
              </form>

              {/* DEMO */}
              {/* <div
                className="
                  mt-6
                  bg-blue-50
                  border
                  border-blue-100
                  rounded-2xl
                  p-4
                "
              >

                <p
                  className="
                    text-sm
                    text-blue-700
                    font-medium
                    mb-2
                  "
                >

                  Usuarios disponibles

                </p>

                <div className="space-y-1 text-sm">

                  <p>
                    <strong>Daniel</strong> →
                    usuario: daniel
                  </p>

                  <p>
                    <strong>Oscar</strong> →
                    usuario: oscar
                  </p>

                  <p>
                    Contraseña: 1234
                  </p>
                </div>
              </div> */}
            </>
          )}
        </div>
      </div>
 
    </div>
  );
}

export default Perfil;
