import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useCart } from "../context/CartContext";

export default function NuevaReceta() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const router = useRouter();
  const { cart } = useCart();

  // Generar receta automáticamente al entrar
  useEffect(() => {
    const generar = async () => {
      if (cart.length === 0) {
        alert("La heladera está vacía. Agregá algo primero!");
        return;
      }

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
      }
    };

    generar();
  }, [cart]);

  const handleGuardarReceta = () => {
    const guardadas = JSON.parse(localStorage.getItem("recetasGuardadas")) || [];

    const nueva = { id: Date.now(), title, content };
    localStorage.setItem("recetasGuardadas", JSON.stringify([...guardadas, nueva]));

    alert("Receta guardada! 🍽️");
  };

  const handleGenerarNueva = async () => {
    if (cart.length === 0) {
      alert("La heladera está vacía. Agregá algo primero!");
      return;
    }

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
      console.error("Error al generar nueva receta:", error);
      alert("Ocurrió un error al generar la receta.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Receta Sugerida</h1>

      {content ? (
        <>
          <h2>{title}</h2>
          <pre style={{ whiteSpace: "pre-wrap" }}>{content}</pre>

          <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
            <button onClick={handleGuardarReceta}>Guardar Receta</button>
            <button onClick={handleGenerarNueva}>Generar Nueva Receta</button>
            <button onClick={() => router.push("/lista")}>
              Volver a la Lista de Ingredientes
            </button>
          </div>
        </>
      ) : (
        <p>No hay receta generada todavía.</p>
      )}
    </div>
  );
}
