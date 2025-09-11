import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";

export default function ListaCompras() {
  const { addToCart } = useCart();
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState([]);
  const [customItem, setCustomItem] = useState("");
  const [historial, setHistorial] = useState(new Set()); // ingredientes ya mostrados
  const [loading, setLoading] = useState(false); // 🔥 nuevo estado

  // Cargar opciones desde la API evitando repetidos
  const cargarOpciones = () => {
    setLoading(true); // empezamos carga
    fetch("/api/options")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data.options)) {
          // filtrar repetidos
          const nuevas = data.options.filter((opt) => !historial.has(opt.name));

          if (nuevas.length > 0) {
            setOptions(nuevas);
            setHistorial((prev) => {
              const actualizado = new Set(prev);
              nuevas.forEach((opt) => actualizado.add(opt.name));
              return actualizado;
            });
          } else {
            setOptions([]);
          }
        } else {
          console.error("Respuesta inesperada:", data);
        }
      })
      .catch((err) => console.error("Error al cargar opciones:", err))
      .finally(() => setLoading(false)); // siempre terminamos la carga
  };

  useEffect(() => {
    cargarOpciones();
  }, []);

  const handleToggle = (itemName) => {
    setSelected((prev) =>
      prev.includes(itemName)
        ? prev.filter((i) => i !== itemName)
        : [...prev, itemName]
    );
  };

  const handleAddSelectedToCart = () => {
    selected.forEach(
      (name) => addToCart({ id: name, name }) // usamos name como id
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

      {/* Mensaje de cargando arriba de la lista actual */}
      {loading && <p>Cargando ingredientes...</p>}

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
        !loading && <p>Ya no hay más opciones nuevas disponibles 🎉</p>
      )}

      {/* Botón Otras Opciones */}
      <button
        onClick={cargarOpciones}
        style={{ marginTop: "20px", marginRight: "10px" }}
      >
        🔄 Otras opciones
      </button>

      <button onClick={handleAddSelectedToCart} style={{ marginTop: "20px" }}>
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
