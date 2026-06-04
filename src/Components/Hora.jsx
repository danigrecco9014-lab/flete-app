// export default function Hora() {

//   const hora = new Date().getHours();

//   const saludo =
//     hora < 12
//       ? "¡Buen día"
//       : hora < 20
//       ? "¡Buenas tardes"
//       : "¡Buenas noches";

//   return (
// <h2 className="text-lg font-bold  text-green-600 ">
//       {saludo}, Dani!
//     </h2>
//   );
// }

export default function Hora() {

  const hora = new Date().getHours();

  const usuarioActivo =
    JSON.parse(
      localStorage.getItem(
        "usuarioActivo"
      )
    );

  const nombre =
    usuarioActivo?.nombre || "Usuario";

  const saludo =
    hora < 12
      ? "¡Buen día"
      : hora < 20
      ? "¡Buenas tardes"
      : "¡Buenas noches";

  return (

    <h2
      className="
        text-lg
        font-bold
        text-green-600
      "
    >

      {saludo}, {nombre}! 

    </h2>
  );
}