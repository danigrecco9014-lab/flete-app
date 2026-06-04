
import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import {
  CalendarDays,
  MapPin,
  User,
  Store,
  Truck,
  BadgeDollarSign,
  Building2,
  Wallet,
  ArrowUp,
} from "lucide-react";

import { collection, getDocs } from "firebase/firestore";

import { db } from "../firebase/firebase";

import NavMenu from "../Components/NavMenu";

const Calendario = () => {

  const [selectedDate, setSelectedDate] =
    useState(new Date());

  const [pedidos, setPedidos] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  // =========================
  // TRAER PEDIDOS
  // =========================

  useEffect(() => {

    const fetchPedidos = async () => {

      setLoading(true);

      try {

        const pedidosCol =
          collection(db, "idPedido");

        const snapshot =
          await getDocs(pedidosCol);

        const todos =
          snapshot.docs.map((doc) => {

            const data = doc.data();

            let fechaPedido = "";

            if (
              data.fecha &&
              typeof data.fecha.toDate ===
                "function"
            ) {

              const fechaLocal =
                data.fecha.toDate();

              fechaPedido =
                fechaLocal.getFullYear() +
                "-" +
                String(
                  fechaLocal.getMonth() + 1
                ).padStart(2, "0") +
                "-" +
                String(
                  fechaLocal.getDate()
                ).padStart(2, "0");

            } else if (
              typeof data.fecha === "string"
            ) {

              fechaPedido =
                data.fecha.slice(0, 10);
            }

            return {
              id: doc.id,
              ...data,
              fecha: fechaPedido,
            };
          });

        setPedidos(todos);

      } catch (error) {

        console.error(
          "Error al traer pedidos:",
          error
        );

      } finally {

        setLoading(false);
      }
    };

    fetchPedidos();

  }, []);

  // =========================
  // FECHA SELECCIONADA
  // =========================

  const selectedDateStr =
    selectedDate.getFullYear() +
    "-" +
    String(
      selectedDate.getMonth() + 1
    ).padStart(2, "0") +
    "-" +
    String(
      selectedDate.getDate()
    ).padStart(2, "0");

  const pedidosDelDia =
    pedidos.filter(
      (p) => p.fecha === selectedDateStr
    );

  // =========================
  // DIAS CON PEDIDOS
  // =========================

  const tileContent = ({
    date,
    view,
  }) => {

    if (view === "month") {

      const dateStr =
        date.getFullYear() +
        "-" +
        String(
          date.getMonth() + 1
        ).padStart(2, "0") +
        "-" +
        String(
          date.getDate()
        ).padStart(2, "0");

      const hayPedidos =
        pedidos.some(
          (p) => p.fecha === dateStr
        );

      return hayPedidos ? (
        <div
          className="
            w-2
            h-2
            bg-blue-500
            rounded-full
            mx-auto
            mt-1
          "
        />
      ) : null;
    }
  };

  // =========================
  // FORMATO FECHA
  // =========================

  const opcionesFecha = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const fechaFormateada =
    selectedDate.toLocaleDateString(
      "es-AR",
      opcionesFecha
    );

  const fechaConMayuscula =
    fechaFormateada.charAt(0)
      .toUpperCase() +
    fechaFormateada.slice(1);

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
  // JSX
  // =========================

  return (

    <div className="min-h-screen bg-gray-100 pb-28">

      {/* HEADER
      // bg-gradient-to-r
          // from-blue-600
          // to-indigo-600
       */}
      <div
        className="
          
          px-5
          pt-8
          pb-10
          rounded-b-[35px]
          shadow-lg
        "
      >

        <div className="flex items-center gap-3">

          <div
            className="
              bg-white/20
              p-3
              rounded-2xl
              backdrop-blur-sm
            "
          >

            <CalendarDays
              className="text-white"
              size={28}
            />

          </div>

          <div>

            <h1
              className="
                text-3xl
                font-bold
                text-white
              "
            >

              Calendario

            </h1>

            <p
              className="
                text-blue-100
                text-sm
              "
            >

              Gestión de pedidos diarios

            </p>
          </div>
        </div>
      </div>

      {/* CALENDARIO */}
      <div className="px-4 -mt-6">

        <div
          className="
            bg-white
            rounded-[30px]
            shadow-lg
            p-4
          "
        >

          <Calendar
            onChange={setSelectedDate}
            value={selectedDate}
            locale="es-AR"
            tileContent={tileContent}
            className="
              w-full
              border-0
              custom-calendar
            "
          />
        </div>

        {/* FECHA */}
        <div className="mt-6 mb-4">

          <h2
            className="
              text-2xl
              font-bold
              text-gray-800
            "
          >

            {fechaConMayuscula}

          </h2>

          <p className="text-gray-500">

            {pedidosDelDia.length} pedido
            {pedidosDelDia.length !== 1 &&
              "s"}{" "}
            programado
            {pedidosDelDia.length !== 1 &&
              "s"}

          </p>
        </div>

        {/* LOADING */}
        {loading ? (

          <div className="flex justify-center mt-10">

            <div
              className="
                animate-spin
                rounded-full
                h-12
                w-12
                border-4
                border-blue-500
                border-t-transparent
              "
            />

          </div>

        ) : pedidosDelDia.length > 0 ? (

          <div className="space-y-4 mb-8">

            {pedidosDelDia.map(
              (pedido) => {

                const comision =
                  Number(
                    pedido.comision
                  ) || 0;

                const envio =
                  Number(
                    pedido.costo_envio
                  ) || 0;

                const escaleras =
                  Number(
                    pedido.escaleras
                  ) || 0;

                const fondo =
                  Number(
                    pedido.aportadoAlFondo
                  ) || 0;

                const montoPersona1 =
                  Number(
                    pedido.montoPersona1
                  ) || 0;

                const montoPersona2 =
                  Number(
                    pedido.montoPersona2
                  ) || 0;

                return (

                  <div
                    key={pedido.id}
                    className="
                      bg-white
                      rounded-[28px]
                      p-5
                      shadow-sm
                      border
                      border-gray-100
                    "
                  >

                    {/* CLIENTE */}
                    <div className="mb-5">

                      <div className="flex items-center gap-2 mb-1">

                        <User
                          size={18}
                          className="text-blue-600"
                        />

                        <p
                          className="
                            text-sm
                            text-gray-400
                          "
                        >

                          Cliente

                        </p>
                      </div>

                      <h3
                        className="
                          text-xl
                          font-bold
                          text-gray-800
                        "
                      >

                        {pedido.cliente}

                      </h3>
                    </div>

                    {/* INFO */}
                    <div className="space-y-4">

                      {/* DIRECCION */}
                      <div className="flex items-start gap-3">

                        <MapPin
                          size={18}
                          className="
                            text-gray-400
                            mt-1
                          "
                        />

                        <div>

                          <p
                            className="
                              text-xs
                              text-gray-400
                            "
                          >

                            Dirección

                          </p>

                          <p className="font-medium">

                            {
                              pedido.direccion
                            }

                          </p>
                        </div>
                      </div>

                      {/* ELECTRODOMESTICO */}
                      <div className="flex items-start gap-3">

                        <Truck
                          size={18}
                          className="
                            text-gray-400
                            mt-1
                          "
                        />

                        <div>

                          <p
                            className="
                              text-xs
                              text-gray-400
                            "
                          >

                            Electrodoméstico

                          </p>

                          <p className="font-medium">

                            {
                              pedido.electrodomestico
                            }

                          </p>
                        </div>
                      </div>

                      {/* LOCAL */}
                      <div className="flex items-start gap-3">

                        <Store
                          size={18}
                          className="
                            text-gray-400
                            mt-1
                          "
                        />

                        <div>

                          <p
                            className="
                              text-xs
                              text-gray-400
                            "
                          >

                            Local

                          </p>

                          <p className="font-medium">

                            {pedido.local}

                          </p>
                        </div>
                      </div>
                    </div>

                    {/* CARDS DINERO */}
                    <div
                      className="
                        mt-5
                        grid
                        grid-cols-2
                        gap-3
                      "
                    >

                      {/* COMISION */}
                      {comision > 0 && (

                        <div
                          className="
                            bg-green-50
                            rounded-2xl
                            p-3
                          "
                        >

                          <div className="flex items-center gap-2 mb-1">

                            <BadgeDollarSign
                              size={16}
                              className="text-green-600"
                            />

                            <p
                              className="
                                text-xs
                                text-green-700
                              "
                            >

                              Comisión

                            </p>
                          </div>

                          <p
                            className="
                              font-bold
                              text-green-700
                            "
                          >

                            {formatPrecio(
                              comision
                            )}

                          </p>
                        </div>
                      )}

                      {/* ENVIO */}
                      {envio > 0 && (

                        <div
                          className="
                            bg-blue-50
                            rounded-2xl
                            p-3
                          "
                        >

                          <div className="flex items-center gap-2 mb-1">

                            <Truck
                              size={16}
                              className="text-blue-600"
                            />

                            <p
                              className="
                                text-xs
                                text-blue-700
                              "
                            >

                              Envío

                            </p>
                          </div>

                          <p
                            className="
                              font-bold
                              text-blue-700
                            "
                          >

                            {formatPrecio(
                              envio
                            )}

                          </p>
                        </div>
                      )}

                      {/* ESCALERAS */}
                      {escaleras > 0 && (

                        <div
                          className="
                            bg-orange-50
                            rounded-2xl
                            p-3
                          "
                        >

                          <div className="flex items-center gap-2 mb-1">

                            <Building2
                              size={16}
                              className="text-orange-600"
                            />

                            <p
                              className="
                                text-xs
                                text-orange-700
                              "
                            >

                              Escaleras

                            </p>
                          </div>

                          <p
                            className="
                              font-bold
                              text-orange-700
                            "
                          >

                            {formatPrecio(
                              escaleras
                            )}

                          </p>
                        </div>
                      )}

                      {/* FONDO */}
                      {fondo > 0 && (

                        <div
                          className="
                            bg-purple-50
                            rounded-2xl
                            p-3
                          "
                        >

                          <div className="flex items-center gap-2 mb-1">

                            <Wallet
                              size={16}
                              className="text-purple-600"
                            />

                            <p
                              className="
                                text-xs
                                text-purple-700
                              "
                            >

                              Fondo

                            </p>
                          </div>

                          <p
                            className="
                              font-bold
                              text-purple-700
                            "
                          >

                            {formatPrecio(
                              fondo
                            )}

                          </p>
                        </div>
                      )}
                    </div>

                    {/* DETALLE PERSONAS */}
                    {(pedido.persona1 ||
                      pedido.persona2) && (

                      <div
                        className="
                          mt-5
                          bg-gray-50
                          rounded-3xl
                          p-4
                        "
                      >

                        <div className="flex items-center gap-2 mb-4">

                          <User
                            size={18}
                            className="text-gray-700"
                          />

                          <h4
                            className="
                              font-bold
                              text-gray-800
                            "
                          >

                            Ganancias por persona

                          </h4>
                        </div>

                        <div className="space-y-3">

                          {/* PERSONA 1 */}
                          {pedido.persona1 &&
                            montoPersona1 > 0 && (

                              <div
                                className="
                                  bg-white
                                  rounded-2xl
                                  p-3
                                  border
                                  border-gray-100
                                "
                              >

                                <div className="flex justify-between items-center">

                                  <div>

                                    <p
                                      className="
                                        font-semibold
                                        text-gray-800
                                      "
                                    >

                                      {
                                        pedido.persona1
                                      }

                                    </p>

                                    <p
                                      className="
                                        text-xs
                                        text-gray-400
                                      "
                                    >

                                      Ganancia

                                    </p>
                                  </div>

                                  <p
                                    className="
                                      font-bold
                                      text-green-600
                                    "
                                  >

                                    {formatPrecio(
                                      montoPersona1
                                    )}

                                  </p>
                                </div>
                              </div>
                            )}

                          {/* PERSONA 2 */}
                          {pedido.persona2 &&
                            montoPersona2 > 0 && (

                              <div
                                className="
                                  bg-white
                                  rounded-2xl
                                  p-3
                                  border
                                  border-gray-100
                                "
                              >

                                <div className="flex justify-between items-center">

                                  <div>

                                    <p
                                      className="
                                        font-semibold
                                        text-gray-800
                                      "
                                    >

                                      {
                                        pedido.persona2
                                      }

                                    </p>

                                    <p
                                      className="
                                        text-xs
                                        text-gray-400
                                      "
                                    >

                                      Ganancia

                                    </p>
                                  </div>

                                  <p
                                    className="
                                      font-bold
                                      text-green-600
                                    "
                                  >

                                    {formatPrecio(
                                      montoPersona2
                                    )}

                                  </p>
                                </div>
                              </div>
                            )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              }
            )}
          </div>

        ) : (

          <div
            className="
              bg-white
              rounded-[28px]
              p-10
              text-center
              shadow-sm
              mt-6
            "
          >

            <CalendarDays
              size={48}
              className="
                mx-auto
                text-gray-300
                mb-4
              "
            />

            <h3
              className="
                text-xl
                font-bold
                text-gray-700
              "
            >

              No hay pedidos

            </h3>

            <p className="text-gray-500 mt-1">

              No existen pedidos para esta fecha

            </p>
          </div>
        )}
      </div>

      <NavMenu />

    </div>
  );
};

export default Calendario;