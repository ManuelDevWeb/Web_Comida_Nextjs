import Image from "next/image";

// Helpers
import { formatearDinero } from "../helpers";
// Custom hooks
import useQuiosco from "../hooks/useQuisco";

const Producto = ({ producto }) => {
  const { nombre, imagen, precio } = producto;

  // Accediendo a los datos del contexto Quiosco a traves del custom hook useQuiosco()
  const { handleClickProducto, handleChangeModal } = useQuiosco();

  return (
    <div className="border p-3">
      <Image
        src={`/assets/img/${imagen}.jpg`}
        alt={`Imagen platillo ${nombre}`}
        width={400}
        height={500}
      />
      <div className="p-5">
        <h3 className="text-2xl font-bold">{nombre}</h3>

        <p className="mt-5 font-black text-4xl text-amber-500">
          {formatearDinero(precio)}
        </p>

        <button
          type="button"
          className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold"
          onClick={() => {
            handleChangeModal(), handleClickProducto(producto);
          }}
        >
          Agregar
        </button>
      </div>
    </div>
  );
};

export default Producto;
