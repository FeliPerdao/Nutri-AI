import { CartProvider } from "../context/CartContext";
import Header from "../components/Header";
import "./styles/global.css";

function MyApp({ Component, pageProps }) {
  return (
    <CartProvider>
      <Header />
      <Component {...pageProps} />
    </CartProvider>
  );
}

export default MyApp;
