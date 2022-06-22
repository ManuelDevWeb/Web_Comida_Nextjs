import Image from "next/image";

// Custom hooks
import useQuiosco from "../hooks/useQuisco";
// Components
import Categoria from "./Categoria";

const Sidebar = () => {
  // Accediendo a los datos del contexto Quiosco a traves del custom hook useQuiosco()
  const { categorias } = useQuiosco();

  return (
    <>
      <Image
        width={300}
        height={100}
        src={"/assets/img/logo.svg"}
        alt="imagen logotipo"
      />

      <nav className="mt-10">
        {
          // Iterando sobre categorias
          categorias.map((categoria) => (
            <Categoria key={categoria.id} categoria={categoria} />
          ))
        }
      </nav>
    </>
  );
};

export default Sidebar;
