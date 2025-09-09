import { useState } from "react";

export default function Home() {
  const [ingredients, setIngredients] = useState("");
  const [recipe, setRecipe] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setRecipe("Cargando...");

    const res = await fetch("/api/recipes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ingredients }),
    });

    const data = await res.json();
    setRecipe(data.recipe);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-4">NutriAI 🍳</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          placeholder="Ej: tomate, arroz, pollo"
          className="border p-2 mr-2"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Generar receta
        </button>
      </form>
      <div className="w-full max-w-md">
        <pre className="whitespace-pre-wrap bg-gray-100 p-4 rounded">
          {recipe}
        </pre>
      </div>
    </div>
  );
}
