import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export default async function handler(req, res) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `Genera exactamente 5 INGREDIENTES saludables en formato JSON.
Cada ingrediente debe tener:
- "id": un identificador único (ej: "zanahoria", "manzana")
- "name": una sola palabra (ej: "Zanahoria", "Manzana", "Quinoa")
- "description": una breve descripción de por qué es saludable.

Ejemplo:
[
  { "id": "zanahoria", "name": "Zanahoria", "description": "Fuente de vitamina A y betacarotenos" },
  { "id": "quinoa", "name": "Quinoa", "description": "Cereal rico en proteínas y aminoácidos esenciales" }
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
      // fallback si Gemini devuelve cualquier cosa rara
      options = [
        { id: "tomate", name: "Tomate", description: "Rico en antioxidantes y vitamina C" },
        { id: "zanahoria", name: "Zanahoria", description: "Fuente de vitamina A y betacarotenos" },
        { id: "quinoa", name: "Quinoa", description: "Cereal rico en proteínas y aminoácidos esenciales" },
        { id: "palta", name: "Palta", description: "Grasas saludables y fibra" },
        { id: "espinaca", name: "Espinaca", description: "Rica en hierro y vitaminas A, C y K" },
      ];
    }

    res.status(200).json({ options });
  } catch (err) {
    console.error("Error en /api/options:", err);

    // fallback si Gemini no responde (ej: cuota excedida)
    const fallbackOptions = [
      { id: "tomate", name: "Tomate", description: "Rico en antioxidantes y vitamina C" },
      { id: "zanahoria", name: "Zanahoria", description: "Fuente de vitamina A y betacarotenos" },
      { id: "quinoa", name: "Quinoa", description: "Cereal rico en proteínas y aminoácidos esenciales" },
      { id: "palta", name: "Palta", description: "Grasas saludables y fibra" },
      { id: "espinaca", name: "Espinaca", description: "Rica en hierro y vitaminas A, C y K" },
    ];

    res.status(200).json({ options: fallbackOptions, error: "Usando fallback por error en Gemini" });
  }
}
