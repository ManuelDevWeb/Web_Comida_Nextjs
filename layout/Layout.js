import Modal from "react-modal";
import Head from "next/head";
// React Toastify (Permite registrar el toast donde se va a mostrar)
import { ToastContainer } from "react-toastify";

// Custom hook
import useQuiosco from "../hooks/useQuisco";
// Components
import Sidebar from "../components/Sidebar";
import ModalProducto from "../components/ModalProducto";
import Pasos from "../components/Pasos";

import "react-toastify/dist/ReactToastify.css";

// Styles Modal
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%,-50%)",
  },
};

// Se le envia el id principal del html
Modal.setAppElement("#__next");

export default function Layout({ children, pagina }) {
  // Accediendo a los datos del contexto Quiosco a traves del custom hook useQuioso()
  const { modal, handleChangeModal } = useQuiosco();

  return (
    <>
      {/* Head dinamico para mejorar SEO */}
      <Head>
        <title>Café - {pagina}</title>
        <meta name="description" content="Web Cafeteria" />
      </Head>

      <div className="md:flex">
        <aside className="md:w-4/12 xl:w-1/4 2xl:w-1/5 h-screen">
          <Sidebar />
        </aside>

        {/* overflow-y-scroll permite que el el componente aside se mantenga aun cuando hagamos scroll en este componente */}
        <main className="md:w-8/12 xl:w-3/4 2xl:w-4/5 h-screen overflow-y-scroll">
          <div className="p-10">
            <Pasos />
            {/* Componente hijo */}
            {children}
          </div>
        </main>
      </div>

      {
        // Modal
        modal && (
          <Modal isOpen={modal} style={customStyles}>
            <ModalProducto />
          </Modal>
        )
      }

      <ToastContainer />
    </>
  );
}
