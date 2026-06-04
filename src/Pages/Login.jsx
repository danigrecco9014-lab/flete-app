
import { useNavigate } from "react-router-dom";
import { Truck, ShieldCheck, User, Lock } from "lucide-react";
import { useState, useEffect, useMemo } from "react";

export default function Login() {
  const navigate = useNavigate();

  // =========================
  // STATES
  // =========================

  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // =========================
  // USUARIOS (optimizado)
  // =========================

  const usuarios = useMemo(
    () => [
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
    ],
    []
  );

  // =========================
  // AUTO LOGIN
  // =========================

  useEffect(() => {
    const usuarioActivo = localStorage.getItem("usuarioActivo");

    if (usuarioActivo) {
      navigate("/home", { replace: true });
    }
  }, [navigate]);

  // =========================
  // LOGIN
  // =========================

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    const usuarioEncontrado = usuarios.find(
      (u) =>
        u.usuario.toLowerCase() === usuario.toLowerCase() &&
        u.password === password
    );

    if (!usuarioEncontrado) {
      setError("Usuario o contraseña incorrectos");
      return;
    }

    localStorage.setItem(
      "usuarioActivo",
      JSON.stringify({
        nombre: usuarioEncontrado.nombre,
        usuario: usuarioEncontrado.usuario,
        login: true,
      })
    );

    navigate("/home", { replace: true });
  };

  // =========================
  // JSX
  // =========================

  return (
    <div className="min-h-screen flex items-center justify-center px-5 bg-emerald-500">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-[35px] p-8 shadow-2xl">

        {/* LOGO */}
        <div className="flex justify-center">
          <div className="w-24 h-24 rounded-[30px] bg-white/15 flex items-center justify-center shadow-lg">
            <Truck size={42} className="text-white" />
          </div>
        </div>

        {/* TITULO */}
        <div className="text-center mt-6">
          <h1 className="text-4xl font-bold text-white">Flete App</h1>
          <p className="text-blue-100 mt-3 leading-relaxed">
            Gestión de pedidos, gastos, fondo y control diario
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleLogin} className="mt-8 space-y-4">

          {/* USUARIO */}
          <div className="bg-white/10 border border-white/20 rounded-2xl px-4 py-3 flex items-center gap-3">
            <User size={20} className="text-white" />
            <input
              type="text"
              placeholder="Usuario"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              className="bg-transparent outline-none text-white placeholder:text-blue-100 w-full"
            />
          </div>

          {/* PASSWORD */}
          <div className="bg-white/10 border border-white/20 rounded-2xl px-4 py-3 flex items-center gap-3">
            <Lock size={20} className="text-white" />
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-transparent outline-none text-white placeholder:text-blue-100 w-full"
            />
          </div>

          {/* ERROR */}
          {error && (
            <div className="bg-red-500/20 border border-red-400/30 text-red-100 text-sm rounded-2xl px-4 py-3">
              {error}
            </div>
          )}

          {/* BUTTON */}
          <button
            type="submit"
            className="w-full bg-white text-gray-800 py-4 rounded-2xl font-semibold shadow-lg transition-all hover:scale-[1.02] active:scale-95"
          >
            Iniciar sesión
          </button>
        </form>

        {/* FOOTER */}
        <div className="mt-6 flex items-center justify-center gap-2 text-blue-100 text-sm">
          <ShieldCheck size={18} />
          Sesión permanente activa
        </div>

      </div>
    </div>
  );
}