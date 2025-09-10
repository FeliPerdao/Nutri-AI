import { useRouter } from "next/router";
import { GiFruitBowl } from "react-icons/gi";

export default function Home() {
  const router = useRouter();

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>🍳 Bienvenido al Generador de Recetas</h1>
      <p style={{ marginTop: "20px", fontSize: "18px" }}>Instrucciones:</p>
      <ul
        style={{
          textAlign: "left",
          maxWidth: "600px",
          margin: "20px auto",
          fontSize: "16px",
        }}
      >
        <li>
          1. Prepará una lista de ingredientes que tenés disponbiles para
          cocinar hoy. Podés escribir los ingredientes o seleccionar sugerencias
          de AI.
        </li>
        <li>
          2. Apretá el botón <b>Generar Receta</b> para obtener una receta
          automáticamente.
        </li>
        <li>
          3. Si querés, podés guardar la receta, generar una nueva o volver a
          cambiar los ingredientes.
        </li>
        <li>
          4. En cualquier momento podés ver los ingredientes disponibles en la
          heladera con el botón <GiFruitBowl color="#4caf50" />.
        </li>
      </ul>

      <button
        style={{
          marginTop: "30px",
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
        }}
        onClick={() => router.push("/lista")}
      >
        Ir a la Lista de Ingredientes
      </button>
      <p
        style={{
          marginTop: "40px",
          fontSize: "14px",
          color: "gray",
          maxWidth: "600px",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        ⚠️ Esta página utiliza servicios gratuitos de Gemini AI. Si se excede la
        cuota de IA generativa, se devolverá una receta de ensalada con
        ingredientes repetidos como fallback.
      </p>
    </div>
  );
}
