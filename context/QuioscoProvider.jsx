import { useState, useEffect, createContext } from "react";
// Axios
import axios from "axios";
// React Toastify (toast permite llamar el toast)
import { toast } from "react-toastify";

// Creando el contexto (Permite acceder al contexto)
const QuioscoContext = createContext();

// Provider (Permite a los hijos tener acceso al state)
const QuioscoProvider = ({ children }) => {
  // State para manejar las categorias
  const [categorias, setCategorias] = useState([]);
  // State para manejar la categoria actual
  const [categoriaActual, setCategoriaActual] = useState({});
  // State para manejar el producto actual
  const [producto, setProducto] = useState({});
  // State para manejar el modal
  const [modal, setModal] = useState(false);
  // State para manejar el pedido
  const [pedido, setPedido] = useState([]);
  // State para manejar el paso
  const [paso, setPaso] = useState(1);

  // Los useEffect se ejecutan en orden

  // UseEffect que se ejecuta cuando carga el componente
  useEffect(() => {
    obtenerCategorias();
  }, []);

  useEffect(() => {
    setCategoriaActual(categorias[0]);
  }, [categorias]);

  // Funcion para consultar las categorias de la API
  const obtenerCategorias = async () => {
    // Obteniendo las categorias
    const { data } = await axios.get("/api/categorias");
    // Actualizamos el state categorias
    setCategorias(data);
  };

  // Funcion para actualizar el state de categoria actual
  const handleClickCategoria = (id) => {
    // Filtrando la categoria que coincida con la que viene desde la accion
    const categoria = categorias.filter((cat) => cat.id === id);
    // Actualizamos el state de categoriaActual
    // console.log(categoria)
    setCategoriaActual(categoria[0]);
  };

  // Funcion para actualizar el state de producto
  const handleClickProducto = (producto) => {
    setProducto(producto);
  };

  // Funcion para actualizar el state del modal
  const handleChangeModal = () => {
    setModal(!modal);
  };

  // Funcion para actualizar el state de pedido
  // Sacamos copia de producto sin categoriaId y imagen
  const handleAgregarPedido = ({ categoriaId, imagen, ...producto }) => {
    // Comprobar si el producto agregado ya esta en el state pedido
    if (pedido.some((productoState) => productoState.id === producto.id)) {
      // Actualizamos la cantidad
      const pedidoActualizado = pedido.map((productoState) =>
        productoState.id === producto.id ? producto : productoState
      );
      setPedido(pedidoActualizado);

      // Llamando la alerta de toast
      toast.success("Guardado correctamente");
    } else {
      // Como no existe, lo agregamos al state
      setPedido([...pedido, producto]);

      // Llamando la alerta toast
      toast.success("Agregado al pedido", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }

    setModal(false);
  };

  // Funcion para actualizar el state de paso
  const handleChangePaso = (paso) => {
    setPaso(paso);
  };

  return (
    <QuioscoContext.Provider
      value={{
        categorias,
        handleClickCategoria,
        categoriaActual,
        producto,
        handleClickProducto,
        modal,
        handleChangeModal,
        handleAgregarPedido,
        pedido,
        paso,
        handleChangePaso,
      }}
    >
      {children}
    </QuioscoContext.Provider>
  );
};

export { QuioscoProvider };

export default QuioscoContext;
