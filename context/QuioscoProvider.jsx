import { useState, useEffect, createContext } from "react";
import { useRouter } from "next/router";
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
  // const [paso, setPaso] = useState(1);
  // State para manejar el nombre
  const [nombre, setNombre] = useState("");
  // State para manejar el total a pagar
  const [total, setTotal] = useState(0);

  const router = useRouter();

  // Los useEffect se ejecutan en orden

  // UseEffect que se ejecuta cuando carga el componente
  useEffect(() => {
    obtenerCategorias();
  }, []);

  // UseEffect que se ejecuta cada que cambia las categorias
  useEffect(() => {
    setCategoriaActual(categorias[0]);
  }, [categorias]);

  // UseEffect que se ejecuta cada que cambia el pedido
  useEffect(() => {
    // Calculando total a pagar
    const nuevoTotal = pedido.reduce(
      (total, producto) => producto.precio * producto.cantidad + total,
      0
    );
    setTotal(nuevoTotal);
  }, [pedido]);

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
    setCategoriaActual(categoria[0]);
    // Redireccionamos
    router.push("/");
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
  const handleAgregarPedido = ({ categoriaId, ...producto }) => {
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
  // const handleChangePaso = (paso) => {
  //   setPaso(paso);
  // };

  // Funcion para editar cantidad
  const handleEditarCantidades = (id) => {
    // Filtrando el producto que coincida con el id
    const productoActualizar = pedido.filter((producto) => producto.id === id);
    setProducto(productoActualizar[0]);
    setModal(!modal);
  };

  // Funcion para eliminar producto del pedido
  const handleEliminarProducto = (id) => {
    // Filtrando el producto que coincida con el id
    const pedidoActualizado = pedido.filter((producto) => producto.id !== id);
    setPedido(pedidoActualizado);
  };

  // Funcion para enviar la orden (Asincrona puesto interacciona con la base de datos)
  const colocarOrden = async (e) => {
    e.preventDefault();

    // Conexion hacia el backend para agregar la orden a la DB
    try {
      // Hacemos peticion al metodo post y le enviamos los datos
      // Las llaves que enviamos deben corresponder al esquema de la DB
      await axios.post("/api/ordenes", {
        pedido,
        nombre,
        total,
        fecha: Date.now().toString(),
      });

      // Resetear la APP (Volver los states a su estado inicial, mostrar alerta y redireccionar)
      // Actualizamos State categoria actual
      setCategoriaActual(categorias[0]);
      // Actualizamos State pedido
      setPedido([]);
      // Actualizamos State nombre
      setNombre("");
      // Actualizamos State total
      setTotal(0);

      // Notificacion de toast
      toast.success("Pedido Realizado Correctamente");

      // Redireccionamos a la pagina principal
      setTimeout(() => {
        router.push("/");
      }, 3000);
    } catch (error) {
      console.log(error);
    }

    // console.log("Enviando", total);
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
        // paso,
        // handleChangePaso,
        handleEditarCantidades,
        handleEliminarProducto,
        nombre,
        setNombre,
        colocarOrden,
        total,
      }}
    >
      {children}
    </QuioscoContext.Provider>
  );
};

export { QuioscoProvider };

export default QuioscoContext;
