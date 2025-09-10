import { CartProvider } from "../context/CartContext";
import Header from "../components/Header";
import "./styles/global.css";

function MyApp({ Component, pageProps }) {
  return (
    // TODO lo que esté dentro de CartProvider podrá usar useCart()
    <CartProvider>
      <Header />
      <Component {...pageProps} />
    </CartProvider>
  );
}

export default MyApp;
