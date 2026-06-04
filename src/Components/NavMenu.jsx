// BottomNav.jsx
import { Link } from "react-router-dom";
import { HomeIcon, CreditCard, Calendar, Users } from "lucide-react"; // Asegurate de que los íconos vienen de lucide-react o el paquete que estés usando

const NavMenu = () => {
  return (


      <nav
  className="
    fixed
    bottom-0
    left-0
    w-full
    bg-white/90
    backdrop-blur-md
    border-t
    border-gray-200
    shadow-[0_-4px_20px_rgba(0,0,0,0.06)]
    px-2
    py-3
    flex
    justify-around
    items-center
    z-50
  "
  style={{
    paddingBottom: "calc(env(safe-area-inset-bottom) + 12px)"
  }}
>
  {/* HOME */}
  <Link
    to="/home"
    className="
      flex
      flex-col
      items-center
      justify-center
      text-gray-500
      hover:text-green-600
      transition-colors
      duration-200
    "
  >
    <div
      className="
        w-12
        h-12
        rounded-2xl
        flex
        items-center
        justify-center
        hover:bg-green-100
        transition-all
      "
    >
      <HomeIcon size={24} />
    </div>

    <p className="text-[11px] font-semibold mt-1">
      Inicio
    </p>
  </Link>

  {/* RESUMEN */}
  <Link
    to="/resumen"
    className="
      flex
      flex-col
      items-center
      justify-center
      text-gray-500
      hover:text-blue-600
      transition-colors
      duration-200
    "
  >
    <div
      className="
        w-12
        h-12
        rounded-2xl
        flex
        items-center
        justify-center
        hover:bg-blue-100
        transition-all
      "
    >
      <CreditCard size={24} />
    </div>

    <p className="text-[11px] font-semibold mt-1">
      Resumen
    </p>
  </Link>

  {/* CALENDARIO */}
  <Link
    to="/calendario"
    className="
      flex
      flex-col
      items-center
      justify-center
      text-gray-500
      hover:text-purple-600
      transition-colors
      duration-200
    "
  >
    <div
      className="
        w-12
        h-12
        rounded-2xl
        flex
        items-center
        justify-center
        hover:bg-purple-100
        transition-all
      "
    >
      <Calendar size={24} />
    </div>

    <p className="text-[11px] font-semibold mt-1">
      Calendario
    </p>
  </Link>

  {/* PERFIL */}
  <Link
    to="/perfil"
    className="
      flex
      flex-col
      items-center
      justify-center
      text-gray-500
      hover:text-orange-600
      transition-colors
      duration-200
    "
  >
    <div
      className="
        w-12
        h-12
        rounded-2xl
        flex
        items-center
        justify-center
        hover:bg-orange-100
        transition-all
      "
    >
      <Users size={24} />
    </div>

    <p className="text-[11px] font-semibold mt-1">
      Perfil
    </p>
  </Link>
</nav>  
 
  );
};

export default NavMenu;


// import { HomeIcon, CreditCard, Calendar, Users } from "lucide-react";

// const NavMenu = ({ setSeccion }) => {
//   return (
//     <nav
//       className="
//         fixed
//         bottom-0
//         left-0
//         w-full
//         bg-white/90
//         backdrop-blur-md
//         border-t
//         border-gray-200
//         shadow-[0_-4px_20px_rgba(0,0,0,0.06)]
//         px-2
//         py-3
//         flex
//         justify-around
//         items-center
//         z-50
//       "
//     >
//       {/* HOME */}
//       <button
//         onClick={() => setSeccion("Pedidos")}
//         className="flex flex-col items-center text-gray-500"
//       >
//         <div className="w-12 h-12 flex items-center justify-center rounded-2xl">
//           <HomeIcon size={24} />
//         </div>
//         <p className="text-[11px] font-semibold mt-1">Inicio</p>
//       </button>

//       {/* RESUMEN */}
//       <button
//         onClick={() => setSeccion("Gastos")}
//         className="flex flex-col items-center text-gray-500"
//       >
//         <div className="w-12 h-12 flex items-center justify-center rounded-2xl">
//           <CreditCard size={24} />
//         </div>
//         <p className="text-[11px] font-semibold mt-1">Resumen</p>
//       </button>

//       {/* CALENDARIO */}
//       <button
//         onClick={() => setSeccion("Calendario")}
//         className="flex flex-col items-center text-gray-500"
//       >
//         <div className="w-12 h-12 flex items-center justify-center rounded-2xl">
//           <Calendar size={24} />
//         </div>
//         <p className="text-[11px] font-semibold mt-1">Calendario</p>
//       </button>

//       {/* PERFIL */}
//       <button
//         onClick={() => setSeccion("Estadisticas")}
//         className="flex flex-col items-center text-gray-500"
//       >
//         <div className="w-12 h-12 flex items-center justify-center rounded-2xl">
//           <Users size={24} />
//         </div>
//         <p className="text-[11px] font-semibold mt-1">Perfil</p>
//       </button>
//     </nav>
//   );
// };

// export default NavMenu;
// import { Link } from "react-router-dom";
// import { Home, CreditCard, Calendar, Users } from "lucide-react";

// function NavMenu() {
//   return (
//     <nav className="fixed bottom-0 w-full bg-white border-t flex justify-around p-3 z-50">

//       <Link to="/home" className="flex flex-col items-center">
//         <Home />
//         <span className="text-xs">Home</span>
//       </Link>

//       <Link to="/pedidos" className="flex flex-col items-center">
//         <CreditCard />
//         <span className="text-xs">Pedidos</span>
//       </Link>

//       <Link to="/calendario" className="flex flex-col items-center">
//         <Calendar />
//         <span className="text-xs">Calendario</span>
//       </Link>

//       <Link to="/resumen" className="flex flex-col items-center">
//         <Users />
//         <span className="text-xs">Resumen</span>
//       </Link>

//     </nav>
//   );
// }

// export default NavMenu;