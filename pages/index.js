import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import Cart from "../components/Cart";

export default function Home() {
  const { addToCart, cart } = useCart();
  const [options, setOptions] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Pide a la IA opciones saludables
  useEffect(() => {
    fetch("/api/options")
      .then(res => res.json())
      .then(data => setOptions(data.options));
  }, []);

  const handleGenerateRecipe = async () => {
    if (cart.length === 0) {
      alert("La heladera está vacía. Agregá algo primero!");
      return;
    }

    const response = await fetch("/api/recipes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ingredients: cart.map(i => i.name) }),
    });

    const data = await response.json();
    alert("Receta generada:\n\n" + data.recipe);
  };

  return (
    <div>
      <h1>Opciones Saludables</h1>
      <div className="options-grid">
        {options.map((opt, i) => (
          <div key={i} className="option-card">
            <h3>{opt.name}</h3>
            <p>{opt.description}</p>
            <button onClick={() => addToCart(opt)}>Agregar a heladera</button>
          </div>
        ))}
      </div>

      <div style={{ marginTop: "20px" }}>
        <button onClick={handleGenerateRecipe}>Generar Receta</button>
        <button onClick={() => setIsCartOpen(true)}>Ver Heladera</button>
      </div>

      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
}
