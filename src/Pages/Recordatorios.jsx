import { useEffect, useState } from "react";

import {
  BellRing,
  Plus,
  Trash2,
  CheckCircle2,
  Clock3,
  CalendarDays,
  Pencil,
  Flag,
} from "lucide-react";

import {
  collection,
  addDoc,
  onSnapshot,
  deleteDoc,
  doc,
  updateDoc,
  Timestamp,
  orderBy,
  query,
} from "firebase/firestore";

import { db } from "../firebase/firebase";
import Nav from "../Components/NavMenu";

export default function Recordatorios() {

  const [recordatorios, setRecordatorios] =
    useState([]);

  const [texto, setTexto] =
    useState("");

  const [fecha, setFecha] =
    useState("");

  const [hora, setHora] =
    useState("");

  const [categoria, setCategoria] =
    useState("General");

  const [prioridad, setPrioridad] =
    useState("media");

  const [recurrente, setRecurrente] =
    useState(false);

  const [editandoId, setEditandoId] =
    useState(null);

  // =========================
  // TRAER RECORDATORIOS
  // =========================

  useEffect(() => {

    const q = query(
      collection(db, "recordatorios"),
      orderBy("createdAt", "desc")
    );

    const unsub = onSnapshot(q, (snapshot) => {

      const data = snapshot.docs.map(
        (doc) => ({
          id: doc.id,
          ...doc.data(),
        })
      );

      setRecordatorios(data);
    });

    return () => unsub();

  }, []);

  // =========================
  // SONIDO
  // =========================

  const reproducirSonido = () => {

    const audio = new Audio(
      "https://actions.google.com/sounds/v1/alarms/beep_short.ogg"
    );

    audio.play();
  };

  // =========================
  // VIBRACION
  // =========================

  const vibrar = () => {

    if (navigator.vibrate) {
      navigator.vibrate(300);
    }
  };

  // =========================
  // AGREGAR / EDITAR
  // =========================

  const guardarRecordatorio = async () => {

    if (!texto.trim()) return;

    const nuevo = {
      texto,
      fecha,
      hora,
      categoria,
      prioridad,
      recurrente,
      completado: false,
      createdAt: Timestamp.now(),
    };

    try {

      // EDITAR
      if (editandoId) {

        const ref = doc(
          db,
          "recordatorios",
          editandoId
        );

        await updateDoc(ref, nuevo);

        setEditandoId(null);

      } else {

        // NUEVO
        await addDoc(
          collection(db, "recordatorios"),
          nuevo
        );

        reproducirSonido();
        vibrar();
      }

      // LIMPIAR
      setTexto("");
      setFecha("");
      setHora("");
      setCategoria("General");
      setPrioridad("media");
      setRecurrente(false);

    } catch (error) {

      console.error(error);
    }
  };

  // =========================
  // ELIMINAR
  // =========================

  const eliminarRecordatorio =
    async (id) => {

      await deleteDoc(
        doc(db, "recordatorios", id)
      );
    };

  // =========================
  // COMPLETAR
  // =========================

  const toggleCompleto =
    async (item) => {

      const ref = doc(
        db,
        "recordatorios",
        item.id
      );

      await updateDoc(ref, {
        completado: !item.completado,
      });
    };

  // =========================
  // EDITAR
  // =========================

  const editarRecordatorio =
    (item) => {

      setTexto(item.texto);
      setFecha(item.fecha);
      setHora(item.hora);
      setCategoria(item.categoria);
      setPrioridad(item.prioridad);
      setRecurrente(item.recurrente);

      setEditandoId(item.id);
    };

  // =========================
  // COLORES PRIORIDAD
  // =========================

  const prioridadColor = (nivel) => {

    switch (nivel) {

      case "alta":
        return "bg-red-100 text-red-600";

      case "media":
        return "bg-yellow-100 text-yellow-600";

      default:
        return "bg-green-100 text-green-600";
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 pb-28">

      {/* HEADER */}
      <div className="mb-6">

        <h1 className="text-4xl font-bold">

          Recordatorios

        </h1>

        <p className="text-gray-500 mt-1">

          Organiza tus tareas y alertas

        </p>
      </div>

      {/* FORM */}
      <div className="bg-white rounded-3xl p-5 shadow-sm mb-5">

        <input
          type="text"
          placeholder="Escribe un recordatorio..."
          value={texto}
          onChange={(e) =>
            setTexto(e.target.value)
          }
          className="
            w-full
            border
            rounded-2xl
            px-4
            py-3
            mb-3
          "
        />

        <div className="grid grid-cols-2 gap-3 mb-3">

          <input
            type="date"
            value={fecha}
            onChange={(e) =>
              setFecha(e.target.value)
            }
            className="
              border
              rounded-2xl
              px-4
              py-3
            "
          />

          <input
            type="time"
            value={hora}
            onChange={(e) =>
              setHora(e.target.value)
            }
            className="
              border
              rounded-2xl
              px-4
              py-3
            "
          />
        </div>

        {/* CATEGORIA */}
        <select
          value={categoria}
          onChange={(e) =>
            setCategoria(e.target.value)
          }
          className="
            w-full
            border
            rounded-2xl
            px-4
            py-3
            mb-3
          "
        >

          <option>General</option>
          <option>Trabajo</option>
          <option>Clientes</option>
          <option>Pagos</option>
          <option>Personal</option>

        </select>

        {/* PRIORIDAD */}
        <select
          value={prioridad}
          onChange={(e) =>
            setPrioridad(e.target.value)
          }
          className="
            w-full
            border
            rounded-2xl
            px-4
            py-3
            mb-3
          "
        >

          <option value="baja">
            Baja
          </option>

          <option value="media">
            Media
          </option>

          <option value="alta">
            Alta
          </option>

        </select>

        {/* RECURRENTE */}
        <div className="flex items-center gap-3 mb-4">

          <input
            type="checkbox"
            checked={recurrente}
            onChange={(e) =>
              setRecurrente(
                e.target.checked
              )
            }
          />

          <span className="text-gray-700">

            Recordatorio recurrente

          </span>
        </div>

        {/* BOTON */}
        <button
          onClick={guardarRecordatorio}
          className="
            w-full
            bg-red-500
            text-white
            py-3
            rounded-2xl
            font-semibold
            flex
            items-center
            justify-center
            gap-2
          "
        >

          <Plus size={20} />

          {editandoId
            ? "Actualizar"
            : "Agregar"}

        </button>
      </div>

      {/* LISTA */}
      <div className="space-y-3">

        {recordatorios.map((item) => (

          <div
            key={item.id}
            className={`
              bg-white
              rounded-3xl
              p-4
              shadow-sm
              border
              ${
                item.completado
                  ? "opacity-60"
                  : ""
              }
            `}
          >

            <div className="flex justify-between">

              {/* INFO */}
              <div className="flex gap-3">

                <div
                  className={`
                    p-3
                    rounded-2xl
                    ${prioridadColor(
                      item.prioridad
                    )}
                  `}
                >

                  <BellRing />

                </div>

                <div>

                  <h2
                    className={`
                      font-semibold
                      text-lg
                      ${
                        item.completado
                          ? "line-through"
                          : ""
                      }
                    `}
                  >

                    {item.texto}

                  </h2>

                  <div className="flex flex-wrap gap-2 mt-2">

                    {/* FECHA */}
                    <div className="bg-gray-100 px-3 py-1 rounded-full text-sm flex items-center gap-1">

                      <CalendarDays size={14} />

                      {item.fecha || "Sin fecha"}

                    </div>

                    {/* HORA */}
                    <div className="bg-gray-100 px-3 py-1 rounded-full text-sm flex items-center gap-1">

                      <Clock3 size={14} />

                      {item.hora || "--:--"}

                    </div>

                    {/* PRIORIDAD */}
                    <div
                      className={`
                        px-3
                        py-1
                        rounded-full
                        text-sm
                        flex
                        items-center
                        gap-1
                        ${prioridadColor(
                          item.prioridad
                        )}
                      `}
                    >

                      <Flag size={14} />

                      {item.prioridad}

                    </div>

                    {/* CATEGORIA */}
                    <div className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm">

                      {item.categoria}

                    </div>

                    {/* RECURRENTE */}
                    {item.recurrente && (

                      <div className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-sm">

                        Diario

                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* BOTONES */}
              <div className="flex flex-col gap-2">

                <button
                  onClick={() =>
                    toggleCompleto(item)
                  }
                  className="
                    bg-green-100
                    p-2
                    rounded-xl
                  "
                >

                  <CheckCircle2
                    className="
                      text-green-600
                    "
                  />

                </button>

                <button
                  onClick={() =>
                    editarRecordatorio(item)
                  }
                  className="
                    bg-blue-100
                    p-2
                    rounded-xl
                  "
                >

                  <Pencil
                    className="
                      text-blue-600
                    "
                  />

                </button>

                <button
                  onClick={() =>
                    eliminarRecordatorio(
                      item.id
                    )
                  }
                  className="
                    bg-red-100
                    p-2
                    rounded-xl
                  "
                >

                  <Trash2
                    className="
                      text-red-600
                    "
                  />

                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Nav />
    </div>
  );
}