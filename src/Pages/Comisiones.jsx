// import React, { useEffect, useState } from "react";
// import { collection, getDocs } from "firebase/firestore";
// import { db } from "../firebase/firebase";
// import NavMenu from "../Components/NavMenu";

// const Comisiones = () => {
//   const [pedidos, setPedidos] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchPedidos = async () => {
//       setLoading(true);
//       const pedidosCol = collection(db, "idPedido");
//       const snapshot = await getDocs(pedidosCol);
//       const pedidosData = snapshot.docs.map(doc => {
//         const data = doc.data();
//         return {
//           id: doc.id,
//           vendedor: data.vendedor || "Sin nombre",
    
//           comision: Number(data.comision) || 0
//         };
//       });
//       setPedidos(pedidosData);
//       setLoading(false);
//     };

//     fetchPedidos();
//   }, []);

//   const comisionesValidas = pedidos.filter(p => p.comision > 0);

//   const totalComisiones = comisionesValidas.reduce((total, p) => total + p.comision, 0);

//   return (
//     <div className="p-4 max-w-xl mx-auto">
//       <h1 className="text-2xl font-bold text-center mb-4">Listado de Comisiones</h1>

//       {loading ? (
//         <div className="flex justify-center mt-6">
//           <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500 border-opacity-50"></div>
//         </div>
//       ) : (
//         <>
//           {comisionesValidas.length === 0 ? (
//             <p className="text-center text-gray-500">No hay comisiones registradas.</p>
//           ) : (
//             <div className="space-y-3 mb-6">
//               {comisionesValidas.map(pedido => (
//                 <div key={pedido.id} className="p-3 border rounded bg-white shadow">
//                   <p><strong>Vendedor:</strong> {pedido.vendedor}</p>
                
//                   <p><strong>Comisión:</strong> {pedido.comision.toLocaleString("es-AR", {
//                     style: "currency",
//                     currency: "ARS"
//                   })}</p>
//                 </div>
//               ))}
//             </div>
//           )}

//           <hr className="my-4" />

//           <h2 className="text-xl font-semibold text-right">
//             Total: {totalComisiones.toLocaleString("es-AR", {
//               style: "currency",
//               currency: "ARS"
//             })}
//           </h2>
//         </>
//       )}

//       <NavMenu />
//     </div>
//   );
// };

// export default Comisiones;



import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";
import NavMenu from "../Components/NavMenu";

const Comisiones = () => {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPedidos = async () => {
      setLoading(true);
      const pedidosCol = collection(db, "idPedido");
      const snapshot = await getDocs(pedidosCol);
      const pedidosData = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          vendedor: data.vendedor || "Sin nombre",
          comision: Number(data.comision) || 0,
          electrodomestico: data.electrodomestico || "No especificado",
          fecha: data.fecha?.toDate ? data.fecha.toDate().toLocaleDateString("es-AR") : "Sin fecha"
        };
      });
      setPedidos(pedidosData);
      setLoading(false);
    };

    fetchPedidos();
  }, []);

  const comisionesValidas = pedidos.filter(p => p.comision > 0);

  const totalComisiones = comisionesValidas.reduce((total, p) => total + p.comision, 0);

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold text-center mb-4">Listado de Comisiones</h1>

      {loading ? (
        <div className="flex justify-center mt-6">
          <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500 border-opacity-50"></div>
        </div>
      ) : (
        <>
          {comisionesValidas.length === 0 ? (
            <p className="text-center text-gray-500">No hay comisiones registradas.</p>
          ) : (
            <div className="space-y-3 mb-6">
              {comisionesValidas.map(pedido => (
                <div key={pedido.id} className="p-3 border rounded bg-white shadow">
                  <p><strong>Fecha:</strong> {pedido.fecha}</p>
                  <p><strong>Vendedor:</strong> {pedido.vendedor}</p>
                  <p><strong>Electrodoméstico:</strong> {pedido.electrodomestico}</p>
                  <p><strong>Comisión:</strong> {pedido.comision.toLocaleString("es-AR", {
                    style: "currency",
                    currency: "ARS"
                  })}</p>
                </div>
              ))}
            </div>
          )}

          <hr className="my-4" />

          <h2 className="text-xl font-semibold text-right">
            Total: {totalComisiones.toLocaleString("es-AR", {
              style: "currency",
              currency: "ARS"
            })}
          </h2>
        </>
      )}

      <NavMenu />
    </div>
  );
};

export default Comisiones;
