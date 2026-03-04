# Guide des tampons de crédential

## Fonctionnalité ajoutée

Les cartes de départ et d'arrivée affichent maintenant :
- Le nom de l'hébergement (gîte, albergue)
- La ville
- Un lien vers l'hébergement (Google Maps ou site web)
- **Le tampon de la crédential** (cliquable pour agrandir)

## Format des images de tampons

### Tailles recommandées

**Miniature (affichage dans la carte)** :
- 80x80px minimum
- Format carré recommandé
- Poids : < 50 KB

**Image complète (lightbox)** :
- 600x600px recommandé
- Maximum 1200x1200px
- Format : JPG ou PNG
- Poids : < 200 KB

### Formats acceptés

- **JPG** : Recommandé pour les photos de tampons (meilleure compression)
- **PNG** : Si le tampon a un fond transparent
- **WebP** : Optimal pour la performance (Next.js convertit automatiquement)

### Organisation des fichiers

```
public/
  stamps/
    jour-1/
      depart.jpg    # Tampon du lieu de départ
      arrivee.jpg   # Tampon du lieu d'arrivée
    jour-2/
      depart.jpg
      arrivee.jpg
    ...
```

## Ajout dans les données

### Structure JSON

```json
{
  "id": 1,
  "type": "jour",
  "day": 1,
  "from": {
    "city": "Lyon",
    "name": "Chez moi",
    "latlng": { "lat": 45.767, "lng": 4.814 },
    "link": "https://maps.app.goo.gl/...",
    "stamp": "/stamps/jour-1/depart.jpg"
  },
  "to": {
    "city": "Thurins",
    "name": "Chez Dominique",
    "latlng": { "lat": 45.678, "lng": 4.659 },
    "link": "https://maps.app.goo.gl/...",
    "stamp": "/stamps/jour-1/arrivee.jpg"
  }
}
```

### Champs

- `stamp` (optionnel) : Chemin vers l'image du tampon
  - Relatif à `/public/`
  - Exemple : `/stamps/jour-1/depart.jpg`

## Préparation des images

### 1. Scanner ou photographier

- Scanner à 300 DPI minimum
- Ou photographier avec un bon éclairage
- Fond blanc ou neutre

### 2. Recadrer

- Centrer le tampon
- Garder une petite marge autour
- Format carré si possible

### 3. Optimiser

**Avec Photoshop/GIMP** :
- Redimensionner à 600x600px
- Exporter en JPG qualité 80%
- Ou PNG si transparence nécessaire

**Avec des outils en ligne** :
- [TinyPNG](https://tinypng.com/) - Compression PNG/JPG
- [Squoosh](https://squoosh.app/) - Compression avancée
- [ImageOptim](https://imageoptim.com/) - Mac uniquement

**Avec la ligne de commande** :
```bash
# Redimensionner et optimiser avec ImageMagick
convert tampon-original.jpg -resize 600x600 -quality 80 tampon-optimise.jpg

# Ou avec sips (Mac)
sips -Z 600 tampon-original.jpg --out tampon-optimise.jpg
```

## Comportement

### Affichage miniature
- 80x80px dans la carte
- Bordure subtile
- Hover : légère mise en échelle
- Cursor pointer

### Lightbox (clic)
- Fond sombre semi-transparent
- Image centrée, taille maximale
- Bouton fermer en haut à droite
- Clic en dehors pour fermer
- ESC pour fermer (à implémenter si besoin)

## Exemple de données complètes

```json
{
  "id": 1,
  "type": "jour",
  "day": 1,
  "date": "2025-03-23T11:00:00.000Z",
  "from": {
    "latlng": { "lat": 45.767357, "lng": 4.814608 },
    "city": "Lyon",
    "name": "Chez moi",
    "link": "https://maps.app.goo.gl/rR3VD3bYZ1w1cdp76",
    "stamp": "/stamps/jour-1/depart.jpg"
  },
  "to": {
    "latlng": { "lat": 45.678855, "lng": 4.659382 },
    "city": "Thurins",
    "name": "Chez Dominique",
    "link": "https://maps.app.goo.gl/iap2Dv7gKTLVg9M7A",
    "stamp": "/stamps/jour-1/arrivee.jpg"
  },
  "stats": {
    "distance": 25.5,
    "elevationGain": 650,
    "elevationLoss": 450,
    "totalDistance": 25.5,
    "totalElevationGain": 650,
    "totalElevationLoss": 450
  },
  "content": "Première journée de marche...",
  "photos": [],
  "fromMemory": false
}
```

## Accessibilité

Les tampons sont accessibles :
- `alt` text descriptif
- `aria-label` sur le bouton
- Clavier : Tab pour naviguer, Enter pour ouvrir
- Lecteurs d'écran : annonce "Voir le tampon de [nom]"

## Performance

Next.js optimise automatiquement les images :
- Lazy loading
- Formats modernes (WebP)
- Responsive images
- Placeholder blur (optionnel)

## Traduction Google Translate

Les cartes de lieu sont traduisibles :
- Le nom de l'hébergement
- La ville
- Les labels "Départ" / "Arrivée"
- Le lien "Voir l'hébergement"

Les images de tampons ne sont pas traduites (normal).

## Conseils

### Pour de meilleurs résultats

✅ **Faire** :
- Scanner en haute résolution
- Recadrer proprement
- Optimiser le poids
- Nommer les fichiers de façon cohérente
- Tester l'affichage sur mobile

❌ **Éviter** :
- Images floues ou mal éclairées
- Fichiers trop lourds (> 500 KB)
- Formats exotiques
- Noms de fichiers avec espaces ou accents

### Organisation recommandée

```
public/stamps/
  ├── jour-1/
  │   ├── depart.jpg
  │   └── arrivee.jpg
  ├── jour-2/
  │   ├── depart.jpg
  │   └── arrivee.jpg
  └── ...
```

Ou plus simple :
```
public/stamps/
  ├── jour-1-depart.jpg
  ├── jour-1-arrivee.jpg
  ├── jour-2-depart.jpg
  ├── jour-2-arrivee.jpg
  └── ...
```

## Exemple visuel

Pour créer une image d'exemple de tampon, tu peux :

1. **Utiliser un vrai scan** de ta crédential
2. **Créer un placeholder** avec Figma/Canva :
   - Fond blanc
   - Cercle ou forme du tampon
   - Texte du lieu
   - Date
   - Style vintage/encre

3. **Utiliser un générateur en ligne** :
   - [Stamp Generator](https://www.stampgenerator.com/)
   - [Rubber Stamp Generator](https://www.rubberstampgenerator.com/)

## Mise à jour des données

Pour ajouter les tampons à tes données existantes :

```bash
# Script pour ajouter le champ stamp à tous les jours
# (à adapter selon ton workflow)
```

Ou manuellement dans `src/data/data.json` :
- Ajouter `"stamp": "/stamps/jour-X/depart.jpg"` dans `from`
- Ajouter `"stamp": "/stamps/jour-X/arrivee.jpg"` dans `to`
