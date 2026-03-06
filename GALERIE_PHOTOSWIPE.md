# Galerie carrousel avec Embla + PhotoSwipe

## Changements effectués

### 1. Carrousel avec swipe (Embla Carousel)

**Bibliothèque** : `embla-carousel-react` v8.6.0

**Fonctionnalités** :
- ✅ Swipe fluide sur mobile et desktop
- ✅ Drag libre (pas de snap forcé)
- ✅ Boutons de navigation (‹ ›)
- ✅ Touch-friendly avec `touch-action: pan-y`
- ✅ Curseur grab/grabbing
- ✅ Performance optimale (pas de re-render inutile)

### 2. Lightbox avec PhotoSwipe

**Bibliothèque** : `photoswipe` v5.4.4

**Fonctionnalités** :
- ✅ Navigation intuitive avec flèches et clavier
- ✅ Thumbnails en bas (natif PhotoSwipe)
- ✅ Support vidéos HTML5
- ✅ Zoom sur les photos
- ✅ Swipe sur mobile
- ✅ Léger et performant
- ✅ Accessible (ARIA, clavier)

### 3. Avantages du carrousel

**Avant** : Scroll horizontal natif
- Pas de feedback visuel
- Pas de boutons de navigation
- Moins intuitif

**Après** : Carrousel Embla
- Swipe fluide et naturel
- Boutons de navigation visibles
- Drag libre (pas de contrainte)
- Meilleure UX mobile et desktop

## Structure

```tsx
<div className="day-gallery-carousel">
  {/* Header avec titre et boutons */}
  <div className="day-gallery-carousel__header">
    <span>X médias</span>
    <div>
      <button onClick={scrollPrev}>‹</button>
      <button onClick={scrollNext}>›</button>
    </div>
  </div>

  {/* Viewport Embla */}
  <div ref={emblaRef}>
    <div ref={galleryRef}>
      {photos.map(photo => (
        <div className="day-gallery-carousel__slide">
          <a href={photo.src} data-pswp-...>
            <Image ... />
          </a>
        </div>
      ))}
    </div>
  </div>
</div>
```

## Configuration Embla

```typescript
const [emblaRef, emblaApi] = useEmblaCarousel({
  align: 'start',           // Alignement au début
  containScroll: 'trimSnaps', // Pas de slides vides
  dragFree: true,           // Drag libre (pas de snap)
});
```

## Utilisation

### Ajouter des photos/vidéos

```typescript
// Photo
{
  type: "photo",
  src: "/photos/jour-1/photo-1.jpg",
  alt: "Description",
  caption: "Légende optionnelle",
  width: 1200,
  height: 800
}

// Vidéo
{
  type: "video",
  src: "/videos/jour-1/video-1.mp4",
  alt: "Description",
  poster: "/videos/jour-1/poster.jpg",
  duration: 45, // secondes
  width: 1920,
  height: 1080
}
```

### Tailles recommandées

**Miniatures carrousel** :
- Desktop : 240x180px
- Mobile : 200x150px

**Lightbox** :
- Photos : 1200-1920px de largeur
- Vidéos : 1080p ou 720p (MP4 H.264)

## Avantages

1. **Swipe naturel** : Embla offre un swipe fluide et réactif
2. **Navigation claire** : Boutons ‹ › toujours visibles
3. **Performance** : Pas de re-render, optimisé pour mobile
4. **Accessible** : Support clavier, ARIA, focus management
5. **Léger** : Embla (8kb) + PhotoSwipe (20kb) = 28kb total

## Fichiers modifiés

- `src/components/livre/DayGallery.tsx` - Carrousel Embla + PhotoSwipe
- `src/app/globals.css` - Styles carrousel
- `package.json` - Ajout de `embla-carousel-react@8.6.0`
