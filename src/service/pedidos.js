import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";

export const fetchPedidos = async () => {
  try {
    const pedidosRef = collection(db, "idPedido");
    const snapshot = await getDocs(pedidosRef);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error("Error al obtener los pedidos:", error);
    return [];
  }
};
