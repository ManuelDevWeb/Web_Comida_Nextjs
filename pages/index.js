// Layout
import Layout from "../layout/Layout";
// Custom hooks
import useQuiosco from "../hooks/useQuisco";
// Components
import Producto from "../components/Producto";

export default function Home() {
  // Accediento a los datos del contexto Quiosco a traves del custom hook useQuiosco()
  const { categoriaActual } = useQuiosco();

  return (
    <Layout pagina={`Menu ${categoriaActual?.nombre}`}>
      <h1 className="text-4xl font-black">{categoriaActual?.nombre}</h1>
      <p className="text-2xl my-10">
        Elige y personaliza tu pedido a continuacion
      </p>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {
          // Iterando sobre los productos de la categoria actual
          categoriaActual?.productos?.map((producto) => (
            <Producto key={producto.id} producto={producto} />
          ))
        }
      </div>
    </Layout>
  );
}
