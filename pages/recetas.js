import { useEffect, useState } from "react";

export default function Recetas() {
  const [recetas, setRecetas] = useState([]);
  const [selected, setSelected] = useState(null); // receta seleccionada para el modal

  useEffect(() => {
    const guardadas =
      JSON.parse(localStorage.getItem("recetasGuardadas")) || [];
    setRecetas(guardadas);
  }, []);

  return (
    <div style={{ padding: "20px" }}>
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
              onClick={() => setSelected(r)}
              style={{
                cursor: "pointer",
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "10px",
                width: "200px",
                boxShadow: "2px 2px 6px rgba(0,0,0,0.1)",
                transition: "transform 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.05)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            >
              <h3>{r.title}</h3>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
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
            style={{
              backgroundColor: "#fff",
              padding: "20px",
              borderRadius: "10px",
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
          </div>
        </div>
      )}
    </div>
  );
}
