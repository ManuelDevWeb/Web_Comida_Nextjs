import { useRouter } from "next/router";

// Custom hooks
import useQuiosco from "../hooks/useQuisco";

const pasos = [
  { paso: 1, nombre: "Menu", url: "/" },
  { paso: 2, nombre: "Resumen", url: "/resumen" },
  { paso: 3, nombre: "Datos y Total", url: "/total" },
];

const Pasos = () => {
  // Accediendo a los datos del contexto Quiosco a traves del custom hook useQuiosco()
  const { handleChangePaso, paso } = useQuiosco();

  // Instanciando router
  const router = useRouter();

  const calcularProgreso = () => {
    let valorPorcentaje;

    if (paso === 1) {
      valorPorcentaje = 2.7;
    } else if (paso == 2) {
      valorPorcentaje = 47.5;
    } else {
      valorPorcentaje = 100;
    }

    return valorPorcentaje;
  };

  return (
    <>
      <div className="flex justify-between mb-5">
        {
          // Iterando sobre pasos
          pasos.map((paso) => (
            <button
              key={paso.paso}
              className="text-2xl font-bold"
              onClick={
                // Redirecciona al dar click en el button
                () => {
                  router.push(paso.url), handleChangePaso(paso.paso);
                }
              }
            >
              {paso.nombre}
            </button>
          ))
        }
      </div>

      <div className="bg-gray-100 mb-10">
        <div
          className="rounded-full bg-amber-500 text-xs leading-none h-2 text-center text-white"
          style={{ width: `${calcularProgreso()}%` }}
        ></div>
      </div>
    </>
  );
};

export default Pasos;
