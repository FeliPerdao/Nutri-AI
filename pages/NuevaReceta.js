import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useCart } from "../context/CartContext";

export default function NuevaReceta() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false); 
  const router = useRouter();
  const { cart } = useCart();

  const generarReceta = async () => {
    if (cart.length === 0) {
      alert("La heladera está vacía. Agregá algo primero!");
      return;
    }

    setLoading(true); 
    try {
      const response = await fetch("/api/recipes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ingredients: cart.map((i) => i.name) }),
      });

      const data = await response.json();
      setTitle(data.title);
      setContent(data.content);

      localStorage.setItem(
        "ultimaReceta",
        JSON.stringify({ title: data.title, content: data.content })
      );
    } catch (error) {
      console.error("Error al generar receta:", error);
      alert("Ocurrió un error al generar la receta.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    generarReceta();
  }, [cart]);

  const handleGuardarReceta = () => {
    const guardadas =
      JSON.parse(localStorage.getItem("recetasGuardadas")) || [];
    const nueva = { id: Date.now(), title, content };
    localStorage.setItem(
      "recetasGuardadas",
      JSON.stringify([...guardadas, nueva])
    );
    alert("Receta guardada! 🍽️");
  };

  return (
    <div className="container">
      <h1>Receta Sugerida</h1>

      {loading && <p>Generando receta...</p>}

      {!loading && content ? (
        <>
          <h2>{title}</h2>
          <pre style={{ whiteSpace: "pre-wrap" }}>{content}</pre>

          <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
            <button onClick={handleGuardarReceta}>Guardar Receta</button>
            <button onClick={generarReceta}>Generar Nueva Receta</button>
            <button onClick={() => router.push("/lista")}>
              Volver a la Lista de Ingredientes
            </button>
          </div>
        </>
      ) : (
        !loading && <p>No hay receta generada todavía.</p>
      )}
    </div>
  );
}
