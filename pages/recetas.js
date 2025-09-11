import { useEffect, useState } from "react";

export default function Recetas() {
  const [recetas, setRecetas] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const guardadas =
      JSON.parse(localStorage.getItem("recetasGuardadas")) || [];
    setRecetas(guardadas);
  }, []);

  const handleEliminar = (id) => {
    const nuevas = recetas.filter((r) => r.id !== id);
    setRecetas(nuevas);
    localStorage.setItem("recetasGuardadas", JSON.stringify(nuevas));
    setSelected(null);
  };

  return (
    <div className="container">
      <h1>Mis Recetas Guardadas</h1>

      {recetas.length === 0 ? (
        <p>No hay recetas guardadas.</p>
      ) : (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "20px",
            marginTop: "20px",
          }}
        >
          {recetas.map((r) => (
            <div
              key={r.id}
              className="card"
              onClick={() => setSelected(r)}
              style={{ cursor: "pointer", width: "200px" }}
            >
              <h3>{r.title}</h3>
            </div>
          ))}
        </div>
      )}

      {selected && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.7)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            className="card"
            style={{
              maxWidth: "600px",
              maxHeight: "80%",
              overflowY: "auto",
              position: "relative",
            }}
          >
            <button
              onClick={() => setSelected(null)}
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                background: "none",
                border: "none",
                fontSize: "20px",
                cursor: "pointer",
              }}
            >
              ❌
            </button>
            <h2>{selected.title}</h2>
            <pre style={{ whiteSpace: "pre-wrap", marginTop: "10px" }}>
              {selected.content}
            </pre>
            <button
              onClick={() => handleEliminar(selected.id)}
              style={{ marginTop: "20px", backgroundColor: "red" }}
            >
              🗑️ Eliminar Receta
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
