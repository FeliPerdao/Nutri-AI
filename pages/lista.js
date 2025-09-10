import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";

export default function ListaCompras() {
  const { addToCart } = useCart();
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState([]);
  const [customItem, setCustomItem] = useState("");

  // Cargar opciones desde la API
  useEffect(() => {
    fetch("/api/options")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data.options)) {
          setOptions(data.options);
        } else {
          console.error("Respuesta inesperada:", data);
        }
      })
      .catch((err) => console.error("Error al cargar opciones:", err));
  }, []);

  const handleToggle = (itemName) => {
    setSelected((prev) =>
      prev.includes(itemName)
        ? prev.filter((i) => i !== itemName)
        : [...prev, itemName]
    );
  };

  const handleAddSelectedToCart = () => {
    selected.forEach((name) =>
      addToCart({ id: name, name }) // usamos name como id
    );
    setSelected([]);
  };

  const handleAddCustomItem = () => {
    if (customItem.trim() !== "") {
      addToCart({ id: customItem.trim(), name: customItem.trim() });
      setCustomItem("");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Lista de Compras Saludables</h1>

      {/* Validación y renderizado seguro */}
      {Array.isArray(options) && options.length > 0 ? (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {options.map((opt, idx) => (
            <li key={idx}>
              <input
                type="checkbox"
                checked={selected.includes(opt.name)}
                onChange={() => handleToggle(opt.name)}
              />
              <strong>{opt.name}</strong> - {opt.description}
            </li>
          ))}
        </ul>
      ) : (
        <p>No se encontraron opciones saludables.</p>
      )}

      <button onClick={handleAddSelectedToCart} style={{ marginTop: "10px" }}>
        Añadir seleccionados a la heladera
      </button>

      <hr style={{ margin: "20px 0" }} />

      {/* Campo para productos manuales */}
      <h3>Agregar producto personalizado</h3>
      <input
        type="text"
        value={customItem}
        onChange={(e) => setCustomItem(e.target.value)}
        placeholder="Ej: Zanahoria"
        style={{ marginRight: "10px" }}
      />
      <button onClick={handleAddCustomItem}>Añadir a la heladera</button>
    </div>
  );
}
