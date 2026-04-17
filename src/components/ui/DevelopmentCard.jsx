import React from "react";

export default function DevelopmentCard({ title, description, images }) {
  return (
    <div style={{ marginBottom: "40px" }}>
      <h2>{title}</h2>

      <p>{description}</p>

      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        {images.map((img, i) => (
          <img
            key={i}
            src={img}
            alt={title}
            style={{ width: "150px", height: "100px", objectFit: "cover" }}
          />
        ))}
      </div>

      <a
        href="https://wa.me/521XXXXXXXXXX"
        target="_blank"
      >
        Recibir información
      </a>
    </div>
  );
}
