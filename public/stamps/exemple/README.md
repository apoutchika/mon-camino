# Images d'exemple de tampons

## Créer vos tampons

Pour créer des images de tampons de crédential :

### Option 1 : Scanner vos vrais tampons
1. Scanner à 300 DPI minimum
2. Recadrer chaque tampon individuellement
3. Redimensionner à 600x600px
4. Sauvegarder en JPG qualité 80%

### Option 2 : Photographier
1. Bon éclairage, fond blanc
2. Appareil photo ou smartphone
3. Recadrer et redimensionner
4. Optimiser le poids

### Option 3 : Créer des placeholders
Utiliser Figma, Canva ou un générateur en ligne :
- https://www.stampgenerator.com/
- https://www.rubberstampgenerator.com/

## Tailles recommandées

- **Miniature** : 80x80px (affichage dans la carte)
- **Complète** : 600x600px (lightbox)
- **Format** : JPG (ou PNG si transparence)
- **Poids** : < 200 KB

## Nommage

```
public/stamps/
  jour-1-depart.jpg
  jour-1-arrivee.jpg
  jour-2-depart.jpg
  jour-2-arrivee.jpg
  ...
```

Ou organisé par dossier :
```
public/stamps/
  jour-1/
    depart.jpg
    arrivee.jpg
  jour-2/
    depart.jpg
    arrivee.jpg
```

## Exemple de données

```json
{
  "from": {
    "city": "Lyon",
    "name": "Chez moi",
    "stamp": "/stamps/jour-1-depart.jpg"
  },
  "to": {
    "city": "Thurins", 
    "name": "Chez Dominique",
    "stamp": "/stamps/jour-1-arrivee.jpg"
  }
}
```
