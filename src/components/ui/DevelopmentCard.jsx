import React from "react";

export default function DevelopmentCard({ id, title, description, images }) {
  const phone = "5215566545971";

  const message = encodeURIComponent(
  `Hola, me interesa información de ${title} (ID: ${id})`
);

const whatsappUrl = `https://wa.me/${phone}?text=${message}`;
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
  href={whatsappUrl}
  target="_blank"
  rel="noopener noreferrer"
>
Me gustaría recibir información completa, disponibilidad y esquema de inversión.

</a>
    </div>
  );
}
