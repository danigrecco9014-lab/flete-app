 

import { useState, useEffect } from "react";

import {
  collection,
  addDoc,
  query,
  where,
  onSnapshot,
  deleteDoc,
  updateDoc,
  doc,
  Timestamp,
} from "firebase/firestore";

import {
  Receipt,
  Plus,
  Pencil,
  Trash2,
  TrendingDown,
  Wallet,
  CalendarDays,
} from "lucide-react";

import { db } from "../firebase/firebase";

import NavMenu from "../Components/NavMenu";

export default function Gastos() {

  // =========================
  // STATES
  // =========================

  const [gastos, setGastos] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [showModal, setShowModal] =
    useState(false);

  const [editId, setEditId] =
    useState(null);

  const [formData, setFormData] =
    useState({
      concepto: "",
      monto: "",
      categoria: "Otros",
    });

  const gastosRef =
    collection(db, "gastos");

  // =========================
  // TRAER GASTOS
  // =========================

  useEffect(() => {

    const now = new Date();

    const primerDia = new Date(
      now.getFullYear(),
      now.getMonth(),
      1
    );

    const ultimoDia = new Date(
      now.getFullYear(),
      now.getMonth() + 1,
      0,
      23,
      59,
      59
    );

    const q = query(
      gastosRef,

      where(
        "fecha",
        ">=",
        Timestamp.fromDate(primerDia)
      ),

      where(
        "fecha",
        "<=",
        Timestamp.fromDate(ultimoDia)
      )
    );

    const unsub = onSnapshot(
      q,
      (snapshot) => {

        const datos =
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

        setGastos(datos);

        setLoading(false);
      }
    );

    return () => unsub();

  }, []);

  // =========================
  // FORMATO MONEDA
  // =========================

  const formatPrecio = (valor) =>
    Number(valor || 0).toLocaleString(
      "es-AR",
      {
        style: "currency",
        currency: "ARS",
      }
    );

  // =========================
  // TOTALES
  // =========================

  const totalGastado =
    gastos.reduce(
      (acc, gasto) =>
        acc + Number(gasto.monto || 0),
      0
    );

  const gastoMasAlto =
    gastos.length > 0
      ? Math.max(
          ...gastos.map((g) =>
            Number(g.monto || 0)
          )
        )
      : 0;

  // =========================
  // MODAL
  // =========================

  const abrirModal = () => {

    setFormData({
      concepto: "",
      monto: "",
      categoria: "Otros",
    });

    setEditId(null);

    setShowModal(true);
  };

  const cerrarModal = () => {

    setFormData({
      concepto: "",
      monto: "",
      categoria: "Otros",
    });

    setEditId(null);

    setShowModal(false);
  };

  // =========================
  // HANDLE CHANGE
  // =========================

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =========================
  // GUARDAR GASTO
  // =========================

  const handleGuardarGasto =
    async (e) => {

      e.preventDefault();

      if (
        !formData.concepto ||
        !formData.monto
      ) return;

      const data = {
        concepto: formData.concepto,
        monto: Number(formData.monto),
        categoria: formData.categoria,
        fecha: Timestamp.now(),
      };

      try {

        if (editId) {

          await updateDoc(
            doc(
              db,
              "gastos",
              editId
            ),
            data
          );

        } else {

          await addDoc(
            gastosRef,
            data
          );
        }

        cerrarModal();

      } catch (error) {

        console.error(
          "Error al guardar gasto:",
          error
        );
      }
    };

  // =========================
  // ELIMINAR
  // =========================

  const handleEliminarGasto =
    async (id) => {

      try {

        await deleteDoc(
          doc(db, "gastos", id)
        );

      } catch (error) {

        console.error(
          "Error al eliminar:",
          error
        );
      }
    };

  // =========================
  // EDITAR
  // =========================

  const handleEditarGasto =
    (gasto) => {

      setFormData({
        concepto: gasto.concepto,
        monto: gasto.monto,
        categoria:
          gasto.categoria || "Otros",
      });

      setEditId(gasto.id);

      setShowModal(true);
    };

  // =========================
  // COLOR CATEGORIA
  // =========================

  const categoriaColor = (
    categoria
  ) => {

    switch (categoria) {

      case "Combustible":
        return "bg-yellow-100 text-yellow-700";

      case "Peajes":
        return "bg-blue-100 text-blue-700";

      case "Comida":
        return "bg-orange-100 text-orange-700";

      case "Reparaciones":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  // =========================
  // JSX
  // =========================

  return (

    <div className="min-h-screen bg-white-100 pb-28">

      {/* HEADER  bg-gradient-to-r
          from-red-500
          to-orange-500*/}
      <div
        className="
         
          px-5
          pt-8
          pb-10
          rounded-b-[35px]
          shadow-lg
        "
      >

        <div className="flex items-center gap-3">

          <div
            className="
              bg-orange/20
              p-3
              rounded-2xl
            "
          >

            <Receipt
              className="text-white"
              size={28}
            />

          </div>

          <div>

            <h1
              className="
                text-3xl
                font-bold
                text-white
              "
            >

              Gastos

            </h1>

            <p
              className="
                text-red-100
                text-sm
              "
            >

              Control financiero mensual

            </p>
          </div>
        </div>
      </div>

      {/* RESUMEN */}
      <div className="px-4 -mt-6">

        <div
          className="
            grid
            grid-cols-2
            gap-4
          "
        >

          {/* TOTAL */}
          <div
            className="
              bg-white
              rounded-[28px]
              p-5
              shadow-sm
            "
          >

            <div className="flex items-center gap-2 mb-3">

              <Wallet
                className="text-red-500"
                size={20}
              />

              <p className="text-gray-500 text-sm">

                Total gastado

              </p>
            </div>

            <h2
              className="
                text-2xl
                font-bold
                text-gray-800
              "
            >

              {formatPrecio(
                totalGastado
              )}

            </h2>
          </div>

          {/* MOVIMIENTOS */}
          <div
            className="
              bg-white
              rounded-[28px]
              p-5
              shadow-sm
            "
          >

            <div className="flex items-center gap-2 mb-3">

              <CalendarDays
                className="text-blue-500"
                size={20}
              />

              <p className="text-gray-500 text-sm">

                Movimientos

              </p>
            </div>

            <h2
              className="
                text-2xl
                font-bold
                text-gray-800
              "
            >

              {gastos.length}

            </h2>
          </div>

          {/* GASTO MÁS ALTO */}
          <div
            className="
              bg-white
              rounded-[28px]
              p-5
              shadow-sm
              col-span-2
            "
          >

            <div className="flex items-center gap-2 mb-3">

              <TrendingDown
                className="text-orange-500"
                size={20}
              />

              <p className="text-gray-500 text-sm">

                Gasto más alto

              </p>
            </div>

            <h2
              className="
                text-3xl
                font-bold
                text-gray-800
              "
            >

              {formatPrecio(
                gastoMasAlto
              )}

            </h2>
          </div>
        </div>

        {/* LISTA */}
        <div className="mt-6 space-y-4">

          {loading ? (

            <div className="flex justify-center mt-10">

              <div
                className="
                  animate-spin
                  rounded-full
                  h-12
                  w-12
                  border-4
                  border-red-500
                  border-t-transparent
                "
              />

            </div>

          ) : gastos.length > 0 ? (

            gastos.map((gasto) => (

              <div
                key={gasto.id}
                className="
                  bg-white
                  rounded-[28px]
                  p-5
                  shadow-sm
                  border
                  border-gray-100
                "
              >

                {/* TOP */}
                <div className="flex justify-between items-start">

                  <div>

                    <div
                      className={`
                        inline-flex
                        px-3
                        py-1
                        rounded-full
                        text-xs
                        font-semibold
                        mb-3
                        ${categoriaColor(
                          gasto.categoria
                        )}
                      `}
                    >

                      {gasto.categoria ||
                        "Otros"}

                    </div>

                    <h3
                      className="
                        text-xl
                        font-bold
                        text-gray-800
                      "
                    >

                      {gasto.concepto}

                    </h3>

                    <p
                      className="
                        text-sm
                        text-gray-400
                        mt-1
                      "
                    >

                      {gasto.fecha
                        ?.toDate()
                        .toLocaleDateString(
                          "es-AR"
                        )}

                    </p>
                  </div>

                  <div
                    className="
                      text-right
                    "
                  >

                    <p
                      className="
                        text-2xl
                        font-bold
                        text-red-500
                      "
                    >

                      {formatPrecio(
                        gasto.monto
                      )}

                    </p>
                  </div>
                </div>

                {/* BOTONES */}
                <div
                  className="
                    mt-5
                    flex
                    gap-3
                  "
                >

                  <button
                    onClick={() =>
                      handleEditarGasto(
                        gasto
                      )
                    }
                    className="
                      flex-1
                      bg-blue-50
                      text-blue-600
                      py-3
                      rounded-2xl
                      font-semibold
                      flex
                      items-center
                      justify-center
                      gap-2
                    "
                  >

                    <Pencil size={18} />

                    Editar

                  </button>

                  <button
                    onClick={() =>
                      handleEliminarGasto(
                        gasto.id
                      )
                    }
                    className="
                      flex-1
                      bg-red-50
                      text-red-600
                      py-3
                      rounded-2xl
                      font-semibold
                      flex
                      items-center
                      justify-center
                      gap-2
                    "
                  >

                    <Trash2 size={18} />

                    Eliminar

                  </button>
                </div>
              </div>
            ))

          ) : (

            <div
              className="
                bg-white
                rounded-[28px]
                p-10
                text-center
                shadow-sm
                mt-6
              "
            >

              <Receipt
                size={48}
                className="
                  mx-auto
                  text-gray-300
                  mb-4
                "
              />

              <h3
                className="
                  text-xl
                  font-bold
                  text-gray-700
                "
              >

                No hay gastos

              </h3>

              <p className="text-gray-500 mt-1">

                Todavía no cargaste gastos

              </p>
            </div>
          )}
        </div>
      </div>

      {/* BOTON FLOTANTE */}
      <button
        onClick={abrirModal}
        className="
          fixed
          bottom-24
          right-5
          w-16
          h-16
          rounded-full
          bg-red-500
          text-white
          shadow-2xl
          flex
          items-center
          justify-center
          active:scale-95
          transition-all
          z-40
        "
      >

        <Plus size={30} />

      </button>

      {/* MODAL */}
      {showModal && (

        <div
          className="
            fixed
            inset-0
            bg-black/40
            backdrop-blur-sm
            flex
            items-center
            justify-center
            z-50
            px-4
          "
        >

          <div
            className="
              bg-white
              w-full
              max-w-md
              rounded-[32px]
              p-6
              shadow-2xl
            "
          >

            <h2
              className="
                text-2xl
                font-bold
                mb-6
              "
            >

              {editId
                ? "Editar gasto"
                : "Nuevo gasto"}

            </h2>

            <form
              onSubmit={
                handleGuardarGasto
              }
              className="space-y-4"
            >

              <div>

                <label
                  className="
                    text-sm
                    text-gray-500
                    mb-2
                    block
                  "
                >

                  Concepto

                </label>

                <input
                  type="text"
                  name="concepto"
                  value={
                    formData.concepto
                  }
                  onChange={
                    handleChange
                  }
                  className="
                    w-full
                    border
                    border-gray-200
                    rounded-2xl
                    px-4
                    py-3
                    outline-none
                  "
                  required
                />
              </div>

              <div>

                <label
                  className="
                    text-sm
                    text-gray-500
                    mb-2
                    block
                  "
                >

                  Categoría

                </label>

                <select
                  name="categoria"
                  value={
                    formData.categoria
                  }
                  onChange={
                    handleChange
                  }
                  className="
                    w-full
                    border
                    border-gray-200
                    rounded-2xl
                    px-4
                    py-3
                    outline-none
                  "
                >

                  <option>
                    Combustible
                  </option>

                  <option>
                    Peajes
                  </option>

                  <option>
                    Comida
                  </option>

                  <option>
                    Reparaciones
                  </option>

                  <option>
                    Otros
                  </option>

                </select>
              </div>

              <div>

                <label
                  className="
                    text-sm
                    text-gray-500
                    mb-2
                    block
                  "
                >

                  Monto

                </label>

                <input
                  type="number"
                  name="monto"
                  value={
                    formData.monto
                  }
                  onChange={
                    handleChange
                  }
                  className="
                    w-full
                    border
                    border-gray-200
                    rounded-2xl
                    px-4
                    py-3
                    outline-none
                  "
                  required
                />
              </div>

              {/* BOTONES */}
              <div
                className="
                  flex
                  gap-3
                  pt-4
                "
              >

                <button
                  type="button"
                  onClick={cerrarModal}
                  className="
                    flex-1
                    bg-gray-100
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
                    bg-red-500
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

      <NavMenu />

    </div>
  );
}