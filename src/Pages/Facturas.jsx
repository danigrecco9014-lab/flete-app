import { useEffect, useState } from "react";

import {
  FileText,
  Plus,
  Check,
  Pencil,
  Trash2,
} from "lucide-react";

import {
  collection,
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  Timestamp,
  query,
  orderBy,
} from "firebase/firestore";



import { db } from "../firebase/firebase";

import NavMenu from "../Components/NavMenu";

export default function Facturas() {

  const [facturas, setFacturas] =
    useState([]);

  const [
    mostrarFormulario,
    setMostrarFormulario,
  ] = useState(false);

const [modoEdicion, setModoEdicion] =
  useState(false);

const [idEditar, setIdEditar] =
  useState(null);

const [mostrarEliminar, setMostrarEliminar] =
  useState(false);

const [facturaEliminar, setFacturaEliminar] =
  useState(null);

  const [nuevaFactura, setNuevaFactura] =
    useState({
      detalle: "",
      numeroFactura: "",
      local: "",
      importe: "",
    });

  // =========================
  // TRAER FACTURAS
  // =========================

  useEffect(() => {

    const q = query(
      collection(db, "facturas"),
      orderBy("fecha", "desc")
    );

    const unsub = onSnapshot(
      q,
      (snapshot) => {

        const lista =
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

        setFacturas(lista);
      }
    );

    return () => unsub();

  }, []);

  // =========================
  // HANDLE FORM
  // =========================

  const handleChange = (e) => {

    const { name, value } = e.target;

    setNuevaFactura((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =========================
  // GUARDAR FACTURA
  // =========================

  // const guardarFactura = async (e) => {

  //   e.preventDefault();

  //   try {

  //     await addDoc(
  //       collection(db, "facturas"),
  //       {
  //         detalle:
  //           nuevaFactura.detalle,

  //         numeroFactura:
  //           nuevaFactura.numeroFactura,

  //         local:
  //           nuevaFactura.local,

  //         importe: Number(
  //           nuevaFactura.importe
  //         ),

  //         pagada: false,

  //         fecha:
  //           Timestamp.now(),
  //       }
  //     );

  //     setNuevaFactura({
  //       detalle: "",
  //       numeroFactura: "",
  //       local: "",
  //       importe: "",
  //     });

  //     setMostrarFormulario(false);

  //   } catch (error) {

  //     console.error(error);
  //   }
  // };
  
  const guardarFactura = async (e) => {

  e.preventDefault();

  try {

    const datos = {

      detalle:
        nuevaFactura.detalle,

      numeroFactura:
        nuevaFactura.numeroFactura,

      local:
        nuevaFactura.local,

      importe: Number(
        nuevaFactura.importe
      ),
    };

    if (modoEdicion) {

      await updateDoc(
        doc(
          db,
          "facturas",
          idEditar
        ),
        datos
      );

    } else {

      await addDoc(
        collection(db, "facturas"),
        {
          ...datos,
          pagada: false,
          fecha: Timestamp.now(),
        }
      );
    }

    setNuevaFactura({
      detalle: "",
      numeroFactura: "",
      local: "",
      importe: "",
    });

    setModoEdicion(false);

    setIdEditar(null);

    setMostrarFormulario(false);

  } catch (error) {

    console.error(error);
  }
};
  // =========================
  // MARCAR PAGADA
  // =========================

  const marcarPagada = async (
    id
  ) => {

    try {

      const facturaRef = doc(
        db,
        "facturas",
        id
      );

      await updateDoc(
        facturaRef,
        {
          pagada: true,
        }
      );

    } catch (error) {

      console.error(error);
    }
  };

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
  // FILTRAR
  // =========================

  const pendientes =
    facturas.filter(
      (f) => !f.pagada
    );

  const pagadas =
    facturas.filter(
      (f) => f.pagada
    );

    const editarFactura = (factura) => {

  setNuevaFactura({
    detalle: factura.detalle || "",
    numeroFactura:
      factura.numeroFactura || "",
    local: factura.local || "",
    importe: factura.importe || "",
  });

  setIdEditar(factura.id);

  setModoEdicion(true);

  setMostrarFormulario(true);
};

const eliminarFactura = (id) => {

  setFacturaEliminar(id);

  setMostrarEliminar(true);
};

const confirmarEliminar = async () => {

  try {

    await deleteDoc(
      doc(
        db,
        "facturas",
        facturaEliminar
      )
    );

    setMostrarEliminar(false);

    setFacturaEliminar(null);

  } catch (error) {

    console.error(error);
  }
};

  return (

    <div className="min-h-screen bg-gray-100 pb-28 ">

      {/* HEADER */}
      <div className="flex justify-between  bg-indigo-500 rounded-b-3xl  items-center mb-6 p-4">

        <div >

          <h1 className="text-4xl text-white font-bold">

            Facturas

          </h1>

          <p className="text-white">

            Gestión de facturas

          </p>
        </div>
        <button
          onClick={() =>
            setMostrarFormulario(true)
          }
          className="
            bg-purple-600
            text-white
            p-4
            rounded-2xl
          "
        >

          <Plus />

        </button>
 </div>
    

      {/* ========================= */}
      {/* PENDIENTES */}
      {/* ========================= */}

      <h2 className="text-2xl font-bold m-4">

        Pendientes de pago

      </h2>

      <div className="space-y-4 m-8">

        {pendientes.length === 0 ? (

          <div className="bg-white p-6 rounded-3xl text-center">

            <p className="text-gray-500">

              No hay facturas pendientes

            </p>
          </div>

        ) : (

          pendientes.map((factura) => (

            <div
              key={factura.id}
              className="
                bg-white
                rounded-3xl
                p-5
                shadow-sm
                m-4
              "
            >

              <div className="flex justify-between">

                <div>

                  <p className="text-xs text-gray-400">

                    N° Factura

                  </p>

                  <h3 className="font-bold text-lg">

                    {factura.numeroFactura}

                  </h3>
                </div>

                <div
                  className="
                    bg-red-100
                    text-red-600
                    px-3
                    py-1
                    rounded-full
                    text-xs
                    font-semibold
                    h-fit
                  "
                >

                  Pendiente

                </div>
              </div>

              <div className="mt-4 space-y-3">

                <div>

                  <p className="text-xs text-gray-400">

                    Detalle

                  </p>

                  <p className="font-medium">

                    {factura.detalle}

                  </p>
                </div>

                <div>

                  <p className="text-xs text-gray-400">

                    Local

                  </p>

                  <p className="font-medium">

                    {factura.local}

                  </p>
                </div>

                <div>

                  <p className="text-xs text-gray-400">

                    Importe

                  </p>

                  <p className="text-2xl font-bold text-emerald-600">

                    {formatPrecio(
                      factura.importe
                    )}

                  </p>
                </div>
              </div>

              <button
                onClick={() =>
                  marcarPagada(
                    factura.id
                  )
                }
                className="
                  mt-5
                  w-full
                  bg-green-600
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

                <Check size={18} />

                Marcar pagada

              </button>

              <div className="flex gap-2 mt-3">

  <button
    onClick={() =>
      editarFactura(factura)
    }
    className="
      flex-1
      bg-blue-500
      text-white
      py-3
      rounded-2xl
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
      eliminarFactura(
        factura.id
      )
    }
    className="
      flex-1
      bg-red-500
      text-white
      py-3
      rounded-2xl
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
        )}
      </div>

      {/* ========================= */}
      {/* PAGADAS */}
      {/* ========================= */}

      <h2 className="text-2xl font-bold m-4">

        Facturas pagadas

      </h2>

      <div className="space-y-4 m-4">

        {pagadas.length === 0 ? (

          <div className="bg-white p-6 rounded-3xl text-center">

            <p className="text-gray-500">

              No hay facturas pagadas

            </p>
          </div>

        ) : (

          pagadas.map((factura) => (

            <div
              key={factura.id}
              className="
                bg-white
                rounded-3xl
                p-5
                shadow-sm
                opacity-70
              "
            >

              <div className="flex justify-between">

                <div>

                  <p className="text-xs text-gray-400">

                    N° Factura

                  </p>

                  <h3 className="font-bold text-lg">

                    {factura.numeroFactura}

                  </h3>
                </div>

                <div
                  className="
                    bg-green-100
                    text-green-700
                    px-3
                    py-1
                    rounded-full
                    text-xs
                    font-semibold
                    h-fit
                  "
                >

                  Pagada

                </div>

                
              </div>

              <div className="mt-4">

                <p className="font-medium">

                  {factura.detalle}

                </p>

                <p className="text-gray-500">

                  {factura.local}

                </p>

                <p className="font-bold text-xl mt-2">

                  {formatPrecio(
                    factura.importe
                  )}

                </p>
              </div>
            </div>
          ))
        )}

        
      </div>

      {/* ========================= */}
      {/* MODAL */}
      {/* ========================= */}

      {mostrarFormulario && (

        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 px-4">

          <div className="bg-white w-full max-w-md rounded-3xl p-6">

            {/* <h2 className="text-2xl font-bold mb-5">

              Nueva Factura

            </h2> */}
<h2 className="text-2xl font-bold mb-5">

  {modoEdicion
    ? "Editar Factura"
    : "Nueva Factura"}

</h2>
            <form
              onSubmit={guardarFactura}
              className="space-y-4"
            >

              <input
                type="text"
                name="detalle"
                placeholder="Detalle"
                value={
                  nuevaFactura.detalle
                }
                onChange={handleChange}
                className="w-full border rounded-2xl px-4 py-3"
                required
              />

              <input
                type="text"
                name="numeroFactura"
                placeholder="Número factura"
                value={
                  nuevaFactura.numeroFactura
                }
                onChange={handleChange}
                className="w-full border rounded-2xl px-4 py-3"
                required
              />

              <input
                type="text"
                name="local"
                placeholder="Local"
                value={
                  nuevaFactura.local
                }
                onChange={handleChange}
                className="w-full border rounded-2xl px-4 py-3"
                required
              />

              <input
                type="number"
                name="importe"
                placeholder="Importe"
                value={
                  nuevaFactura.importe
                }
                onChange={handleChange}
                className="w-full border rounded-2xl px-4 py-3"
                required
              />

              <div className="flex gap-3 pt-4">

                <button
                  type="button"
                  onClick={() =>
                    setMostrarFormulario(false)
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
                  type="submit"
                  className="
                    flex-1
                    bg-purple-600
                    text-white
                    py-3
                    rounded-2xl
                    font-semibold
                  "
                >

                  Guardar

                </button>
              </div>
            </form>
          </div>
        </div>
        
      )}
      {/* MODAL ELIMINAR */}

{mostrarEliminar && (

  <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 px-4">

    <div className="bg-white w-full max-w-sm rounded-3xl p-6 text-center shadow-2xl">

      <div className="bg-red-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto">

        <Trash2
          size={40}
          className="text-red-500"
        />

      </div>

      <h2 className="text-2xl font-bold mt-5">

        Eliminar factura

      </h2>

      <p className="text-gray-500 mt-2">

        Esta acción no se puede deshacer.

      </p>

      <div className="flex gap-3 mt-6">

        <button
          onClick={() => {
            setMostrarEliminar(false);
            setFacturaEliminar(null);
          }}
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
}