import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { ingredients } = req.body;
  if (!ingredients) {
    return res.status(400).json({ error: "No ingredients provided" });
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `Sos un chef que crea recetas creativas y simples. 
    Tengo estos ingredientes: ${ingredients}. Armame una receta.`;

    const result = await model.generateContent(prompt);

    const text = result.response.text();

    res.status(200).json({ recipe: text });
  } catch (error) {
    console.error("Error en /api/recipes:", error);
    res.status(500).json({ error: error.message });
  }
}
