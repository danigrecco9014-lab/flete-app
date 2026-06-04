import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import truck from "../assets/transporte.png";

import Nav from "../Components/NavMenu";
import Hora from "../Components/Hora";

import {
  MapPin,
  User,
  PackageCheck,
  DollarSign,
  Bell,
  Clock,
  Check,
  Tv,
  Plus,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";

import { db } from "../firebase/firebase";
import {
  collection,
  getDocs,
  updateDoc,
  doc,
  addDoc,
  Timestamp,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";

function Home() {
  // =========================
  // STATES
  // =========================

  const [usuarioActivo, setUsuarioActivo] = useState(null);

  const [pedidosHoy, setPedidosHoy] = useState([]);

  const [loading, setLoading] = useState(true);

  const [guardando, setGuardando] = useState(false);
  const [hayRecordatorios, setHayRecordatorios] = useState(false);

  // MODAL RESUMEN
  const [mostrarModal, setMostrarModal] = useState(false);

  // MODAL FORM
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  // MODAL EXITO
  const [mostrarExito, setMostrarExito] = useState(false);

  const [mostrarPendientes, setMostrarPendientes] = useState(false);

  // MODAL YA GUARDADO
  const [mostrarYaGuardado, setMostrarYaGuardado] = useState(false);

  // BADGE
  const [datosGuardados, setDatosGuardados] = useState(false);

  const [nuevoPedido, setNuevoPedido] = useState({
    cliente: "",
    direccion: "",
    electrodomestico: "",
    costo_envio: "",
    comision: "",
    escaleras: "",
  });

  // =========================
  // FECHA
  // =========================

  const fechaHoy = new Date();

  const hoy = fechaHoy.toISOString().slice(0, 10);

  const fecha = fechaHoy.toLocaleDateString("es-AR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  // =========================
  // USUARIO ACTIVO
  // =========================

  useEffect(() => {
    const usuario = localStorage.getItem("usuarioActivo");

    if (usuario) {
      setUsuarioActivo(JSON.parse(usuario));
    }
  }, []);

  // =========================
  // TRAER PEDIDOS
  // =========================

  useEffect(() => {
    verificarCierreDelDia();
  }, [hoy]);

  useEffect(() => {
    const q = collection(db, "idPedido");

    const unsub = onSnapshot(
      q,
      (snapshot) => {
        console.log("Firestore conectado");

        const pedidos = snapshot.docs.map((doc) => {
          const data = doc.data();

          let fechaPedido = "";

          if (data.fecha && typeof data.fecha.toDate === "function") {
            fechaPedido = data.fecha.toDate().toISOString().slice(0, 10);
          } else if (typeof data.fecha === "string") {
            fechaPedido = data.fecha.slice(0, 10);
          }

          return {
            id: doc.id,
            ...data,
            fecha: fechaPedido,
            realizado: data.realizado || false,
          };
        });

        const filtrados = pedidos.filter((p) => p.fecha === hoy);

        console.log("Pedidos:", filtrados);

        setPedidosHoy(filtrados);

        setLoading(false);
      },
      (error) => {
        console.error("ERROR FIRESTORE:", error);

        setLoading(false);
      },
    );

    return () => unsub();
  }, [hoy]);

  // =========================
  // RECORDATORIOS PENDIENTES
  // =========================

  useEffect(() => {
    const q = query(
      collection(db, "recordatorios"),
      where("completado", "==", false),
    );

    const unsub = onSnapshot(q, (snapshot) => {
      setHayRecordatorios(!snapshot.empty);
    });

    return () => unsub();
  }, []);

  // =========================
  // CHECK PEDIDO
  // =========================

  const toggleRealizado = async (id, currentValue) => {
    try {
      const pedidoRef = doc(db, "idPedido", id);

      await updateDoc(pedidoRef, {
        realizado: !currentValue,
      });
    } catch (error) {
      console.error("Error actualizando pedido:", error);
    }
  };

  // =========================
  // FORM
  // =========================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setNuevoPedido((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =========================
  // GUARDAR PEDIDO
  // =========================

  const guardarPedido = async (e) => {
    e.preventDefault();

    if (guardando) return;

    setGuardando(true);

    try {
      const nuevo = {
        ...nuevoPedido,

        costo_envio: Number(nuevoPedido.costo_envio),

        comision: Number(nuevoPedido.comision),

        escaleras: Number(nuevoPedido.escaleras),

        fecha: Timestamp.fromDate(fechaHoy),

        realizado: false,
      };

      await addDoc(collection(db, "idPedido"), nuevo);

      setMostrarFormulario(false);

      setNuevoPedido({
        cliente: "",
        direccion: "",
        electrodomestico: "",
        costo_envio: "",
        comision: "",
        escaleras: "",
      });
    } catch (error) {
      console.error("Error al guardar pedido:", error);
    } finally {
      setGuardando(false);
    }
  };

  // =========================
  // VERIFICAR CIERRE
  // =========================

  const verificarCierreDelDia = async () => {
    try {
      const inicioDia = new Date();

      inicioDia.setHours(0, 0, 0, 0);

      const finDia = new Date();

      finDia.setHours(23, 59, 59, 999);

      const q = query(
        collection(db, "fondo"),

        where("fecha", ">=", Timestamp.fromDate(inicioDia)),

        where("fecha", "<=", Timestamp.fromDate(finDia)),
      );

      const snapshot = await getDocs(q);

      // SI EXISTE
      if (!snapshot.empty) {
        setDatosGuardados(true);
      }
    } catch (error) {
      console.error("Error verificando cierre:", error);
    }
  };

  console.log("USE EFFECT HOME");

  // =========================
  // TOTALES
  // =========================

  const totalPedidos = pedidosHoy.length;

  const realizados = pedidosHoy.filter((p) => p.realizado);

  const totalRealizados = realizados.length;

  const pendientes = totalPedidos - totalRealizados;

  const totalGenerado = realizados.reduce(
    (acc, curr) => acc + (Number(curr.costo_envio) || 0),
    0,
  );

  const totalComisiones = realizados.reduce(
    (acc, curr) => acc + (Number(curr.comision) || 0),
    0,
  );

  const totalEscaleras = realizados.reduce(
    (acc, curr) => acc + (Number(curr.escaleras) || 0),
    0,
  );

  const gananciaNeta = totalGenerado - totalComisiones;

  // const unTercio =
  //   (gananciaNeta / 4) +
  //   (totalEscaleras / 3);

  const fondo = gananciaNeta / 4;

  const unTercio = (gananciaNeta - fondo) / 3 + totalEscaleras / 3;
  // =========================
  // FINALIZAR DIA
  // =========================

  const finalizarDia = async () => {
    // VALIDAR PEDIDOS PENDIENTES
    if (pendientes > 0) {
      setMostrarPendientes(true);

      return;
    }

    // EVITAR DUPLICADOS
    if (datosGuardados) {
      setMostrarModal(false);

      setMostrarYaGuardado(true);

      return;
    }

    try {
      await addDoc(collection(db, "fondo"), {
        fecha: Timestamp.fromDate(fechaHoy),

        totalGenerado,
        totalComisiones,
        totalEscaleras,

        aportadoAlFondo: unTercio,

        guardado: true,
      });

      setDatosGuardados(true);

      setMostrarModal(false);

      setMostrarExito(true);
    } catch (error) {
      console.error("Error al guardar:", error);
    }
  };
  // =========================
  // JSX
  // =========================
  console.log("HOME RENDER");
  return (
    <div className="min-h-screen flex flex-col bg-gray-200  pb-32">
      {/* HEADER */}
      <div className="flex justify-between bg-gray-50 p-4">
        <div>
          <div>
            <h1 className="text-2xl font-bold">FLETAPP 📦</h1>
          </div>
        </div>

        <Link to="/recordatorios" className="p-2 relative">
          <Bell />

          {hayRecordatorios && (
            <span
              className="
        absolute
        top-1
        right-1
        w-3
        h-3
        bg-red-500
        rounded-full
        border-2
        border-white
        animate-pulse
      "
            />
          )}
        </Link>
      </div>

      {/* HERO */}
      <div className="flex items-center justify-between">
        <div className="ml-4">
          <Hora />

          <p className="text-sm text-gray-500 font-bold pb-3">{fecha}</p>
        </div>

        <img src={truck} alt="Truck" className="w-60" />
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 gap-4 rounded-2xl m-4 bg-emerald-600 p-3">
        {/* TOTAL */}
        <div className="p-4 flex">
          <div className="p-2 mx-4 bg-emerald-500 rounded-lg h-fit">
            <DollarSign className="text-white" />
          </div>

          <div>
            <p className="text-white text-lg">Total generado</p>

            <p className="font-semibold text-white text-2xl">
              {totalGenerado.toLocaleString("es-AR", {
                style: "currency",
                currency: "ARS",
              })}
            </p>
          </div>
        </div>

        {/* CARDS */}
        <div className="flex justify-around">
          {/* REALIZADOS */}
          <div className="bg-white py-6 px-2 rounded-xl m-1 flex items-center">
            <div className="p-4 rounded-full bg-emerald-100 m-2">
              <PackageCheck className="text-emerald-700" />
            </div>

            <div>
              <p className="text-3xl font-bold text-center text-green-700">
                {totalRealizados}
              </p>

              <p className="text-gray-500 text-sm text-center">
                Pedidos realizados
              </p>
            </div>
          </div>

          {/* PENDIENTES */}
          <div className="bg-white py-6 px-2 rounded-xl m-1 flex items-center">
            <div className="p-4 rounded-full bg-orange-100 m-2">
              <Clock className="text-orange-400" />
            </div>

            <div>
              <p className="text-3xl font-bold text-center text-orange-400">
                {pendientes}
              </p>

              <p className="text-gray-500 text-sm text-center">
                Pedidos pendientes
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* PEDIDOS */}
      <div className="bg-gray-50 m-4 rounded-xl shadow p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-lg">Pedidos del día</h3>

          {datosGuardados && (
            <span
              className="
                text-xs
                bg-green-100
                text-green-700
                px-3
                py-1
                rounded-full
                font-medium
              "
            >
              Datos guardados
            </span>
          )}
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-32">
            <div className="w-12 h-12 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : pedidosHoy.length === 0 ? (
          <p className="text-center text-gray-500 py-3">Sin pedidos para hoy</p>
        ) : (
          <ul className="space-y-2">
            {pedidosHoy.map((pedido) => (
              <li
                key={pedido.id}
                className="
                  bg-white
                  border-2
                  border-gray-200
                  rounded-xl
                  p-3
                  flex
                  justify-between
                "
              >
                {/* INFO */}
                <div className="flex">
                  <div className="m-1 bg-green-200 p-3 rounded-full mr-4 h-fit">
                    <User className="text-green-600" size={30} />
                  </div>

                  <div>
                    <h2 className="font-semibold text-lg">{pedido.cliente}</h2>

                    <p className="text-sm flex items-center">
                      <MapPin className="mr-1" size={16} />

                      {pedido.direccion}
                    </p>

                    <p className="text-sm flex items-center">
                      <Tv className="mr-1" size={16} />

                      {pedido.electrodomestico}
                    </p>

                    <p className="text-sm flex items-center">
                      <DollarSign className="mr-1" size={16} />

                      {Number(pedido.costo_envio).toLocaleString("es-AR", {
                        style: "currency",
                        currency: "ARS",
                      })}
                    </p>

                    <p className="text-sm flex items-center">
                      <DollarSign className="mr-1" size={16} />

                      {Number(pedido.escaleras).toLocaleString("es-AR", {
                        style: "currency",
                        currency: "ARS",
                      })}
                    </p>
                  </div>
                </div>

                {/* CHECK */}
                <button
                  onClick={() => toggleRealizado(pedido.id, pedido.realizado)}
                  className={`
                    w-8
                    h-8
                    rounded-full
                    flex
                    items-center
                    justify-center
                    transition-all
                    ${pedido.realizado ? "bg-green-500" : "bg-gray-300"}
                  `}
                >
                  <Check className="text-white w-5 h-5" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* BOTON AGREGAR */}
      <div className="text-center mb-4">
        <button
          onClick={() => setMostrarFormulario(true)}
          className="
            bg-emerald-600
            text-white
            py-3
            px-4
            w-80
            font-semibold
            rounded-xl
            hover:bg-emerald-700
            transition-all
            inline-flex
            items-center
            justify-center
            gap-2
          "
        >
          <Plus size={20} />
          Agregar Pedido
        </button>
      </div>

      {/* BOTON FINALIZAR */}
      <div className="text-center mb-10">
        <button
          onClick={() => setMostrarModal(true)}
          className="
            bg-black
            text-white
            py-3
            px-4
            w-80
            font-semibold
            rounded-xl
          "
        >
          Finalizar Día
        </button>
      </div>

      {/* ========================= */}
      {/* MODAL NUEVO PEDIDO */}
      {/* ========================= */}

      {mostrarFormulario && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white w-[90%] max-w-md rounded-3xl p-6 shadow-xl">
            <h2 className="text-2xl font-bold mb-5">Nuevo Pedido</h2>

            <form onSubmit={guardarPedido} className="space-y-4">
              <input
                type="text"
                name="cliente"
                placeholder="Cliente"
                value={nuevoPedido.cliente}
                onChange={handleChange}
                className="w-full border rounded-2xl px-4 py-3"
                required
              />

              <input
                type="text"
                name="direccion"
                placeholder="Dirección"
                value={nuevoPedido.direccion}
                onChange={handleChange}
                className="w-full border rounded-2xl px-4 py-3"
                required
              />

              <input
                type="text"
                name="electrodomestico"
                placeholder="Electrodoméstico"
                value={nuevoPedido.electrodomestico}
                onChange={handleChange}
                className="w-full border rounded-2xl px-4 py-3"
                required
              />

              <input
                type="number"
                name="costo_envio"
                placeholder="Costo envío"
                value={nuevoPedido.costo_envio}
                onChange={handleChange}
                className="w-full border rounded-2xl px-4 py-3"
                required
              />

              <input
                type="number"
                name="comision"
                placeholder="Comisión"
                value={nuevoPedido.comision}
                onChange={handleChange}
                className="w-full border rounded-2xl px-4 py-3"
                required
              />

              <input
                type="number"
                name="escaleras"
                placeholder="Valor escaleras"
                value={nuevoPedido.escaleras}
                onChange={handleChange}
                className="w-full border rounded-2xl px-4 py-3"
              />

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setMostrarFormulario(false)}
                  className="bg-gray-200 px-4 py-2 rounded-xl"
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  className="bg-emerald-600 text-white px-4 py-2 rounded-xl"
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL RESUMEN */}
      {mostrarModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 px-4">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden">
            <div className="bg-emerald-600 p-6 text-white">
              <h3 className="text-2xl font-bold">Resumen del Día</h3>

              <p className="text-emerald-100 mt-1">
                Revisa los datos antes de guardar
              </p>
            </div>

            <div className="p-6 space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-500">Pedidos realizados</span>

                <span className="font-bold text-lg">{totalRealizados}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">Total generado</span>

                <span className="font-bold text-emerald-600">
                  {totalGenerado.toLocaleString("es-AR", {
                    style: "currency",
                    currency: "ARS",
                  })}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">Comisiones</span>

                <span className="font-bold text-orange-500">
                  {totalComisiones.toLocaleString("es-AR", {
                    style: "currency",
                    currency: "ARS",
                  })}
                </span>
              </div>

              <div className="border-t pt-4 flex justify-between">
                <span className="font-semibold">Ganancia neta</span>

                <span className="font-bold text-xl">
                  {gananciaNeta.toLocaleString("es-AR", {
                    style: "currency",
                    currency: "ARS",
                  })}
                </span>
              </div>

              {/* ESCALERAS */}
              <div className="flex justify-between">
                <span className="text-gray-500">Total escaleras</span>

                <span className="font-bold text-blue-600">
                  {totalEscaleras.toLocaleString("es-AR", {
                    style: "currency",
                    currency: "ARS",
                  })}
                </span>
              </div>

              {/* FONDO */}
              <div className="flex justify-between">
                <span className="text-gray-500">Aporte al fondo</span>

                <span className="font-bold text-purple-600">
                  {(gananciaNeta / 4).toLocaleString("es-AR", {
                    style: "currency",
                    currency: "ARS",
                  })}
                </span>
              </div>

              {/* MONTO PERSONA */}
              <div className="bg-emerald-50 rounded-2xl p-4 flex justify-between items-center">
                <div className="bg-emerald-100 p-3 rounded-2xl">
                  <DollarSign className="text-emerald-700" />
                </div>

                <div>
                  <p className="text-sm text-gray-500">Monto por persona</p>

                  <p className="font-bold text-emerald-700 text-lg">
                    {unTercio.toLocaleString("es-AR", {
                      style: "currency",
                      currency: "ARS",
                    })}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-3 p-6 pt-0">
              <button
                onClick={() => setMostrarModal(false)}
                className="
                  flex-1
                  py-3
                  rounded-2xl
                  bg-gray-100
                  font-semibold
                "
              >
                Cancelar
              </button>

              <button
                onClick={finalizarDia}
                className="
                  flex-1
                  py-3
                  rounded-2xl
                  bg-emerald-600
                  text-white
                  font-semibold
                "
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL EXITO */}
      {mostrarExito && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white rounded-3xl p-8 w-[90%] max-w-sm text-center shadow-2xl">
            <div className="bg-green-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 size={60} className="text-green-600" />
            </div>

            <h2 className="text-2xl font-bold mt-6">Datos guardados</h2>

            <p className="text-gray-500 mt-2">
              El resumen del día fue guardado correctamente.
            </p>

            <button
              onClick={() => setMostrarExito(false)}
              className="
                mt-6
                w-full
                bg-green-600
                text-white
                py-3
                rounded-2xl
                font-semibold
              "
            >
              Continuar
            </button>
          </div>
        </div>
      )}

      {/* MODAL YA GUARDADO */}
      {mostrarYaGuardado && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white rounded-3xl p-8 w-[90%] max-w-sm text-center shadow-2xl">
            <div className="bg-orange-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto">
              <AlertTriangle size={60} className="text-orange-500" />
            </div>

            <h2 className="text-2xl font-bold mt-6">Datos ya guardados</h2>

            <p className="text-gray-500 mt-2">
              El resumen del día ya fue almacenado anteriormente.
            </p>

            <button
              onClick={() => setMostrarYaGuardado(false)}
              className="
                mt-6
                w-full
                bg-orange-500
                text-white
                py-3
                rounded-2xl
                font-semibold
              "
            >
              Entendido
            </button>
          </div>
        </div>
      )}

      {/* MODAL PEDIDOS PENDIENTES */}
      {mostrarPendientes && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white rounded-3xl p-8 w-[90%] max-w-sm text-center shadow-2xl">
            <div className="bg-red-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto">
              <AlertTriangle size={60} className="text-red-500" />
            </div>

            <h2 className="text-2xl font-bold mt-6">Pedidos pendientes</h2>

            <p className="text-gray-500 mt-2">
              Hay {pendientes} pedido(s) sin completar.
            </p>

            <button
              onClick={() => setMostrarPendientes(false)}
              className="
          mt-6
          w-full
          bg-red-500
          text-white
          py-3
          rounded-2xl
          font-semibold
        "
            >
              Entendido
            </button>
          </div>
        </div>
      )}

      <Nav />
    </div>
  );
}

export default Home;
