// const Sidebar = ({ setSeccion }) => (
//     <div className="bg-gray-800 text-white w-64 p-4 hidden md:block ">
    
//       <h2 className="text-2xl font-bold my-6">FleteApp</h2>
//       {[
//         "Pedidos",
//         "Gastos",
//         "Calendario",
//         "Comisiones",
//         "Recordatorios",
//         "FinalizarDia",
//       ].map((sec) => (
//         <button
//           key={sec}
//           onClick={() => setSeccion(sec)}
//           className="block w-full text-left px-2 py-1 hover:bg-gray-700 rounded"
//         >
//           {sec}
//         </button>
//       ))}
//     </div>
//   );
  
//   export default Sidebar;


// import { Link } from "react-router-dom";

// const Sidebar = () => {
//   return (
//     <div className="w-64 bg-gray-800 text-white p-4 hidden md:block">
//       <h1 className="text-xl font-bold mb-6">FleteApp</h1>

//       <Link to="/home">Home</Link>
//       <Link to="/pedidos">Pedidos</Link>
//       <Link to="/gastos">Gastos</Link>
//       <Link to="/calendario">Calendario</Link>
//       <Link to="/resumen">Resumen</Link>
//     </div>
//   );
// };

// export default Sidebar;


import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-800 text-white p-4 hidden md:block">
      <h1 className="text-xl font-bold mb-6">FleteApp</h1>

      <Link to="/home">Home</Link>
      <Link to="/pedidos">Pedidos</Link>
      <Link to="/gastos">Gastos</Link>
      <Link to="/calendario">Calendario</Link>
      <Link to="/resumen">Resumen</Link>
      <Link to="/perfil">Perfil</Link>
    </div>
  );
};

export default Sidebar;