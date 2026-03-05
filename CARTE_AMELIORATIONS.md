# Améliorations de la carte

## Problème

Le fond de carte Carto Voyager était trop minimaliste, avec peu de noms de villes visibles. Il fallait zoomer pour voir les informations.

## Solutions implémentées

### 1. Changement du fond de carte

**Avant** : Carto Voyager (minimaliste)
```javascript
L.tileLayer(
  "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
)
```

**Après** : OpenStreetMap France (plus de détails)
```javascript
L.tileLayer(
  "https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png"
)
```

**Avantages** :
- Plus de noms de villes
- Plus de détails (routes, chemins)
- Meilleure pour les randonnées
- Gratuit et open source

### 2. Labels permanents sur les villes

Ajout de labels toujours visibles pour les villes de départ et d'arrivée :

```javascript
L.marker(fromLatLng, {
  icon: L.divIcon({
    html: `<div>${day.from.city}</div>`,
    iconAnchor: [-20, 40], // En dessous du marqueur
  }),
}).addTo(map);
```

**Style** :
- Fond blanc semi-transparent
- Couleur assortie au marqueur (vert/rouille)
- Ombre portée
- Police sans-serif
- Non cliquable (`pointer-events: none`)

### 3. Zoom ajusté

**Avant** : zoom 12  
**Après** : zoom 13

Plus proche pour mieux voir les détails et les noms de lieux.

## Résultat

✅ Noms de villes toujours visibles  
✅ Plus de détails sur la carte  
✅ Meilleure orientation géographique  
✅ Pas besoin de zoomer pour comprendre  

## Autres fonds de carte disponibles

Si tu veux tester d'autres styles :

### OpenStreetMap Standard
```javascript
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: '© OpenStreetMap contributors',
  maxZoom: 19,
})
```
- Le plus détaillé
- Beaucoup de labels
- Peut être chargé visuellement

### OpenTopoMap
```javascript
L.tileLayer("https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png", {
  attribution: '© OpenTopoMap contributors',
  maxZoom: 17,
})
```
- Style topographique
- Courbes de niveau
- Parfait pour la randonnée
- Peut être trop chargé

### Thunderforest Landscape
```javascript
L.tileLayer(
  "https://{s}.tile.thunderforest.com/landscape/{z}/{x}/{y}.png?apikey=YOUR_KEY",
  {
    attribution: '© Thunderforest',
    maxZoom: 22,
  }
)
```
- Style paysage
- Beau rendu
- Nécessite une clé API (gratuite jusqu'à 150k requêtes/mois)

### Stadia Maps Outdoors
```javascript
L.tileLayer(
  "https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png",
  {
    attribution: '© Stadia Maps',
    maxZoom: 20,
  }
)
```
- Style outdoor
- Bon compromis détails/lisibilité
- Gratuit jusqu'à 20k requêtes/jour

### Esri World Street Map
```javascript
L.tileLayer(
  "https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}",
  {
    attribution: '© Esri',
    maxZoom: 19,
  }
)
```
- Style professionnel
- Bonne lisibilité
- Gratuit

## Comparaison visuelle

### Carto Voyager (ancien)
- ❌ Peu de labels
- ✅ Épuré
- ✅ Rapide
- ❌ Manque de contexte

### OpenStreetMap France (actuel)
- ✅ Beaucoup de labels
- ✅ Détaillé
- ✅ Gratuit
- ⚠️ Peut être chargé

### OpenTopoMap
- ✅ Courbes de niveau
- ✅ Parfait pour rando
- ❌ Très chargé
- ❌ Peut masquer le tracé

## Personnalisation des labels

### Position
```javascript
iconAnchor: [-20, 40] // x, y depuis le centre du marqueur
```

Options :
- `[-20, 40]` : En dessous à gauche
- `[20, 40]` : En dessous à droite
- `[-20, -10]` : Au-dessus à gauche
- `[20, -10]` : Au-dessus à droite

### Style
```javascript
html: `<div style="
  font-size: 0.75rem;        // Taille
  font-weight: 600;          // Gras
  color: #5a7a5f;            // Couleur
  background: rgba(255, 255, 255, 0.95); // Fond
  padding: 0.25rem 0.5rem;   // Espacement
  border-radius: 4px;        // Coins arrondis
  box-shadow: 0 2px 4px rgba(0,0,0,0.15); // Ombre
">${city}</div>`
```

### Visibilité selon le zoom

Si tu veux masquer les labels quand on zoom :

```javascript
map.on('zoomend', () => {
  const zoom = map.getZoom();
  if (zoom > 14) {
    // Masquer les labels
    cityLabels.forEach(label => label.setOpacity(0));
  } else {
    // Afficher les labels
    cityLabels.forEach(label => label.setOpacity(1));
  }
});
```

## Labels pour les villes intermédiaires

Si tu veux ajouter des labels pour d'autres villes sur le parcours :

```javascript
const intermediateCities = [
  { name: "Ville 1", lat: 45.5, lng: 4.5 },
  { name: "Ville 2", lat: 45.6, lng: 4.6 },
];

intermediateCities.forEach(city => {
  L.marker([city.lat, city.lng], {
    icon: L.divIcon({
      className: "city-label-small",
      html: `<div style="
        font-size: 0.625rem;
        color: var(--stone);
        background: rgba(255, 255, 255, 0.8);
        padding: 0.125rem 0.375rem;
        border-radius: 3px;
      ">${city.name}</div>`,
      iconSize: [0, 0],
      iconAnchor: [0, -5],
    }),
  }).addTo(map);
});
```

## Performance

### Optimisations
- Labels en CSS pur (pas d'images)
- `pointer-events: none` pour éviter les interactions
- Pas de JavaScript pour l'affichage

### Cache
Les tuiles de carte sont automatiquement mises en cache par le navigateur.

## Accessibilité

Les labels de ville :
- Sont visibles par défaut
- Ne gênent pas la navigation
- Sont en texte (pas d'images)
- Ont un bon contraste

## Mobile

Sur mobile, les labels restent visibles et lisibles grâce à :
- Taille de police adaptée (0.75rem)
- Fond semi-transparent
- Ombre portée pour le contraste

## Prochaines améliorations possibles

1. **Sélecteur de fond de carte** : Bouton pour changer le style
2. **Labels adaptatifs** : Taille selon le zoom
3. **Villes intermédiaires** : Labels pour les grandes villes sur le parcours
4. **Mode sombre** : Fond de carte sombre pour la nuit
5. **Légende** : Explication des couleurs et symboles

## Résumé

✅ **Fond de carte** : OpenStreetMap France (plus de détails)  
✅ **Labels permanents** : Villes de départ et d'arrivée toujours visibles  
✅ **Zoom ajusté** : 13 au lieu de 12  
✅ **Style cohérent** : Couleurs assorties aux marqueurs  
✅ **Performance** : CSS pur, pas de JS lourd  

La carte est maintenant beaucoup plus informative ! 🗺️
