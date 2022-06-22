import { useState, useEffect, createContext } from "react";
import axios from "axios";

// Creando el contexto (Permite acceder al contexto)
const QuioscoContext = createContext();

// Provider (Permite a los hijos tener acceso al state)
const QuioscoProvider = ({ children }) => {
  // State para manejar las categorias
  const [categorias, setCategorias] = useState([]);

  // UseEffect que se ejecuta cuando carga el componente
  useEffect(() => {
    obtenerCategorias();
  }, []);

  // Funcion para consultar las categorias de la API
  const obtenerCategorias = async () => {
    // Obteniendo las categorias
    const { data } = await axios.get("/api/categorias");
    // Actualizamos el state categorias
    setCategorias(data);
  };

  return (
    <QuioscoContext.Provider value={{ categorias }}>
      {children}
    </QuioscoContext.Provider>
  );
};

export { QuioscoProvider };

export default QuioscoContext;
