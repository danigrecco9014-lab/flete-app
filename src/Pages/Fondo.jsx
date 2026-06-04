 
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";
import NavMenu from "../Components/NavMenu";
import { Link } from "react-router-dom";

const Fondo = () => {
  const [fondos, setFondos] = useState([]);
  const [gastos, setGastos] = useState([]);

  useEffect(() => {
    const fetchFondos = async () => {
      const snapshot = await getDocs(collection(db, "fondo"));
      const data = snapshot.docs.map(doc => {
        const raw = doc.data();
        return {
          id: doc.id,
          fecha: raw.fecha?.toDate().toLocaleDateString("es-AR"),
          aportadoAlFondo: raw.aportadoAlFondo || 0,
        };
      });

      const ordenado = data.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
      setFondos(ordenado);
    };

    const fetchGastos = async () => {
      const snapshot = await getDocs(collection(db, "gastos"));
      const data = snapshot.docs.map(doc => doc.data());
      setGastos(data);
    };

    fetchFondos();
    fetchGastos();
  }, []);

  const totalAportado = fondos.reduce((acc, item) => acc + item.aportadoAlFondo, 0);
  const totalGastado = gastos.reduce((acc, item) => acc + item.monto, 0);
  const totalDisponible = totalAportado - totalGastado;

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold text-center mb-6">💼 Fondo acumulado</h1>

      {fondos.length === 0 ? (
        <p className="text-center text-gray-500">Todavía no hay aportes al fondo.</p>
      ) : (
        <div className="space-y-3">
          {fondos.map(item => (
            <div key={item.id} className="bg-white rounded shadow p-3 flex justify-between items-center">
              <span className="font-medium">{item.fecha}</span>
              <span className="text-green-700 font-semibold">
                {item.aportadoAlFondo.toLocaleString("es-AR", {
                  style: "currency",
                  currency: "ARS",
                })}
              </span>
            </div>
          ))}

          <div className="mt-6 p-4 bg-gray-100 rounded-lg space-y-2 border-t border-gray-300">
            <div className="flex justify-between items-center">
              <strong>Total aportado:</strong>
              <span>
                {totalAportado.toLocaleString("es-AR", {
                  style: "currency",
                  currency: "ARS",
                })}
              </span>
            </div>

            <div className="flex justify-between items-center text-red-600">
              <strong>Total gastado:</strong>
              <span>
                -{totalGastado.toLocaleString("es-AR", {
                  style: "currency",
                  currency: "ARS",
                })}
              </span>
            
            </div>
            <>
              <Link to="/gastos">
                <span className=" text-shadow-red-600">Ver gastos</span>
             </Link>
              </>

            <div className="flex justify-between items-center pt-2 border-t border-gray-300 text-green-800 font-bold text-lg">
              <strong>Disponible:</strong>
              <span>
                {totalDisponible.toLocaleString("es-AR", {
                  style: "currency",
                  currency: "ARS",
                })}
              </span>
            </div>
          </div>
        </div>
      )}

      <NavMenu />
    </div>
  );
};

export default Fondo;


// function Fondo() {
//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold">Fondo</h1>

//       <p className="text-gray-600 mt-2">
//         Vista de fondo sin navegación con Router
//       </p>
//     </div>
//   );
// }

// export default Fondo;