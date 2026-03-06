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
  const day = useDay(serializedDay);

  const isJour = day.isJour();
  const formattedDate = day.getFormattedDate();
  const title = day.getTitle();

  return (
    <div className="day-layout" translate="yes">
      {/* Contenu principal */}
      <article className="day-main">
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
            <span className="day-header__badge">De mémoire</span>
          )}

          <div className="day-header__divider" />
        </header>

        {/* Lieu de départ (mobile uniquement) */}
        {isJour && day.from && (
          <div className="day-place-mobile">
            <PlaceCard place={day.from} type="departure" />
          </div>
        )}

        {/* Stats compactes (mobile uniquement) */}
        {day.hasStats() && (
          <div className="day-stats-mobile">
            <DayStats stats={day.stats!} compact />
          </div>
        )}

        {/* Lieu de départ */}
        {day.from && (
          <div className="day-sidebar__section">
            <PlaceCard place={day.from} type="departure" />
          </div>
        )}

        {/* Texte principal */}
        <ProseContent content={day.content} />

        {/* Lieu d'arrivée */}
        {isJour && day.to && (
          <div className="day-place-arrival">
            <PlaceCard place={day.to} type="arrival" />
          </div>
        )}

        {/* Galerie photos */}
        {day.hasPhotos() && <DayGallery photos={day.photos} />}

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

      {/* Sidebar (desktop uniquement) */}
      {isJour && (day.hasMap() || day.hasStats() || day.from) && (
        <aside className="day-sidebar">
          <div className="day-sidebar__sticky">
            {/* Stats */}
            {day.hasStats() && (
              <div className="day-sidebar__section">
                <DayStats stats={day.stats!} />
              </div>
            )}

            {/* Carte et dénivelé */}
            {day.hasMap() && (
              <div className="day-sidebar__section">
                <DayMap day={day} />
              </div>
            )}
          </div>
        </aside>
      )}
    </div>
  );
}
