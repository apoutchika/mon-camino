'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export function MobileWarning() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Détecter mobile (< 768px)
    const isMobile = window.innerWidth < 768;
    setShow(isMobile);
  }, []);

  if (!show) return null;

  return (
    <div className="mobile-warning">
      <div className="mobile-warning__content">
        <div className="mobile-warning__icon">📱</div>
        <h2 className="mobile-warning__title">
          Meilleure expérience sur tablette ou ordinateur
        </h2>
        <p className="mobile-warning__text">
          Ce livre interactif est optimisé pour les écrans plus grands afin de profiter pleinement des cartes, photos et vidéos.
        </p>
        <div className="mobile-warning__actions">
          <button
            onClick={() => setShow(false)}
            className="mobile-warning__button mobile-warning__button--secondary"
          >
            Continuer quand même
          </button>
          <Link
            href="/telechargement"
            className="mobile-warning__button mobile-warning__button--primary"
          >
            Télécharger l'EPUB
          </Link>
        </div>
        <p className="mobile-warning__hint">
          💡 L'EPUB est parfait pour lire sur mobile, liseuse ou tablette
        </p>
      </div>
    </div>
  );
}
