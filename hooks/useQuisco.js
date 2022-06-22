import { useContext } from "react";

// Contexto (Permite acceder al contexto)
import QuioscoContext from "../context/QuioscoProvider";

const useQuiosco = () => {
  return useContext(QuioscoContext);
};

export default useQuiosco;
