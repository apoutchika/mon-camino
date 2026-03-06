# Vidéos + Navigation fermable + Message mobile

## 1. Vidéos dans la galerie 🎥

### Fonctionnalité
Photos et vidéos peuvent maintenant être mélangées dans la même galerie.

### Structure des données

```json
{
  "photos": [
    {
      "type": "photo",
      "src": "/images/jour-1/photo-1.jpg",
      "alt": "Vue sur les montagnes",
      "caption": "Lever du soleil"
    },
    {
      "type": "video",
      "src": "/videos/jour-1/video-1.mp4",
      "poster": "/videos/jour-1/video-1-poster.jpg",
      "alt": "Traversée de la rivière",
      "caption": "Moment intense !",
      "duration": 45
    },
    {
      "type": "photo",
      "src": "/images/jour-1/photo-2.jpg",
      "alt": "Coucher de soleil"
    }
  ]
}
```

### Champs

**Pour les photos** :
- `type`: "photo" (optionnel, par défaut)
- `src`: Chemin de l'image
- `alt`: Description
- `caption`: Légende (optionnel)
- `width`, `height`: Dimensions (optionnel)

**Pour les vidéos** :
- `type`: "video" (obligatoire)
- `src`: Chemin de la vidéo (.mp4)
- `poster`: Image de prévisualisation (obligatoire)
- `alt`: Description
- `caption`: Légende (optionnel)
- `duration`: Durée en secondes (optionnel, affiche "1:23")

### Affichage

**Dans la grille** :
- Photos : Image normale
- Vidéos : Poster + icône play ▶️ + durée

**Dans la lightbox** :
- Photos : Image en grand
- Vidéos : Player HTML5 avec contrôles

### Formats vidéo recommandés

**Compression** :
- Résolution : 1080p ou 720p
- Codec : H.264 (MP4)
- Bitrate : 2-5 Mbps
- Durée : 15-60 secondes idéalement

**Outils** :
- HandBrake (gratuit, multi-plateforme)
- FFmpeg : `ffmpeg -i input.mov -c:v libx264 -crf 23 -preset slow -c:a aac -b:a 128k output.mp4`
- Adobe Premiere / Final Cut Pro

**Tailles cibles** :
- 30 sec : 5-10 MB
- 60 sec : 10-20 MB
- 2 min : 20-40 MB

### Poster (image de prévisualisation)

**Création** :
```bash
# Extraire une frame avec FFmpeg
ffmpeg -i video.mp4 -ss 00:00:03 -vframes 1 poster.jpg
```

**Taille** : 1280x720px ou 1920x1080px  
**Format** : JPG optimisé (< 200 KB)

### Organisation des fichiers

```
public/
  videos/
    jour-1/
      video-1.mp4
      video-1-poster.jpg
      video-2.mp4
      video-2-poster.jpg
    jour-2/
      video-1.mp4
      video-1-poster.jpg
```

---

## 2. Navigation fermable 📐

### Fonctionnalité
La sidebar de navigation peut être masquée pour agrandir la zone de contenu et la map.

### Utilisation

**Bouton toggle** :
- Position : En haut à gauche (desktop uniquement)
- Icône : ‹ (fermer) / › (ouvrir)
- Hover : Légère mise en échelle

**Effet** :
- Sidebar glisse vers la gauche
- Contenu principal s'étend sur toute la largeur
- Map devient plus grande
- Bouton toggle suit la sidebar

### Avantages

✅ **Map plus grande** : Meilleure visualisation du parcours  
✅ **Texte plus large** : Lignes plus longues si souhaité  
✅ **Focus** : Moins de distractions  
✅ **Flexible** : On/off à volonté  

### CSS

```css
.page-grid--sidebar-closed {
  grid-template-columns: 0 1fr; /* Sidebar à 0 */
}

.livre-sidebar--closed {
  transform: translateX(-100%); /* Glisse hors écran */
}
```

### État persistant (optionnel)

Si tu veux sauvegarder la préférence :

```typescript
// Dans LivreLayout
const [sidebarOpen, setSidebarOpen] = useState(() => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('sidebarOpen') !== 'false';
  }
  return true;
});

useEffect(() => {
  localStorage.setItem('sidebarOpen', String(sidebarOpen));
}, [sidebarOpen]);
```

---

## 3. Message mobile 📱

### Fonctionnalité
Sur mobile (< 768px), un message avertit que l'expérience est meilleure sur tablette/desktop.

