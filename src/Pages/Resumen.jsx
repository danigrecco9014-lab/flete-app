  


  import { useNavigate } from "react-router-dom";
  import { useEffect, useState } from "react";

  import {
    Package,
    Receipt,
    Wallet,
    BellRing,
    FileText,
    Plus,
    Check,
  } from "lucide-react";

  import {
    collection,
    query,
    where,
    onSnapshot,
    Timestamp,
    
  } from "firebase/firestore";

  import { db } from "../firebase/firebase";

  import NavMenu from "../Components/NavMenu";

  export default function Resumen() {

    const navigate = useNavigate();

    // =========================
    // STATES
    // =========================

    const [totalGastos, setTotalGastos] =
      useState(0);

    const [totalPedidos, setTotalPedidos] =
      useState(0);

    const [totalFondo, setTotalFondo] =
      useState(0);

    const [
      facturasPendientes,
      setFacturasPendientes,
    ] = useState([]);

  

    // =========================
    // TRAER GASTOS DEL MES
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
        collection(db, "gastos"),

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

          const gastos =
            snapshot.docs.map((doc) =>
              doc.data()
            );

          const total = gastos.reduce(
            (acc, gasto) =>
              acc + (gasto.monto || 0),
            0
          );

          setTotalGastos(total);
        }
      );

      return () => unsub();

    }, []);

    // =========================
    // TRAER PEDIDOS DEL MES
    // =========================



    useEffect(() => {

  const inicioDia = new Date();
  inicioDia.setHours(0, 0, 0, 0);

  const finDia = new Date();
  finDia.setHours(23, 59, 59, 999);

  const qPedidos = query(
    collection(db, "idPedido"),

    where(
      "fecha",
      ">=",
      Timestamp.fromDate(inicioDia)
    ),

    where(
      "fecha",
      "<=",
      Timestamp.fromDate(finDia)
    )
  );

  const unsubPedidos = onSnapshot(
    qPedidos,
    (snapshot) => {

      setTotalPedidos(
        snapshot.docs.length
      );

    }
  );

  return () => unsubPedidos();

}, []);
    // useEffect(() => {

    //   const now = new Date();

    //   const primerDia = new Date(
    //     now.getFullYear(),
    //     now.getMonth(),
    //     1
    //   );

    //   const ultimoDia = new Date(
    //     now.getFullYear(),
    //     now.getMonth() + 1,
    //     0,
    //     23,
    //     59,
    //     59
    //   );

    //   const qPedidos = query(
    //     collection(db, "idPedido"),

    //     where(
    //       "fecha",
    //       ">=",
    //       Timestamp.fromDate(primerDia)
    //     ),

    //     where(
    //       "fecha",
    //       "<=",
    //       Timestamp.fromDate(ultimoDia)
    //     )
    //   );

    //   const unsubPedidos = onSnapshot(
    //     qPedidos,
    //     (snapshot) => {

    //       setTotalPedidos(
    //         snapshot.docs.length
    //       );
    //     }
    //   );

    //   return () => unsubPedidos();

    // }, []);

    // =========================
    // TRAER FONDO
    // =========================

    useEffect(() => {

      const fondoRef =
        collection(db, "fondo");

      const unsubFondo = onSnapshot(
        fondoRef,
        (snapshot) => {

          const fondos =
            snapshot.docs.map((doc) =>
              doc.data()
            );

          const total = fondos.reduce(
            (acc, item) =>
              acc +
              (item.aportadoAlFondo || 0),
            0
          );

          setTotalFondo(total);
        }
      );

      return () => unsubFondo();

    }, []);

    // =========================
    // TRAER FACTURAS
    // =========================

    useEffect(() => {

      const qFacturas = query(
        collection(db, "facturas"),
        where("pagada", "==", false)
      );

      const unsubFacturas =
        onSnapshot(
          qFacturas,
          (snapshot) => {

            const lista =
              snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
              }));

            setFacturasPendientes(
              lista
            );
          }
        );

      return () => unsubFacturas();

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
    // HANDLE FORM FACTURA
    // =========================

  

    // =========================
    // GUARDAR FACTURA
    // =========================


    // =========================
    // MARCAR COMO PAGADA
    // =========================



    // =========================
    // CARDS
    // =========================

    const secciones = [
      {
        nombre: "Pedidos",

        valor: totalPedidos,

        icono: <Package size={28} />,

        ruta: "/pedidos",

        color: "text-green-600",

        bgIcon: "bg-green-100",

        bgButton: "bg-green-50",
      },

      {
        nombre: "Gastos",

        valor: formatPrecio(
          totalGastos
        ),

        icono: <Receipt size={28} />,

        ruta: "/gastos",

        color: "text-orange-500",

        bgIcon: "bg-orange-100",

        bgButton: "bg-orange-50",
      },

      {
        nombre: "Fondo",

        valor: formatPrecio(
          totalFondo
        ),

        icono: <Wallet size={28} />,

        ruta: "/fondo",

        color: "text-blue-600",

        bgIcon: "bg-blue-100",

        bgButton: "bg-blue-50",
      },

      {
        nombre: "Recordatorios",

        valor: "Alertas",

        icono: <BellRing size={28} />,

        ruta: "/recordatorios",

        color: "text-red-500",

        bgIcon: "bg-red-100",

        bgButton: "bg-red-50",
      },

      {
    nombre: "Facturas",

    valor:
      facturasPendientes.length,

    icono: <FileText size={28} />,

    ruta: "/facturas",

    color: "text-purple-600",

    bgIcon: "bg-purple-100",

    bgButton: "bg-purple-50",
  },
    ];

    // =========================
    // JSX
    // =========================

    return (

      <div className="min-h-screen bg-gray-100 px-4 pt-4 pb-28">

        <h1 className="text-4xl font-bold mb-6">

          Resumen

        </h1>

        {/* CARDS */}
        <div className="grid grid-cols-2 gap-4">

          {secciones.map((item) => (

            <div
              key={item.nombre}

              onClick={() => {
                navigate(item.ruta)  
              }}

              className="
                bg-white
                rounded-2xl
                p-4
                shadow-sm
                active:scale-95
                transition-all
                cursor-pointer
                flex
                flex-col
                justify-between
                min-h-[180px]
              "
            >

              {/* ICONO */}
              <div
                className={`
                  w-16
                  h-16
                  rounded-2xl
                  flex
                  items-center
                  justify-center
                  ${item.bgIcon}
                  ${item.color}
                `}
              >

                {item.icono}

              </div>

              {/* INFO */}
              <div className="mt-4">

                <h2
                  className={`
                    text-xl
                    font-bold
                    wrap-break-words
                    ${item.color}
                  `}
                >

                  {item.valor}

                </h2>

                <p className="text-gray-600 text-lg mt-1">

                  {item.nombre}

                </p>

              </div>

              {/* BUTTON */}
              <button
                className={`
                  mt-5
                  w-full
                  py-3
                  rounded-2xl
                  font-semibold
                  text-sm
                  ${item.bgButton}
                  ${item.color}
                `}
              >

                Ver detalle

              </button>
            </div>
          ))}

        </div>


        <NavMenu />

      </div>
    );
  }
