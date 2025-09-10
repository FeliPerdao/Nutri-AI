import { useState } from "react";
import Link from "next/link";
import { GiFruitBowl } from "react-icons/gi"; // cambiamos a icono heladera
import Cart from "./Cart";

const Header = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 20px",
        backgroundColor: "#f5f5f5",
      }}
    >
      <h1 style={{ margin: 0 }}>🍽️ Mi Cocina Saludable</h1>
      <nav>
        <ul
          style={{
            display: "flex",
            listStyle: "none",
            gap: "20px",
            margin: 0,
            padding: 0,
          }}
        >
          <li>
            <Link href="/recetas">Recetas</Link>
          </li>
          <li>
            <Link href="/lista">Lista de Compras</Link>
          </li>
          <li>
            <Link href="/acerca">Acerca de</Link>
          </li>
          <li>
            <button
              onClick={() => setIsCartOpen(true)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
              }}
            >
              <GiFruitBowl size={24} color="#4caf50" />
            </button>
          </li>
        </ul>
      </nav>

      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </header>
  );
};

export default Header;