### Affichage

**Overlay plein écran** :
- Fond sombre semi-transparent
- Carte centrée avec :
  - Icône 📱
  - Titre explicatif
  - Description
  - 2 boutons d'action
  - Hint sur l'EPUB

### Actions

**Bouton principal** : "Télécharger l'EPUB"
- Redirige vers `/telechargement`
- Style vert (call-to-action)

**Bouton secondaire** : "Continuer quand même"
- Ferme le message
- Permet d'accéder au contenu

### Pourquoi ?

❌ **Mobile** :
- Écran trop petit pour la map
- Sidebar prend trop de place
- Vidéos consomment de la data
- Expérience dégradée

✅ **Tablette/Desktop** :
- Layout 2 colonnes
- Map confortable
- Sidebar navigation
- Vidéos fluides

✅ **EPUB** :
- Optimisé pour mobile
- Offline
- Léger
- Confort de lecture

### Détection

```typescript
useEffect(() => {
  const isMobile = window.innerWidth < 768;
  setShow(isMobile);
}, []);
```

### Désactivation

Si tu veux désactiver le message :

```typescript
// Dans MobileWarning.tsx
const [show, setShow] = useState(false); // Toujours false
```

---

## 4. Support tablette 📱💻

### Tablette portrait (768px - 1023px)

**Layout** :
- Sidebar en haut (300px max-height, scrollable)
- Contenu en dessous
- Layout 1 colonne

**Pourquoi** :
- Écran trop étroit pour 2 colonnes
- Sidebar accessible en scroll
- Contenu principal prioritaire

### Tablette landscape (≥ 1024px en paysage)

**Layout** :
- Layout 2 colonnes (comme desktop)
- Sidebar plus étroite (320px au lieu de 380px)
- Map adaptée

**Pourquoi** :
- Assez large pour 2 colonnes
- Expérience proche du desktop
- Navigation confortable

### iPad Pro

**Portrait** :
- Layout 2 colonnes (1024px+)
- Sidebar 320px
- Contenu fluide

**Landscape** :
- Layout 2 colonnes
- Sidebar 380px
- Expérience desktop complète

### Tests recommandés

- [ ] iPad (768x1024) portrait
- [ ] iPad (1024x768) landscape
- [ ] iPad Pro 11" (834x1194) portrait
- [ ] iPad Pro 11" (1194x834) landscape
- [ ] iPad Pro 12.9" (1024x1366) portrait
- [ ] iPad Pro 12.9" (1366x1024) landscape

---

## Résumé des breakpoints

| Taille | Layout | Sidebar | Message |
|--------|--------|---------|---------|
| < 768px | Mobile | Masquée | ✅ Affiché |
| 768-1023px | Tablette 1 col | En haut | ❌ Masqué |
| ≥ 1024px | Desktop 2 col | Gauche sticky | ❌ Masqué |

---

## Exemples de données

### Jour avec vidéos

```json
{
  "id": 5,
  "type": "jour",
  "day": 5,
  "photos": [
    {
      "type": "photo",
      "src": "/images/jour-5/matin.jpg",
      "alt": "Départ matinal",
      "caption": "6h du matin, prêt à partir"
    },
    {
      "type": "video",
      "src": "/videos/jour-5/montee.mp4",
      "poster": "/videos/jour-5/montee-poster.jpg",
      "alt": "Montée difficile",
      "caption": "La montée la plus rude du voyage",
      "duration": 42
    },
    {
      "type": "photo",
      "src": "/images/jour-5/sommet.jpg",
      "alt": "Au sommet",
      "caption": "Enfin arrivé !"
    },
    {
      "type": "video",
      "src": "/videos/jour-5/panorama.mp4",
      "poster": "/videos/jour-5/panorama-poster.jpg",
      "alt": "Vue panoramique",
      "caption": "360° au sommet",
      "duration": 28
    }
  ]
}
```

---

## Résumé

✅ **Vidéos** : Mélangées avec photos, player dans lightbox  
✅ **Navigation fermable** : Bouton toggle pour agrandir la map  
✅ **Message mobile** : Redirection vers EPUB ou tablette/desktop  
✅ **Tablette** : Support portrait et landscape  
✅ **Performance** : Lazy loading, posters, compression  

Ton journal est maintenant multimédia et adapté à tous les écrans ! 🎬📱💻
