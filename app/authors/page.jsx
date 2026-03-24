"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import AuthorFilters from "../../components/authorFilter";


export default function AuthorsPage() {
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://127.0.0.1:8080/api/authors/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("No se pudo eliminar el autor.");
      }

      setAuthors((prevAuthors) =>
        prevAuthors.filter((author) => author.id !== id)
      );
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8080/api/authors");
        if (!response.ok) {
          throw new Error("Error fetching authors");
        }

        const data = await response.json();
        setAuthors(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAuthors();
  }, []);

  if (loading) return <p style={{ color: "white" }}>Cargando autores...</p>;
  if (error) return <p style={{ color: "white" }}>Error: {error}</p>;

  return (
    //funcion prueba
    
    <main
      style={{
        minHeight: "100vh",
        background: "#081225",
        padding: "40px 24px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      
      
      <h1
        style={{
          color: "white",
          textAlign: "center",
          marginBottom: "32px",
          fontSize: "2rem",
        }}
      >
        Autores
      </h1>
       <section style={{ marginBottom: "24px" }}>
        <AuthorFilters authors={authors} onOrderChange={setAuthors} />
      </section>

      {authors.length === 0 ? (
        <p style={{ color: "white", textAlign: "center" }}>
          No hay autores registrados.
        </p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "24px",
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          {authors.map((author) => (
            <div
              key={author.id}
              style={{
                background: "#15233b",
                borderRadius: "12px",
                overflow: "hidden",
                boxShadow: "0 8px 20px rgba(0,0,0,0.35)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <img
                src={
                  author.image ||
                  "https://via.placeholder.com/400x240.png?text=Author"
                }
                alt={author.name}
                style={{
                  width: "100%",
                  height: "220px",
                  objectFit: "cover",
                  display: "block",
                }}
              />

              <div style={{ padding: "20px" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "14px",
                  }}
                >
                  <span
                    style={{
                      color: "#3df29f",
                      fontSize: "0.72rem",
                      fontWeight: "bold",
                      letterSpacing: "1px",
                      textTransform: "uppercase",
                    }}
                  >
                    {author.category || "Author"}
                  </span>

                  <span
                    style={{
                      color: "#6f7f9a",
                      fontSize: "0.75rem",
                    }}
                  >
                    ID: {author.id}
                  </span>
                </div>

                <h2
                  style={{
                    color: "white",
                    margin: "0 0 8px 0",
                    fontSize: "1.8rem",
                  }}
                >
                  {author.name}
                </h2>

                <p
                  style={{
                    color: "#7f8da8",
                    margin: "0 0 14px 0",
                    fontSize: "0.85rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}
                >
                  Born: {author.birthDate || author.birthYear || "Unknown"}
                </p>

                <p
                  style={{
                    color: "#aab4c5",
                    lineHeight: "1.6",
                    fontSize: "0.95rem",
                    marginBottom: "20px",
                    minHeight: "72px",
                  }}
                >
                  {author.description || "No description available for this author."}
                </p>

                <div style={{ display: "flex", gap: "10px" }}>
                  <Link
                    href={`/editar/${author.id}`}
                    style={{
                      flex: 1,
                      textAlign: "center",
                      padding: "12px",
                      background: "transparent",
                      color: "#37e88f",
                      border: "1px solid #37e88f",
                      borderRadius: "8px",
                      cursor: "pointer",
                      textDecoration: "none",
                    }}
                  >
                    Editar
                  </Link>

                  <button
                    onClick={() => handleDelete(author.id)}
                    style={{
                      flex: 1,
                      padding: "12px",
                      background: "transparent",
                      color: "#ff6b6b",
                      border: "1px solid #ff6b6b",
                      borderRadius: "8px",
                      cursor: "pointer",
                      fontSize: "1rem",
                    }}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}