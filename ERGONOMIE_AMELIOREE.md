# Amélioration de l'ergonomie - Layout optimisé

## Problème identifié

Sur desktop, trop d'informations avant le contenu principal :
- Carte
- Dénivelé
- Stats
- Lieu de départ

Le lecteur devait scroller beaucoup avant d'arriver au texte.

## Solution implémentée

### Desktop (≥ 1024px) : Layout 2 colonnes

**Colonne principale (gauche)** :
- En-tête (titre, date)
- Texte du journal (prose)
- Photos
- Lieu d'arrivée
- Navigation

**Sidebar fixe (droite)** :
- Lieu de départ
- Stats du jour
- Carte interactive
- Profil altimétrique

La sidebar est sticky, elle reste visible pendant le scroll.

### Mobile (< 1024px) : Layout 1 colonne optimisé

**Ordre optimisé** :
1. En-tête (titre, date)
2. Lieu de départ (compact)
3. Stats compactes (3 colonnes : Distance, D+, D-)
4. Texte du journal
5. Photos
6. Lieu d'arrivée
7. Carte + dénivelé (en bas)
8. Navigation

## Avantages

### Desktop
✅ Contenu principal immédiatement visible  
✅ Informations contextuelles toujours accessibles (sidebar sticky)  
✅ Meilleure utilisation de l'espace horizontal  
✅ Lecture fluide sans interruption  

### Mobile
✅ Stats ultra-compactes (1 ligne)  
✅ Carte en bas (moins prioritaire sur mobile)  
✅ Texte optimisé pour la lecture  
✅ Moins de scroll nécessaire  

## Composants modifiés

### `DayPage.tsx`
- Nouveau layout avec `day-layout`, `day-main`, `day-sidebar`
- Éléments conditionnels selon la taille d'écran
- Sidebar avec sections

### `DayStats.tsx`
- Nouvelle prop `compact?: boolean`
- Version compacte pour mobile (3 colonnes, 1 ligne)
- Version complète pour sidebar desktop

### CSS
- Nouveau fichier `day-layout.css`
- Grid responsive
- Sidebar sticky
- Stats compactes
- Optimisations mobile

## Breakpoints

- **Mobile** : < 640px (optimisations supplémentaires)
- **Tablet** : 640px - 1023px (layout 1 colonne)
- **Desktop** : ≥ 1024px (layout 2 colonnes avec sidebar)

## Sidebar sticky

```css
.day-sidebar__sticky {
  position: sticky;
  top: calc(var(--nav-h) + 2rem);
  max-height: calc(100vh - var(--nav-h) - 4rem);
  overflow-y: auto;
}
```

La sidebar :
- Reste visible pendant le scroll
- Scroll indépendamment si son contenu est trop grand
- S'adapte à la hauteur de la fenêtre

## Stats compactes (mobile)

**Avant** (3 lignes) :
```
Distance du jour
25.5 km
125.5 km total
```

**Après** (1 ligne) :
```
25.5 km    650 m    450 m
Distance     D+       D-
```

Gain d'espace : ~70%

## Carte

**Desktop** :
- Dans la sidebar : 280px de hauteur
- Toujours visible pendant la lecture

**Mobile** :
- En bas de page : 260px de hauteur
- Après le texte et les photos
- Moins prioritaire sur petit écran

## Optimisations mobile supplémentaires

### Typographie
- Titres légèrement plus petits
- Prose à 1.0625rem (au lieu de 1.1875rem)
- Line-height réduit à 1.7

### Espacements
- Padding réduit (1.5rem au lieu de 2rem)
- Marges optimisées
- Gaps réduits

### Interactions
- Touch-friendly (boutons plus grands)
- Pas de hover states
- Scroll naturel

## Accessibilité

✅ **Navigation au clavier** : Tab, Enter  
✅ **Lecteurs d'écran** : Structure sémantique  
✅ **Responsive** : Fonctionne sur tous les écrans  
✅ **Performance** : Pas de JavaScript lourd  

## Performance

### Desktop
- Sidebar sticky : CSS pur (pas de JS)
- Scroll fluide
- Pas de reflow

### Mobile
- Moins d'éléments chargés initialement
- Images lazy-loaded
- CSS optimisé

## Comparaison avant/après

### Desktop - Avant
```
[En-tête]
[Lieu départ]
[Stats]
[Carte]
[Dénivelé]
[Texte] ← Commence ici après beaucoup de scroll
[Photos]
[Lieu arrivée]
```

### Desktop - Après
```
[En-tête]          | [Lieu départ]
[Texte] ← Direct ! | [Stats]
[Photos]           | [Carte]
[Lieu arrivée]     | [Dénivelé]
```

### Mobile - Avant
```
[En-tête]
[Lieu départ]
[Stats - 3 blocs]
[Carte]
[Dénivelé]
[Texte] ← Beaucoup de scroll
[Photos]
[Lieu arrivée]
```

### Mobile - Après
```
[En-tête]
[Lieu départ]
[Stats - 1 ligne compacte]
[Texte] ← Moins de scroll
[Photos]
[Lieu arrivée]
[Carte + Dénivelé]
```

## Tests recommandés

### Desktop
- [ ] Sidebar reste visible pendant le scroll
- [ ] Carte interactive fonctionne dans la sidebar
- [ ] Texte lisible et aéré
- [ ] Navigation fluide

### Tablet (iPad)
- [ ] Layout 1 colonne
- [ ] Stats compactes
- [ ] Tout est accessible

### Mobile
- [ ] Stats en 1 ligne
- [ ] Texte confortable
- [ ] Carte en bas
- [ ] Touch-friendly

## Prochaines améliorations possibles

1. **Animations** : Transition smooth lors du resize
2. **Collapse sidebar** : Bouton pour masquer/afficher
3. **Sticky header** : Titre du jour toujours visible
4. **Progress bar** : Indicateur de progression de lecture
5. **Table of contents** : Liens vers les sections

## Résumé

✅ **Desktop** : Layout 2 colonnes avec sidebar sticky  
✅ **Mobile** : Layout 1 colonne optimisé  
✅ **Stats compactes** : Gain d'espace de 70%  
✅ **Lecture immédiate** : Texte visible sans scroll  
✅ **Performance** : CSS pur, pas de JS lourd  

L'ergonomie est maintenant optimale pour tous les écrans ! 📱💻
