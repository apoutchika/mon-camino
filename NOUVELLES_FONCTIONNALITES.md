# Nouvelles fonctionnalités ajoutées

## 1. Support Google Translate 🌍

### Fonctionnalité
Le site est maintenant entièrement traduisible avec Google Translate, permettant aux lecteurs du monde entier de lire ton récit dans leur langue.

### Implémentation
- Attribut `translate="yes"` sur les éléments de contenu
- Meta tags pour indiquer la langue principale (français)
- Compatible avec tous les navigateurs modernes

### Utilisation
Les visiteurs peuvent :
- Clic droit → "Traduire en [langue]" (Chrome, Edge)
- Utiliser l'extension Google Translate
- Passer par translate.google.com

### Langues supportées
100+ langues dont :
- 🇬🇧 Anglais
- 🇪🇸 Espagnol  
- 🇩🇪 Allemand
- 🇮🇹 Italien
- 🇵🇹 Portugais
- 🇯🇵 Japonais
- 🇨🇳 Chinois
- Et bien d'autres...

📖 **Documentation complète** : `GOOGLE_TRANSLATE.md`

---

## 2. Cartes de départ/arrivée avec tampons 🏠

### Fonctionnalité
Chaque journée affiche maintenant :
- **Au début** : Carte du lieu de départ
- **À la fin** : Carte du lieu d'arrivée

Chaque carte contient :
- Le nom de l'hébergement (gîte, albergue)
- La ville
- Un lien vers l'hébergement (Google Maps ou site web)
- **Le tampon de la crédential** (cliquable pour agrandir)

### Affichage

#### Miniature (dans la carte)
- Tampon affiché en 80x80px
- Bordure subtile
- Effet hover (légère mise en échelle)
- Cursor pointer pour indiquer qu'on peut cliquer

