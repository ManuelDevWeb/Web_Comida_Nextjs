import { useEffect, useCallback } from "react";

// Layout
import Layout from "../layout/Layout";
// Custom Hook
import useQuiosco from "../hooks/useQuisco";
// Helpers
import { formatearDinero } from "../helpers";

export default function Total() {
  // Accediendo a los valores del contexto Quiosco a traves del custom hook useQuiosco()
  const { pedido, nombre, setNombre, colocarOrden, total } = useQuiosco();

  // Funcion que retorna true si el pedido no tiene productos
  const comprobarPedido = useCallback(() => {
    return pedido.length === 0 || nombre === "" || nombre.length < 3;
  }, [pedido, nombre]);

  // Use effect que se ejecuta cada que cambie el pedido
  useEffect(() => {
    comprobarPedido();
  }, [pedido, comprobarPedido]);

  return (
    <Layout pagina="Total y Confirmar Pedido">
      <h1 className="text-4xl font-black">Total y Confirmar Pedido</h1>
      <p className="text-2xl my-10 mb-2">Confirma tu Pedido a Continuacion</p>

      <form
        // Funcion que ejecuta al hacer submit al formulario
        onSubmit={colocarOrden}
      >
        <div className="mt-10">
          <label
            htmlFor="nombre"
            className="block uppercase text-slate-800 font-bold text-xl"
          >
            Nombre:
          </label>
          <input
            id="nombbre"
            type="text"
            className="bg-gray-200 w-full lg:w-1/3 mt-3 rounded-md p-2"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>

        <div className="mt-10">
          <p className="text-2xl">
            Total a pagar {""}{" "}
            <span className="font-bold">{formatearDinero(total)}</span>{" "}
          </p>
        </div>

        <div className="mt-5">
          <input
            type="submit"
            className={`${
              comprobarPedido()
                ? "bg-indigo-100"
                : "bg-indigo-600 hover:bg-indigo-800"
            } w-full lg:w-auto px-5 py-2 uppercase rounded font-bold text-white text-center`}
            value="Confirmar Pedido"
            // Comprobar pedido retorna true o false, este valor deshabilita y habilita el boton
            disabled={comprobarPedido()}
          />
        </div>
      </form>
    </Layout>
  );
}
