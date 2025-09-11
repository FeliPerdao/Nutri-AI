import Link from "next/link";
import { GiFruitBowl, GiCookingPot } from "react-icons/gi";
import { useRouter } from "next/router";
import Cart from "./Cart";
import { useCart } from "../context/CartContext";

const Header = () => {
  const router = useRouter();
  const { openCart } = useCart();

  return (
    <header className="header">
      <h1 className="logo">🥗 Nutri-AI</h1>

      <nav>
        <ul className="nav-list">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/recetas">Recetas</Link>
          </li>
          <li>
            <Link href="/lista">Lista de Ingredientes</Link>
          </li>
          <li>
            <Link href="/acerca">Contacto</Link>
          </li>
          <li>
            <button onClick={() => router.push("/NuevaReceta")}>
              <GiCookingPot size={20} /> Generar Receta
            </button>
          </li>
          <li>
            <button onClick={openCart}>
              <GiFruitBowl size={24} />
            </button>
          </li>
        </ul>
      </nav>

      <Cart />
    </header>
  );
};

export default Header;
