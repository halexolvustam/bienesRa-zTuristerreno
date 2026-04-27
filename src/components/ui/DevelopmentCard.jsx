import React from "react";

export default function DevelopmentCard({ id, title, description, images = [] }) {
  const phone = "5215566545971";

  // Mensaje dinámico (mejorado)
  const message = encodeURIComponent(
    `Hola, me interesa ${title} (ID: ${id}). 
Estoy evaluando inversión y me gustaría conocer disponibilidad, esquema y detalles.`
  );

  const whatsappUrl = `https://wa.me/${phone}?text=${message}`;

  // TRACKING (seguro para producción)
  const handleWhatsAppClick = () => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "click_whatsapp", {
        event_category: "lead",
        event_label: title,
      });

      window.gtag("event", "conversion", {
        send_to: "AW-10936994474/XXXXXXXXX", // ← reemplaza después
      });
    }
  };

  return (
    <div style={{ marginBottom: "40px" }}>
      <h2 style={{ fontSize: "22px", fontWeight: "bold", marginBottom: "10px" }}>
        {title}
      </h2>

      <p style={{ marginBottom: "15px" }}>{description}</p>

      {/* GALERÍA */}
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "15px" }}>
        {images.length > 0 ? (
          images.map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`${title}-${i}`}
              style={{
                width: "150px",
                height: "100px",
                objectFit: "cover",
                borderRadius: "6px",
              }}
            />
          ))
        ) : (
          <p style={{ color: "#999" }}>Sin imágenes disponibles</p>
        )}
      </div>

      {/* BOTÓN WHATSAPP */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleWhatsAppClick}
        style={{
          display: "inline-block",
          backgroundColor: "#16a34a",
          color: "white",
          padding: "10px 16px",
          borderRadius: "8px",
          textDecoration: "none",
          fontWeight: "600",
        }}
      >
        Solicitar información completa
      </a>
    </div>
  );
}