import { useState } from "react";
import Link from "next/link";
import { GiFruitBowl } from "react-icons/gi";
import { FaUtensils } from "react-icons/fa";
import { GiCookingPot } from "react-icons/gi";
import { useRouter } from "next/router";
import Cart from "./Cart";

const Header = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const router = useRouter();

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
            alignItems: "center",
          }}
        >
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
            <button
              style={{ display: "flex", alignItems: "center", gap: "5px" }}
              onClick={() => router.push("/NuevaReceta")}
            >
              <GiCookingPot size={20} /> Generar Receta
            </button>
          </li>
          <li>
            <button
              style={{ display: "flex", alignItems: "center", gap: "5px" }}
              onClick={() => setIsCartOpen(true)}
              
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
