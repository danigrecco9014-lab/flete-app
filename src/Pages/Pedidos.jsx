import React, { useState, useEffect } from "react";
import NavMenu from "../Components/NavMenu";

import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  Timestamp,
} from "firebase/firestore";

import { db } from "../firebase/firebase";

import {
  User,
  MapPin,
  Tv,
  Store,
  DollarSign,
  Pencil,
  Trash2,
  Plus,
  Package,
} from "lucide-react";

const Pedidos = () => {
  const [showModal, setShowModal] =
    useState(false);

  const [pedidos, setPedidos] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [editId, setEditId] =
    useState(null);

    const [
  mostrarEliminar,
  setMostrarEliminar,
] = useState(false);

const [
  pedidoAEliminar,
  setPedidoAEliminar,
] = useState(null);

  const [formData, setFormData] =
    useState({
      cliente: "",
      direccion: "",
      electrodomestico: "",
      costo_envio: "",
      local: "Megatone",
      comision: "",
      escaleras: "",
      fecha: Timestamp.now(),
    });

  const pedidosRef = collection(
    db,
    "idPedido"
  );

  // =========================
  // TRAER PEDIDOS
  // =========================

  const fetchPedidos = async () => {
    setLoading(true);

    const snapshot = await getDocs(
      pedidosRef
    );

    const lista = snapshot.docs.map(
      (doc) => ({
        ...doc.data(),
        id: doc.id,
      })
    );

    setPedidos(lista);

    setLoading(false);
  };

  useEffect(() => {
    fetchPedidos();
  }, []);

  // =========================
  // HANDLE INPUTS
  // =========================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =========================
  // GUARDAR / EDITAR
  // =========================

  const handleSubmit = async (e) => {
    e.preventDefault();



    const data = {
  cliente: formData.cliente,
  direccion: formData.direccion,
  electrodomestico:
    formData.electrodomestico,

  local: formData.local || "Megatone",

  costo_envio: Number(
    formData.costo_envio
  ),

  comision: Number(
    formData.comision
  ),

  escaleras: Number(
    formData.escaleras
  ),

  fecha: Timestamp.now(),
};      

    // const data = {
    //   ...formData,

    //   costo_envio: Number(
    //     formData.costo_envio
    //   ),

    //   comision: Number(
    //     formData.comision
    //   ),

    //   escaleras: Number(
    //     formData.escaleras
    //   ),

    //   fecha: Timestamp.now(),
    // };

    if (editId) {
      await updateDoc(
        doc(db, "idPedido", editId),
        data
      );
    } else {
      await addDoc(pedidosRef, data);
    }

    cerrarModal();

    fetchPedidos();
  };

  // =========================
  // EDITAR
  // =========================

  const editarPedido = (id) => {
    const pedido = pedidos.find(
      (p) => p.id === id
    );

    setEditId(id);

    setFormData({
      ...pedido,
      fecha: pedido.fecha,
    });

    setShowModal(true);
  };

  // =========================
  // ELIMINAR
  // =========================
const eliminarPedido = (id) => {

  setPedidoAEliminar(id);

  setMostrarEliminar(true);
};

const confirmarEliminar = async () => {

  await deleteDoc(
    doc(
      db,
      "idPedido",
      pedidoAEliminar
    )
  );

  setMostrarEliminar(false);

  setPedidoAEliminar(null);

  fetchPedidos();
};

  // =========================
  // CERRAR MODAL
  // =========================

  const cerrarModal = () => {
    setShowModal(false);

    setEditId(null);

    setFormData({
      cliente: "",
      direccion: "",
      electrodomestico: "",
      costo_envio: "",
      local: "Megatone",
      comision: "",
      escaleras: "",
      fecha: Timestamp.now(),
    });
  };

  // =========================
  // FILTRAR HOY
  // =========================

  const hoy = new Date();

  const esHoy = (fechaRaw) => {
    const fecha = fechaRaw?.toDate
      ? fechaRaw.toDate()
      : new Date(fechaRaw);

    return (
      fecha.getDate() ===
        hoy.getDate() &&
      fecha.getMonth() ===
        hoy.getMonth() &&
      fecha.getFullYear() ===
        hoy.getFullYear()
    );
  };

  const pedidosHoy = pedidos.filter(
    (p) => p.fecha && esHoy(p.fecha)
  );

  return (
    <div className="min-h-screen bg-gray-100 pb-28">

      {/* HEADER */}
      <div className="bg-white px-5 py-5 shadow-sm">

        <h1 className="text-3xl font-bold text-gray-800">

          Pedidos del día

        </h1>

        <p className="text-gray-500 mt-1">

          Gestiona todos los pedidos fácilmente

        </p>
      </div>

      {/* LOADING */}
      {loading ? (

        <div className="flex justify-center items-center h-60">

          <div className="w-14 h-14 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>

        </div>

      ) : pedidosHoy.length === 0 ? (

        <div className="flex flex-col items-center justify-center mt-20">

          <div className="bg-emerald-100 p-5 rounded-full">

            <Package
              size={40}
              className="text-emerald-600"
            />

          </div>

          <p className="text-gray-500 mt-4 text-lg">

            No hay pedidos hoy

          </p>
        </div>

      ) : (

        <div className="p-4 space-y-4">

          {pedidosHoy.map((pedido) => (

            <div
              key={pedido.id}
              className="
                bg-white
                rounded-3xl
                shadow-sm
                p-4
                border
                border-gray-100
              "
            >

              {/* TOP */}
              <div className="flex items-start justify-between">

                <div className="flex items-center">

                  <div className="bg-emerald-100 p-3 rounded-2xl mr-3">

                    <User className="text-emerald-600" />

                  </div>

                  <div>

                    <h2 className="font-bold text-lg text-gray-800">

                      {pedido.cliente}

                    </h2>

                    <p className="text-sm text-gray-500">

                      {(pedido.fecha?.toDate
                        ? pedido.fecha.toDate()
                        : new Date(
                            pedido.fecha
                          )
                      ).toLocaleDateString()}

                    </p>
                  </div>
                </div>
              </div>

              {/* INFO */}
              <div className="mt-4 space-y-3">

                <div className="flex items-center text-gray-700">

                  <MapPin
                    size={18}
                    className="mr-2 text-gray-500"
                  />

                  {pedido.direccion}

                </div>

                <div className="flex items-center text-gray-700">

                  <Tv
                    size={18}
                    className="mr-2 text-gray-500"
                  />

                  {pedido.electrodomestico}

                </div>

                <div className="flex items-center text-gray-700">

                  <Store
                    size={18}
                    className="mr-2 text-gray-500"
                  />

                  {pedido.local}

                </div>
              </div>

              {/* PRECIOS */}
              <div className="grid grid-cols-3 gap-3 mt-5">

                <div className="bg-emerald-50 rounded-2xl p-3 text-center">

                  <p className="text-xs text-gray-500">

                    Envío

                  </p>

                  <p className="font-bold text-emerald-700">

                    $
                    {pedido.costo_envio}

                  </p>
                </div>

                <div className="bg-orange-50 rounded-2xl p-3 text-center">

                  <p className="text-xs text-gray-500">

                    Comisión

                  </p>

                  <p className="font-bold text-orange-600">

                    $
                    {pedido.comision}

                  </p>
                </div>

                <div className="bg-blue-50 rounded-2xl p-3 text-center">

                  <p className="text-xs text-gray-500">

                    Escaleras

                  </p>

                  <p className="font-bold text-blue-600">

                    $
                    {pedido.escaleras || 0}

                  </p>
                </div>
              </div>

              {/* BOTONES */}
              <div className="flex gap-3 mt-5">

                <button
                  onClick={() =>
                    editarPedido(
                      pedido.id
                    )
                  }
                  className="
                    flex-1
                    bg-blue-600
                    text-white
                    py-3
                    rounded-2xl
                    font-semibold
                    flex
                    items-center
                    justify-center
                    gap-2
                    active:scale-95
                  "
                >

                  <Pencil size={18} />

                  Editar

                </button>

                <button
                  onClick={() =>
                    eliminarPedido(
                      pedido.id
                    )
                  }
                  className="
                    flex-1
                    bg-red-500
                    text-white
                    py-3
                    rounded-2xl
                    font-semibold
                    flex
                    items-center
                    justify-center
                    gap-2
                    active:scale-95
                  "
                >

                  <Trash2 size={18} />

                  Eliminar

                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* BOTON AGREGAR */}
      <div className="fixed bottom-24 right-5 z-40">

        <button
          onClick={() =>
            setShowModal(true)
          }
          className="
            bg-emerald-600
            text-white
            w-16
            h-16
            rounded-full
            shadow-xl
            flex
            items-center
            justify-center
            active:scale-95
          "
        >

          <Plus size={32} />

        </button>
      </div>

      {/* MODAL */}
      {showModal && (

<div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-end sm:items-center justify-center z-[999] px-0 sm:px-4">
      <div
  className="
    bg-white
    w-full
    max-w-md
    rounded-t-3xl
    sm:rounded-3xl
    p-6
    shadow-2xl
    animate-slideUp

    max-h-[90vh]
    overflow-y-auto
    overscroll-contain

    pb-32
    sm:pb-6
  "
>

            <h2 className="text-2xl font-bold mb-6">

              {editId
                ? "Editar Pedido"
                : "Nuevo Pedido"}

            </h2>

           <form
  onSubmit={handleSubmit}
  className="space-y-4 pb-10"
>

              {/* CLIENTE */}
              <div>

                <label className="text-sm font-medium text-gray-600">

                  Cliente

                </label>

                <input
                  type="text"
                  name="cliente"
                  value={formData.cliente}
                  onChange={handleChange}
                  className="
                    w-full
                    mt-1
                    bg-gray-100
                    border-2
                    border-transparent
                    focus:border-emerald-500
                    outline-none
                    rounded-2xl
                    px-4
                    py-3
                  "
                  required
                />
              </div>

              {/* DIRECCION */}
              <div>

                <label className="text-sm font-medium text-gray-600">

                  Dirección

                </label>

                <input
                  type="text"
                  name="direccion"
                  value={formData.direccion}
                  onChange={handleChange}
                  className="
                    w-full
                    mt-1
                    bg-gray-100
                    border-2
                    border-transparent
                    focus:border-emerald-500
                    outline-none
                    rounded-2xl
                    px-4
                    py-3
                  "
                  required
                />
              </div>

              {/* ELECTRODOMESTICO */}
              <div>

                <label className="text-sm font-medium text-gray-600">

                  Electrodoméstico

                </label>

                <input
                  type="text"
                  name="electrodomestico"
                  value={
                    formData.electrodomestico
                  }
                  onChange={handleChange}
                  className="
                    w-full
                    mt-1
                    bg-gray-100
                    border-2
                    border-transparent
                    focus:border-emerald-500
                    outline-none
                    rounded-2xl
                    px-4
                    py-3
                  "
                  required
                />
              </div>

              {/* LOCAL */}
              <div>

                <label className="text-sm font-medium text-gray-600">

                  Local

                </label>

              <select
                  name="local"
                  required
                  value={formData.local}
                  onChange={handleChange}
                  className="
                    w-full
                    mt-1
                    bg-gray-100
                    border-2
                    border-transparent
                    focus:border-emerald-500
                    outline-none
                    rounded-2xl
                    px-4
                    py-3
                  "
                >

                  <option value="Megatone">
                    Megatone
                  </option>

                  <option value="Cetrogar">
                    Cetrogar
                  </option>

                  <option value="Flete">
                    Flete
                  </option>

                  <option value="Otro">
                    Otro
                  </option>

                </select>
              </div>

              {/* GRID */}
              <div className="grid grid-cols-2 gap-3">

                <div>

                  <label className="text-sm font-medium text-gray-600">

                    Costo envío

                  </label>

                  <input
                    type="number"
                    name="costo_envio"
                    value={
                      formData.costo_envio
                    }
                    onChange={handleChange}
                    className="
                      w-full
                      mt-1
                      bg-gray-100
                      border-2
                      border-transparent
                      focus:border-emerald-500
                      outline-none
                      rounded-2xl
                      px-4
                      py-3
                    "
                    required
                  />
                </div>

                <div>

                  <label className="text-sm font-medium text-gray-600">

                    Comisión

                  </label>

                  <input
                    type="number"
                    name="comision"
                    value={
                      formData.comision
                    }
                    onChange={handleChange}
                    className="
                      w-full
                      mt-1
                      bg-gray-100
                      border-2
                      border-transparent
                      focus:border-emerald-500
                      outline-none
                      rounded-2xl
                      px-4
                      py-3
                    "
                    required
                  />
                </div>
              </div>

              {/* ESCALERAS */}
              <div>

                <label className="text-sm font-medium text-gray-600">

                  Valor escaleras

                </label>

                <input
                  type="number"
                  name="escaleras"
                  value={formData.escaleras}
                  onChange={handleChange}
                  className="
                    w-full
                    mt-1
                    bg-gray-100
                    border-2
                    border-transparent
                    focus:border-emerald-500
                    outline-none
                    rounded-2xl
                    px-4
                    py-3
                  "
                />
              </div>

              {/* BOTONES */}
              <div className="flex gap-3 pt-4">

                <button
                  type="button"
                  onClick={cerrarModal}
                  className="
                    flex-1
                    bg-gray-200
                    py-3
                    rounded-2xl
                    font-semibold
                  "
                >

                  Cancelar

                </button>

                <button
                  type="submit"
                  className="
                    flex-1
                    bg-emerald-600
                    text-white
                    py-3
                    rounded-2xl
                    font-semibold
                  "
                >

                  {editId
                    ? "Actualizar"
                    : "Guardar"}

                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL ELIMINAR */}
{mostrarEliminar && (

  <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[999] px-5">

    <div className="bg-white w-full max-w-sm rounded-3xl p-6 shadow-2xl">

      <div className="flex justify-center mb-4">

        <div className="bg-red-100 p-4 rounded-full">

          <Trash2
            size={40}
            className="text-red-500"
          />

        </div>
      </div>

      <h2 className="text-2xl font-bold text-center">

        Eliminar pedido

      </h2>

      <p className="text-gray-500 text-center mt-2">

        ¿Seguro que deseas eliminar este pedido?

      </p>

      <div className="flex gap-3 mt-6">

        <button
          onClick={() =>
            setMostrarEliminar(false)
          }
          className="
            flex-1
            bg-gray-200
            py-3
            rounded-2xl
            font-semibold
          "
        >

          Cancelar

        </button>

        <button
          onClick={confirmarEliminar}
          className="
            flex-1
            bg-red-500
            text-white
            py-3
            rounded-2xl
            font-semibold
          "
        >

          Eliminar

        </button>
      </div>
    </div>
  </div>
)}

      <NavMenu />
    </div>
  );
};

export default Pedidos;   