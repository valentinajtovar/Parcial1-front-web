"use client";

import { useState } from "react";

export default function CreateAuthorPage() {
  const [birthDate, setBirthDate] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [name, setName] = useState("");

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [authors, setAuthors] = useState([]);

  const validateForm = () => {
    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = "El nombre es obligatorio.";
    }

    if (!birthDate.trim()) {
      newErrors.birthDate = "La fecha de nacimiento es obligatoria.";
    }

    if (!description.trim()) {
      newErrors.description = "La descripción es obligatoria.";
    }

    if (!image.trim()) {
      newErrors.image = "La imagen es obligatoria.";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSuccessMessage("");

    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    const newAuthor = {
      birthDate,
      description,
      image,
      name,
    };

    try {
      const response = await fetch("http://127.0.0.1:8080/api/authors", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newAuthor),
      });

      if (!response.ok) {
        throw new Error("No se pudo crear el autor.");
      }

      const createdAuthor = await response.json();

      setAuthors((prevAuthors) => [...prevAuthors, createdAuthor]);

      setBirthDate("");
      setDescription("");
      setImage("");
      setName("");
      setErrors({});
      setSuccessMessage("Autor creado correctamente.");
    } catch (error) {
      setErrors({ api: error.message });
    }
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#081225",
        padding: "40px 20px",
        fontFamily: "Arial, sans-serif",
        color: "white",
      }}
    >
      <div
        style={{
          maxWidth: "600px",
          margin: "0 auto",
          background: "#15233b",
          padding: "30px",
          borderRadius: "12px",
          boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
        }}
      >
        <h1 style={{ marginBottom: "24px", textAlign: "center" }}>
          Crear Autor
        </h1>

        <form onSubmit={handleSubmit} noValidate>
          <div style={{ marginBottom: "18px" }}>
            <label htmlFor="name">Nombre</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              aria-invalid={errors.name ? "true" : "false"}
              aria-describedby={errors.name ? "name-error" : undefined}
              style={inputStyle}
            />
            {errors.name && (
              <p id="name-error" style={errorStyle}>
                {errors.name}
              </p>
            )}
          </div>

          <div style={{ marginBottom: "18px" }}>
            <label htmlFor="birthDate">Fecha de nacimiento</label>
            <input
              id="birthDate"
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              aria-invalid={errors.birthDate ? "true" : "false"}
              aria-describedby={errors.birthDate ? "birthDate-error" : undefined}
              style={inputStyle}
            />
            {errors.birthDate && (
              <p id="birthDate-error" style={errorStyle}>
                {errors.birthDate}
              </p>
            )}
          </div>

          <div style={{ marginBottom: "18px" }}>
            <label htmlFor="description">Descripción</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              aria-invalid={errors.description ? "true" : "false"}
              aria-describedby={
                errors.description ? "description-error" : undefined
              }
              style={{ ...inputStyle, minHeight: "100px", resize: "vertical" }}
            />
            {errors.description && (
              <p id="description-error" style={errorStyle}>
                {errors.description}
              </p>
            )}
          </div>

          <div style={{ marginBottom: "18px" }}>
            <label htmlFor="image">URL de la imagen</label>
            <input
              id="image"
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              aria-invalid={errors.image ? "true" : "false"}
              aria-describedby={errors.image ? "image-error" : undefined}
              style={inputStyle}
            />
            {errors.image && (
              <p id="image-error" style={errorStyle}>
                {errors.image}
              </p>
            )}
          </div>

          {errors.api && <p style={errorStyle}>{errors.api}</p>}

          {successMessage && (
            <p
              aria-live="polite"
              style={{ color: "#37e88f", marginBottom: "16px" }}
            >
              {successMessage}
            </p>
          )}

          <button type="submit" style={buttonStyle}>
            Crear autor
          </button>
        </form>
      </div>
    </main>
  );
}

const inputStyle = {
  width: "100%",
  marginTop: "8px",
  padding: "12px",
  borderRadius: "8px",
  border: "1px solid #3b4d6b",
  background: "#0f1b2d",
  color: "white",
  fontSize: "1rem",
};

const buttonStyle = {
  width: "100%",
  padding: "12px",
  background: "transparent",
  color: "#37e88f",
  border: "1px solid #37e88f",
  borderRadius: "8px",
  cursor: "pointer",
  fontSize: "1rem",
};

const errorStyle = {
  color: "#ff6b6b",
  marginTop: "6px",
  fontSize: "0.9rem",
};