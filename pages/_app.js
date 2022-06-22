// Provider (Permite a los hijos tener acceso al state)
import { QuioscoProvider } from "../context/QuioscoProvider";

// Styles
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <QuioscoProvider>
      <Component {...pageProps} />
    </QuioscoProvider>
  );
}

export default MyApp;
