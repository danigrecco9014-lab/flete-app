 
// import React, { useEffect, useState } from "react";
// import { collection, getDocs } from "firebase/firestore";
// import { db } from "../firebase/firebase";
// import NavMenu from "../Components/NavMenu";
// import { Link } from "react-router-dom";

// const Fondo = () => {
//   const [fondos, setFondos] = useState([]);
//   const [gastos, setGastos] = useState([]);

//   useEffect(() => {
//     const fetchFondos = async () => {
//       const snapshot = await getDocs(collection(db, "fondo"));
//       const data = snapshot.docs.map(doc => {
//         const raw = doc.data();
//         return {
//           id: doc.id,
//           fecha: raw.fecha?.toDate().toLocaleDateString("es-AR"),
//           aportadoAlFondo: raw.aportadoAlFondo || 0,
//         };
//       });

//       const ordenado = data.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
//       setFondos(ordenado);
//     };

//     const fetchGastos = async () => {
//       const snapshot = await getDocs(collection(db, "gastos"));
//       const data = snapshot.docs.map(doc => doc.data());
//       setGastos(data);
//     };

//     fetchFondos();
//     fetchGastos();
//   }, []);

//   const totalAportado = fondos.reduce((acc, item) => acc + item.aportadoAlFondo, 0);
//   const totalGastado = gastos.reduce((acc, item) => acc + item.monto, 0);
//   const totalDisponible = totalAportado - totalGastado;

//   return (
//     <div className="p-4 max-w-xl mx-auto">
//       <h1 className="text-2xl font-bold text-center mb-6">💼 Fondo acumulado</h1>

//       {fondos.length === 0 ? (
//         <p className="text-center text-gray-500">Todavía no hay aportes al fondo.</p>
//       ) : (
//         <div className="space-y-3">
//           {fondos.map(item => (
//             <div key={item.id} className="bg-white rounded shadow p-3 flex justify-between items-center">
//               <span className="font-medium">{item.fecha}</span>
//               <span className="text-green-700 font-semibold">
//                 {item.aportadoAlFondo.toLocaleString("es-AR", {
//                   style: "currency",
//                   currency: "ARS",
//                 })}
//               </span>
//             </div>
//           ))}

//           <div className="mt-6 p-4 bg-gray-100 rounded-lg space-y-2 border-t border-gray-300">
//             <div className="flex justify-between items-center">
//               <strong>Total aportado:</strong>
//               <span>
//                 {totalAportado.toLocaleString("es-AR", {
//                   style: "currency",
//                   currency: "ARS",
//                 })}
//               </span>
//             </div>

//             <div className="flex justify-between items-center text-red-600">
//               <strong>Total gastado:</strong>
//               <span>
//                 -{totalGastado.toLocaleString("es-AR", {
//                   style: "currency",
//                   currency: "ARS",
//                 })}
//               </span>
            
//             </div>
//             <>
//               <Link to="/gastos">
//                 <span className=" text-shadow-red-600">Ver gastos</span>
//              </Link>
//               </>

//             <div className="flex justify-between items-center pt-2 border-t border-gray-300 text-green-800 font-bold text-lg">
//               <strong>Disponible:</strong>
//               <span>
//                 {totalDisponible.toLocaleString("es-AR", {
//                   style: "currency",
//                   currency: "ARS",
//                 })}
//               </span>
//             </div>
//           </div>
//         </div>
//       )}

//       <NavMenu />
//     </div>
//   );
// };

// export default Fondo;


import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";
import NavMenu from "../Components/NavMenu";
import { Link } from "react-router-dom";
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  ArrowRight,
} from "lucide-react";

