import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "./firebaseConfig";

// Agregar un nuevo pedido
export const agregarPedido = async (pedido) => {
  try {
    const docRef = await addDoc(collection(db, "pedidos"), pedido);
    console.log("Pedido agregado con ID:", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error al agregar pedido:", error);
    throw error;
  }
};

// Obtener pedidos por fecha
export const obtenerPedidosPorFecha = async (fecha) => {
  try {
    const pedidosRef = collection(db, "pedidos");
    const q = query(pedidosRef, where("fecha", "==", fecha));
    const querySnapshot = await getDocs(q);

    const pedidos = [];
    querySnapshot.forEach((doc) => {
      pedidos.push({ id: doc.id, ...doc.data() });
    });

    return pedidos;
  } catch (error) {
    console.error("Error al obtener pedidos:", error);
    throw error;
  }
};
