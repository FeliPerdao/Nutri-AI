import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export default async function handler(req, res) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `Genera exactamente 5 INGREDIENTES saludables en formato JSON.
Cada ingrediente debe tener:
- "name": una sola palabra (ej: "Zanahoria", "Manzana", "Quinoa")
- "description": una breve descripción de por qué es saludable.

Ejemplo:
[
  { "name": "Zanahoria", "description": "Fuente de betacarotenos y vitamina A" },
  { "name": "Quinoa", "description": "Cereal rico en proteínas y aminoácidos esenciales" }
]`;

    const result = await model.generateContent(prompt);
    let text = result.response.text();

    // limpiar posibles ```json o ```
    text = text.replace(/```json|```/g, "").trim();

    let options = [];
    try {
      options = JSON.parse(text);
    } catch (err) {
      console.error("Error al parsear JSON de Gemini:", text);
      return res
        .status(500)
        .json({ error: "Gemini devolvió algo que no era JSON válido." });
    }

    res.status(200).json({ options });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