const Fondo = () => {
  const [fondos, setFondos] = useState([]);
  const [gastos, setGastos] = useState([]);

  useEffect(() => {
    const fetchFondos = async () => {
      try {
        const snapshot = await getDocs(collection(db, "fondo"));

        const data = snapshot.docs.map((doc) => {
          const raw = doc.data();

          return {
            id: doc.id,
            fecha:
              raw.fecha?.toDate()?.toLocaleDateString(
                "es-AR"
              ) || "",
            aportadoAlFondo:
              raw.aportadoAlFondo || 0,
          };
        });

        setFondos(data.reverse());
      } catch (error) {
        console.error(
          "Error cargando fondos:",
          error
        );
      }
    };

    const fetchGastos = async () => {
      try {
        const snapshot = await getDocs(
          collection(db, "gastos")
        );

        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setGastos(data);
      } catch (error) {
        console.error(
          "Error cargando gastos:",
          error
        );
      }
    };

    fetchFondos();
    fetchGastos();
  }, []);

  const totalAportado = fondos.reduce(
    (acc, item) =>
      acc + (item.aportadoAlFondo || 0),
    0
  );

  const totalGastado = gastos.reduce(
    (acc, item) =>
      acc + (Number(item.monto) || 0),
    0
  );

  const totalDisponible =
    totalAportado - totalGastado;

  return (
    <div className="min-h-screen bg-gray-100 pb-32">
      {/* HEADER */}

      <div className="bg-emerald-600 p-6 rounded-b-3xl shadow-lg">
        <div className="flex items-center gap-3">
          <div className="bg-white/20 p-3 rounded-2xl">
            <Wallet className="text-white" />
          </div>

          <div>
            <h1 className="text-white text-2xl font-bold">
              Fondo Acumulado
            </h1>

            <p className="text-emerald-100 text-sm">
              Estado actual del fondo
            </p>
          </div>
        </div>

        <div className="mt-6 bg-white rounded-3xl p-5 shadow">
          <p className="text-gray-500 text-sm">
            Disponible
          </p>

          <h2 className="text-4xl font-bold text-emerald-700 mt-2">
            {totalDisponible.toLocaleString(
              "es-AR",
              {
                style: "currency",
                currency: "ARS",
              }
            )}
          </h2>
        </div>
      </div>

      {/* RESUMEN */}

      <div className="grid grid-cols-2 gap-4 p-4">
        <div className="bg-white rounded-2xl p-4 shadow">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="text-green-600" />

            <span className="text-gray-500 text-sm">
              Total aportado
            </span>
          </div>

          <p className="font-bold text-xl text-green-700">
            {totalAportado.toLocaleString(
              "es-AR",
              {
                style: "currency",
                currency: "ARS",
              }
            )}
          </p>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow">
          <div className="flex items-center gap-2 mb-2">
            <TrendingDown className="text-red-500" />

            <span className="text-gray-500 text-sm">
              Total gastado
            </span>
          </div>

          <p className="font-bold text-xl text-red-500">
            {totalGastado.toLocaleString(
              "es-AR",
              {
                style: "currency",
                currency: "ARS",
              }
            )}
          </p>
        </div>
      </div>

      {/* BOTON GASTOS */}

      <div className="px-4 mb-4">
        <Link
          to="/gastos"
          className="
            bg-white
            rounded-2xl
            shadow
            p-4
            flex
            justify-between
            items-center
          "
        >
          <span className="font-semibold">
            Ver gastos registrados
          </span>

          <ArrowRight />
        </Link>
      </div>

      {/* HISTORIAL */}

      <div className="px-4">
        <h2 className="font-bold text-xl mb-3">
          Historial de aportes
        </h2>

        {fondos.length === 0 ? (
          <div className="bg-white rounded-2xl p-6 text-center shadow">
            <p className="text-gray-500">
              Todavía no hay aportes al fondo.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {fondos.map((item) => (
              <div
                key={item.id}
                className="
                  bg-white
                  rounded-2xl
                  shadow-sm
                  border
                  border-gray-100
                  p-4
                  flex
                  justify-between
                  items-center
                "
              >
                <div>
                  <p className="font-semibold">
                    {item.fecha}
                  </p>

                  <p className="text-sm text-gray-500">
                    Aporte registrado
                  </p>
                </div>

                <span className="font-bold text-green-700">
                  {item.aportadoAlFondo.toLocaleString(
                    "es-AR",
                    {
                      style: "currency",
                      currency: "ARS",
                    }
                  )}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      <NavMenu />
    </div>
  );
};

export default Fondo;