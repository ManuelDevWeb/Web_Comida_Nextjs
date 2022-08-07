// Layout
import Layout from "../layout/Layout";
// Components
import ResumenProducto from "../components/ResumenProducto";
// Custom hook
import useQuiosco from "../hooks/useQuisco";

export default function Resumen() {
  // Accediendo a los datos del contexto Quiosco a traves del custom hook useQuiosco()
  const { pedido } = useQuiosco();

  return (
    <Layout pagina="Resumen">
      <h1 className="text-4xl font-black">Resumen</h1>
      <p className="text-2xl my-10">Revisa tu pedido</p>

      {pedido.length === 0 ? (
        <p className="text-center text-2xl">No hay productos en tu pedido 😔</p>
      ) : (
        pedido.map((producto) => (
          <ResumenProducto key={producto.id} producto={producto} />
        ))
      )}
    </Layout>
  );
}