#### Lightbox (après clic)
- Fond sombre semi-transparent
- Image du tampon en grand (jusqu'à 600x600px)
- Bouton fermer en haut à droite
- Clic en dehors pour fermer
- Légende avec le nom de l'hébergement

### Couleurs
- **Départ** : Vert forêt (`var(--forest)`)
- **Arrivée** : Rouille (`var(--rust)`)

### Structure des données

```json
{
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

### Nouveau champ ajouté
- `stamp` (optionnel) : Chemin vers l'image du tampon
  - Relatif à `/public/`
  - Exemple : `/stamps/jour-1/depart.jpg`

### Formats d'images recommandés

**Miniature** :
- 80x80px minimum
- Format carré
- < 50 KB

**Image complète** :
- 600x600px recommandé
- Maximum 1200x1200px
- JPG ou PNG
- < 200 KB

### Organisation des fichiers

```
public/
  stamps/
    jour-1/
      depart.jpg
      arrivee.jpg
    jour-2/
      depart.jpg
      arrivee.jpg
    ...
```

Ou plus simple :
```
public/stamps/
  jour-1-depart.jpg
  jour-1-arrivee.jpg
  jour-2-depart.jpg
  jour-2-arrivee.jpg
  ...
```

📖 **Documentation complète** : `STAMPS_GUIDE.md`

---

## Modifications du domaine DDD

### Value Object `Place`

Nouveau champ ajouté :
```typescript
class Place {
  public readonly stamp?: string; // Chemin vers le tampon
  
  hasStamp(): boolean {
    return !!this.stamp;
  }
}
```

### Sérialisation

Le champ `stamp` est maintenant inclus dans `SerializedPlace` pour la compatibilité Next.js Server/Client Components.

---

## Composants créés

### `PlaceCard.tsx`

Nouveau composant pour afficher les informations de départ/arrivée :

**Props** :
- `place: Place` - Le lieu (from ou to)
- `type: "departure" | "arrival"` - Type de carte

**Fonctionnalités** :
- Affichage du tampon (si disponible)
- Lightbox au clic sur le tampon
- Lien vers l'hébergement
- Couleurs différentes selon le type
- Responsive
- Accessible (clavier, lecteurs d'écran)

---

## Accessibilité

### Tampons
- `alt` text descriptif
- `aria-label` sur les boutons
- Navigation au clavier (Tab, Enter)
- Lecteurs d'écran : "Voir le tampon de [nom]"

### Traduction
- Contenu traduisible
- Noms propres préservés
- Images non traduites (normal)

---

## Performance

### Images optimisées
Next.js optimise automatiquement :
- Lazy loading
- Formats modernes (WebP)
- Responsive images
- Compression

### Traduction
- Aucun impact sur les performances
- Pas de JavaScript supplémentaire
- Géré par le navigateur

---

## Prochaines étapes

### Pour les tampons

1. **Scanner ou photographier** tes tampons de crédential
2. **Recadrer** chaque tampon individuellement
3. **Redimensionner** à 600x600px
4. **Optimiser** le poids (< 200 KB)
5. **Organiser** dans `public/stamps/`
6. **Ajouter** les chemins dans `data.json`

### Outils recommandés

**Compression** :
- [TinyPNG](https://tinypng.com/)
- [Squoosh](https://squoosh.app/)
- [ImageOptim](https://imageoptim.com/) (Mac)

**Création de placeholders** :
- [Stamp Generator](https://www.stampgenerator.com/)
- [Rubber Stamp Generator](https://www.rubberstampgenerator.com/)
- Figma / Canva

---

## Exemple de mise à jour des données

### Avant
```json
{
  "from": {
    "city": "Lyon",
    "name": "Chez moi",
    "latlng": { "lat": 45.767, "lng": 4.814 },
    "link": "https://maps.app.goo.gl/..."
  }
}
```

### Après
```json
{
  "from": {
    "city": "Lyon",
    "name": "Chez moi",
    "latlng": { "lat": 45.767, "lng": 4.814 },
    "link": "https://maps.app.goo.gl/...",
    "stamp": "/stamps/jour-1/depart.jpg"
  }
}
```

---

## 3. Système de likes avec compteur ❤️

### Fonctionnalité
Chaque journée dispose maintenant d'un bouton like flottant permettant aux lecteurs d'exprimer leur appréciation.

### Caractéristiques
- **Bouton flottant** : Position fixe en bas à droite
- **Animation heartbeat** : Animation sympa au clic
- **Compteur de likes** : Affiche le nombre total de likes
- **1 like par IP** : Chaque visiteur peut liker une fois par jour
- **Anonymisation IP** : Les IPs sont hashées (SHA256 + salt) pour la confidentialité
- **Temps réel** : Le compteur s'incrémente immédiatement

### Affichage

#### État normal
- Coeur vide (outline)
- Couleur pierre (`var(--stone)`)
- Ombre portée subtile
- Hover : légère élévation

#### État liké
- Coeur plein
- Couleur rouille (`var(--rust)`)
- Background rouille
- Texte blanc

#### Animation
- Effet heartbeat au clic (0.6s)
- Plusieurs pulsations pour un effet vivant
- Transition fluide entre les états

### Base de données SQLite

Table `likes` :
```sql
CREATE TABLE likes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  day_id INTEGER NOT NULL,
  ip_hash TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(day_id, ip_hash)
)
```

### API

#### GET `/api/likes?dayId={id}`
Récupère l'état du like et le compteur :
```json
{
  "liked": true,
  "count": 42
}
```

#### POST `/api/likes`
Toggle le like (ajoute ou retire) :
```json
{
  "dayId": 5
}
```

Réponse :
```json
{
  "liked": true,
  "count": 43
}
```

### Sécurité et confidentialité

#### Anonymisation IP
- IP hashée avec SHA256
- Salt stocké dans variable d'environnement `IP_SALT`
- IP réelle jamais stockée en base
- Impossible de retrouver l'IP d'origine

#### Protection anti-spam
- 1 like par IP par jour (contrainte UNIQUE en base)
- Pas de rate limiting nécessaire (contrainte DB)
- Pas de cookies (basé sur IP uniquement)

### Variables d'environnement

Ajouter dans `.env.local` :
```bash
IP_SALT=votre_salt_secret_aleatoire
```

Générer un salt sécurisé :
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Composant `DayLike`

**Props** :
- `dayId: number` - L'ID du jour (1-33)

**États** :
- `liked` : Booléen indiquant si l'utilisateur a liké
- `count` : Nombre total de likes
- `loading` : État de chargement initial
- `animating` : État d'animation

**Fonctionnalités** :
- Chargement de l'état au montage
- Toggle au clic
- Animation heartbeat
- Gestion des erreurs
- Accessible (aria-label, title)

### Intégration

Le bouton like est affiché uniquement sur les jours (pas sur prologue/postface) :

```tsx
{isJour && day.day && <DayLike dayId={day.day} />}
```

### Responsive

#### Desktop
- Taille : 56x56px
- Position : bottom 2rem, right 2rem
- Icône : 24x24px

#### Mobile
- Taille : 48x48px
- Position : bottom 1.5rem, right 1.5rem
- Icône : 20x20px

### Accessibilité

- `aria-label` : "Aimer cette journée" / "Retirer le like"
- `title` : Tooltip au survol
- Navigation clavier (Tab, Enter)
- Contraste suffisant (WCAG AA)
- États visuels clairs

### Performance

- Requête GET au montage (une seule fois)
- Requête POST au clic (optimiste)
- Pas de polling
- Base SQLite locale (rapide)
- Index sur `day_id` et `ip_hash`

---

## Résumé

✅ **Google Translate** : Site traduisible dans 100+ langues  
✅ **Cartes de lieu** : Départ et arrivée avec tampons  
✅ **Lightbox** : Agrandissement des tampons au clic  
✅ **Système de likes** : Bouton coeur avec compteur et animation  
✅ **Anonymisation IP** : Confidentialité respectée  
✅ **Accessibilité** : Clavier, lecteurs d'écran  
✅ **Performance** : Images optimisées, base SQLite rapide  
✅ **DDD** : Architecture propre et maintenable  

Ton récit de pèlerinage est maintenant encore plus immersif, accessible et interactif ! 🎒✨❤️
