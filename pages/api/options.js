import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export default async function handler(req, res) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `Genera 20 INGREDIENTES saludables, variados y disponibilidad en Argentina.
Cada ingrediente debe tener:
- "id": un identificador único en minúsculas y sin espacios (ej: "zanahoria", "chia")
- "name": el nombre visible del ingrediente (ej: "Merluza", "Chía", "Avena")
- "description": una breve explicación de por qué es saludable.

No repitas ingredientes comunes como tomate, lechuga, zanahoria o espinaca.
Formato: JSON válido, sin texto extra. Ejemplo:
[
  { "id": "miso", "name": "Merluza", "description": "Bajas calorías, proteína y omega-3" },
  { "id": "chia", "name": "Chía", "description": "Semillas ricas en omega-3 y fibra" }
]`;

    const result = await model.generateContent(prompt);
    let text = result.response.text();

    // limpiar posibles ```json o ```
    text = text.replace(/```json|```/g, "").trim();

    let options = [];
    try {
      options = JSON.parse(text);

      // eliminar duplicados por id
      const seen = new Set();
      options = options.filter((o) => {
        if (!o.id) return false;
        if (seen.has(o.id)) return false;
        seen.add(o.id);
        return true;
      });

      // elegir 5 random
      options = options.sort(() => 0.5 - Math.random()).slice(0, 5);
    } catch (err) {
      console.error("Error al parsear JSON de Gemini:", text, err);
      // fallback si Gemini devuelve JSON inválido
      options = [
        {
          id: "quinoa",
          name: "Quinoa",
          description: "Cereal rico en proteínas y aminoácidos esenciales",
        },
        {
          id: "miso",
          name: "Miso",
          description: "Fermentado rico en probióticos y proteínas vegetales",
        },
        {
          id: "chia",
          name: "Chía",
          description: "Semillas ricas en omega-3 y fibra",
        },
        {
          id: "bokchoy",
          name: "Bok Choy",
          description: "Verdura asiática rica en vitaminas A, C y K",
        },
        {
          id: "almendras",
          name: "Almendras",
          description: "Fuente de grasas saludables, proteínas y magnesio",
        },
      ];
    }

    res.status(200).json({ options });
  } catch (err) {
    console.error("Error en /api/options:", err);

    // fallback si Gemini no responde (ej: cuota excedida)
    const fallbackOptions = [
      {
        id: "quinoa",
        name: "Quinoa",
        description: "Cereal rico en proteínas y aminoácidos esenciales",
      },
      {
        id: "miso",
        name: "Miso",
        description: "Fermentado rico en probióticos y proteínas vegetales",
      },
      {
        id: "chia",
        name: "Chía",
        description: "Semillas ricas en omega-3 y fibra",
      },
      {
        id: "bokchoy",
        name: "Bok Choy",
        description: "Verdura asiática rica en vitaminas A, C y K",
      },
      {
        id: "almendras",
        name: "Almendras",
        description: "Fuente de grasas saludables, proteínas y magnesio",
      },
    ];

    res.status(200).json({
      options: fallbackOptions,
      error: "Usando fallback por error en Gemini",
    });
  }
}
