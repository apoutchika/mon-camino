"use client";

import { useState } from "react";
import Image from "next/image";
import type { Place } from "@/domain";

interface Props {
  place: Place;
  type: "departure" | "arrival";
}

export function PlaceCard({ place, type }: Props) {
  const [stampOpen, setStampOpen] = useState(false);

  const isDeparture = type === "departure";
  const label = isDeparture ? "Départ" : "Arrivée";
  const color = isDeparture ? "var(--forest)" : "var(--rust)";

  return (
    <>
      <div
        className="place-card"
        style={{
          border: `1.5px solid ${color}`,
          borderRadius: "12px",
          padding: "1rem 1.25rem",
          background: "var(--sand)",
          display: "flex",
          gap: "1rem",
          alignItems: "center",
        }}
      >
        {/* Tampon de crédential */}
        {place.hasStamp() && (
          <button
            onClick={() => setStampOpen(true)}
            style={{
              all: "unset",
              cursor: "pointer",
              flexShrink: 0,
              width: "80px",
              height: "100px",
              position: "relative",
              borderRadius: "8px",
              overflow: "hidden",
              border: "1px solid var(--line)",
              background: "var(--white)",
              transition: "transform 0.2s var(--ease)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
            }}
            aria-label={`Voir le tampon de ${place.name}`}
          >
            <Image
              src={place.stamp!}
              alt={`Tampon de crédential - ${place.name}`}
              fill
              sizes="100px"
              style={{ objectFit: "contain" }}
            />
          </button>
        )}

        {/* Informations */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              fontSize: "0.6875rem",
              fontFamily: "var(--font-sans)",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color,
              fontWeight: 500,
              marginBottom: "0.375rem",
            }}
          >
            {label}
          </div>

          <div
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "1.125rem",
              fontWeight: 600,
              color: "var(--ink)",
              marginBottom: "0.25rem",
            }}
          >
            {place.name}
          </div>

          <div
            style={{
              fontSize: "0.875rem",
              color: "var(--stone)",
              marginBottom: place.hasLink() ? "0.5rem" : 0,
            }}
          >
            {place.city}
          </div>

          {place.hasLink() && (
            <a
              href={place.link}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.375rem",
                fontSize: "0.8125rem",
                color,
                textDecoration: "none",
                fontFamily: "var(--font-sans)",
                fontWeight: 500,
                transition: "opacity 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = "0.7";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = "1";
              }}
            >
              Voir l'hébergement
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                style={{ flexShrink: 0 }}
              >
                <path
                  d="M1 11L11 1M11 1H3M11 1V9"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          )}
        </div>
      </div>

      {/* Lightbox pour le tampon */}
      {stampOpen && place.hasStamp() && (
        <div
          onClick={() => setStampOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            background: "rgba(43, 35, 24, 0.92)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "2rem",
            cursor: "zoom-out",
            animation: "fadeIn 0.2s ease-out",
          }}
        >
          <button
            onClick={() => setStampOpen(false)}
            style={{
              position: "absolute",
              top: "1.5rem",
              right: "1.5rem",
              background: "rgba(255, 255, 255, 0.9)",
              border: "none",
              borderRadius: "50%",
              width: "40px",
              height: "40px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              fontSize: "1.5rem",
              color: "var(--ink)",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255, 255, 255, 1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255, 255, 255, 0.9)";
            }}
            aria-label="Fermer"
          >
            ✕
          </button>

          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: "relative",
              maxWidth: "90vw",
              maxHeight: "90vh",
              background: "var(--white)",
              borderRadius: "8px",
              padding: "1rem",
              boxShadow: "0 20px 60px rgba(0, 0, 0, 0.4)",
            }}
          >
            <Image
              src={place.stamp!}
              alt={`Tampon de crédential - ${place.name}`}
              width={600}
              height={600}
              style={{
                maxWidth: "80vw",
                maxHeight: "80vh",
                width: "auto",
                height: "auto",
                objectFit: "contain",
              }}
            />
            <div
              style={{
                marginTop: "0.75rem",
                textAlign: "center",
                fontSize: "0.875rem",
                color: "var(--stone)",
                fontFamily: "var(--font-sans)",
              }}
            >
              Tampon de crédential — {place.name}
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </>
  );
}
