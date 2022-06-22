import { useState, useEffect, createContext } from "react";

// Creando el contexto (Permite acceder al contexto)
const QuioscoContext = createContext();

// Provider (Permite a los hijos tener acceso al state)
const QuioscoProvider = ({ children }) => {
  return (
    <QuioscoContext.Provider value={{}}>{children}</QuioscoContext.Provider>
  );
};

export { QuioscoProvider };

export default QuioscoContext;
