import { useState, useEffect, createContext } from "react";
import axios from "axios";

// Creando el contexto (Permite acceder al contexto)
const QuioscoContext = createContext();

// Provider (Permite a los hijos tener acceso al state)
const QuioscoProvider = ({ children }) => {
  // State para manejar las categorias
  const [categorias, setCategorias] = useState([]);
  // State para manejar la categoria actual
  const [categoriaActual, setCategoriaActual] = useState({});

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

  return (
    <QuioscoContext.Provider
      value={{ categorias, handleClickCategoria, categoriaActual }}
    >
      {children}
    </QuioscoContext.Provider>
  );
};

export { QuioscoProvider };

export default QuioscoContext;
