# Configuration du projet

## Variables d'environnement

Copier `.env.example` vers `.env.local` et remplir les valeurs :

```bash
cp .env.example .env.local
```

### 1. Mailjet (envoi d'emails)

**Pourquoi ?** Pour recevoir les messages du formulaire de contact.

1. Créer un compte sur [mailjet.com](https://www.mailjet.com)
2. Aller dans Account Settings > API Keys
3. Copier API Key et Secret Key
4. Ajouter dans `.env.local` :
   ```
   MAILJET_API_KEY=your_api_key
   MAILJET_SECRET_KEY=your_secret_key
   MAILJET_SENDER_EMAIL=contact@votredomaine.fr
   CONTACT_EMAIL=votre-email@exemple.fr
   ```

**Gratuit** : Mailjet offre 200 emails/jour gratuitement, parfait pour un site personnel.

### 2. Google reCAPTCHA v2

**Pourquoi ?** Pour éviter le spam sur le formulaire de contact.

1. Aller sur [google.com/recaptcha/admin](https://www.google.com/recaptcha/admin)
2. Créer un nouveau site avec reCAPTCHA v2 "Je ne suis pas un robot"
3. Ajouter votre domaine (localhost pour dev)
4. Copier les clés dans `.env.local` :
   ```
   NEXT_PUBLIC_RECAPTCHA_SITE_KEY=6LeXXXXXX (clé publique)
   RECAPTCHA_SECRET_KEY=6LeXXXXXX (clé secrète)
   ```

## Formulaire de contact

Le formulaire utilise :
- **react-hook-form** : Gestion du formulaire
- **yup** : Validation des champs
- **reCAPTCHA** : Protection anti-spam
- **Mailjet** : Envoi d'emails via nodemailer

### Messages de validation

Les messages sont définis dans `src/lib/contactSchema.ts` :
- Nom : minimum 2 caractères
- Email : format valide
- Message : 10-2000 caractères
- reCAPTCHA : obligatoire

### Personnaliser les messages

Éditer `src/lib/contactSchema.ts` pour changer les messages d'erreur.

## Page de don

La page `/don` affiche :
- Onglet Fiat : formulaire Stripe (à configurer)
- Onglet Crypto : adresses de wallets

**Note** : Le livre en ligne restera toujours gratuit. Un livre papier pourrait sortir un jour (payant).

Pour configurer Stripe, voir la documentation officielle.

## CTA fin de livre

Un call-to-action sympa s'affiche automatiquement à la fin de la postface pour encourager les dons sans forcer.

Personnaliser dans `src/components/livre/EndOfBookCTA.tsx`.
