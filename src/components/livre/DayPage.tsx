"use client";

import type { SerializedDay, PageNavigation } from "@/domain";
import { useDay } from "@/domain";
import Link from "next/link";
import { DayStats } from "./DayStats";
import { DayMap } from "./DayMap";
import { DayGallery } from "./DayGallery";
import { ProseContent } from "./ProseContent";
import { PlaceCard } from "./PlaceCard";

interface Props {
  day: SerializedDay;
  nav: PageNavigation;
}

export function DayPage({ day: serializedDay, nav }: Props) {
  // Reconstruire l'entité Day côté client
  const day = useDay(serializedDay);

  const isJour = day.isJour();
  const formattedDate = day.getFormattedDate();
  const title = day.getTitle();

  return (
    <article className="livre-content animate-slide-up" translate="yes">
      {/* En-tête */}
      <header className="day-header">
        {isJour && day.day && (
          <div className="day-header__eyebrow">Jour {day.day}</div>
        )}

        <h1 className="day-header__title">{title}</h1>

        {formattedDate && (
          <div className="day-header__date">{formattedDate}</div>
        )}

        {day.fromMemory && (
          <span
            style={{
              display: "inline-block",
              fontSize: "0.6875rem",
              fontFamily: "var(--font-sans)",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "var(--muted)",
              border: "1px solid var(--line)",
              borderRadius: "100px",
              padding: "0.2rem 0.625rem",
              marginTop: "0.5rem",
            }}
          >
            De mémoire
          </span>
        )}

        <div className="day-header__divider" />
      </header>

      {/* Carte interactive */}
      {day.hasMap() && <DayMap day={day} />}

      {/* Stats du jour */}
      {day.hasStats() && <DayStats stats={day.stats!} />}

      {/* Lieu de départ */}
      {isJour && day.from && (
        <div style={{ marginBottom: "1.5rem" }}>
          <PlaceCard place={day.from} type="departure" />
        </div>
      )}

      {/* Texte */}
      <ProseContent content={day.content} />

      {/* Galerie */}
      {day.hasPhotos() && <DayGallery photos={day.photos} />}

      {/* Lieu d'arrivée */}
      {isJour && day.to && (
        <div style={{ marginTop: "2.5rem", marginBottom: "2.5rem" }}>
          <PlaceCard place={day.to} type="arrival" />
        </div>
      )}

      {/* Navigation */}
      <nav className="day-nav" aria-label="Navigation entre les journées">
        {nav.prev ? (
          <Link href={`/livre/${nav.prev.slug}`} className="day-nav__link">
            <span className="day-nav__direction">← Précédent</span>
            <span className="day-nav__label">{nav.prev.label}</span>
          </Link>
        ) : (
          <div />
        )}

        {nav.next && (
          <Link
            href={`/livre/${nav.next.slug}`}
            className="day-nav__link day-nav__link--next"
          >
            <span className="day-nav__direction">Suivant →</span>
            <span className="day-nav__label">{nav.next.label}</span>
          </Link>
        )}
      </nav>
    </article>
  );
}
