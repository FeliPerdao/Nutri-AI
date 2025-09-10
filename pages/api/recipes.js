import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { ingredients } = req.body;
  if (!ingredients || ingredients.length === 0) {
    return res.status(400).json({ error: "No ingredients provided" });
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `Sos un chef que crea recetas nutritivas y simples.
Tengo estos ingredientes: ${ingredients.join(", ")}.
Armame una receta clara, paso a paso, con TÍTULO separado, ingredientes y preparación.
Devuelve el título en la primera línea así: "Título: ..."`; 

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    // Separar título de contenido
    let title = "Receta sin título";
    let content = text;
    const titleMatch = text.match(/^Título:\s*(.*)$/m);
    if (titleMatch) {
      title = titleMatch[1].trim();
      content = text.replace(titleMatch[0], "").trim();
    }

    res.status(200).json({ title, content });
  } catch (error) {
    console.error("Error en /api/recipes:", error);

    // --- Fallback ---
    const fallbackTitle = `Ensalada rápida de ${ingredients.join(", ")}`;
    const fallbackContent = `
Ingredientes:
- ${ingredients.join("\n- ")}
- Aceite de oliva
- Sal y pimienta

Preparación:
1. Lavá y cortá los ingredientes en trozos pequeños.
2. Mezclalos en un bowl grande.
3. Condimentá con aceite de oliva, sal y pimienta al gusto.
4. Serví y disfrutá de una comida fresca y nutritiva. 🥗
`;

    res.status(200).json({
      title: fallbackTitle,
      content: fallbackContent,
      error: "Usando fallback por error en Gemini",
    });
  }
}
