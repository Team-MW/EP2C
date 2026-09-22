# EP2C

Site React/Vite, API Express dans `api/index.js`, base MySQL via Prisma.

## Développement

Utiliser Node 22. Copier `.env.example` vers `.env` et renseigner les valeurs.
Ne jamais préfixer les secrets serveur par `VITE_` : ces variables sont intégrées au navigateur.

```sh
npm ci
npm run db:check
npm run dev
```

Le lanceur Node `scripts/dev.js` démarre Vite et l'API et affiche immédiatement
leur démarrage. Il arrête les deux processus avec Ctrl+C ou si l'un échoue.
Le site est disponible à l'adresse affichée par Vite (port 5174 par défaut).

Si Node affiche une erreur de lecture `ECANCELED` dans `node_modules`, arrêter
le lancement puis exécuter `npm ci --no-audit --no-fund` avant de relancer
`npm run dev`. Cette commande réinstalle les dépendances verrouillées.

## Déploiement Vercel

1. Importer la racine de ce dépôt, avec le preset Vite et Node 22.
2. Dans Settings → Environment Variables, renseigner `DATABASE_URL`,
   `CLERK_SECRET_KEY`, `VITE_CLERK_PUBLISHABLE_KEY`, `CLOUDINARY_CLOUD_NAME`,
   `CLOUDINARY_API_KEY` et `CLOUDINARY_API_SECRET` pour les environnements visés.
   Les fichiers `.env` locaux ne sont pas envoyés par Git. Utiliser les clés de la
   même instance Clerk et configurer le domaine de production dans Clerk.
3. Vérifier que MySQL accepte les connexions depuis l'hébergement Vercel et que
   les paramètres TLS correspondent aux exigences du fournisseur. Encoder les
   caractères spéciaux du mot de passe dans l'URL. Ne pas désactiver TLS pour
   contourner une erreur de connexion.
4. Lancer le build `npm run build`, sortie `dist` (déjà définis dans `vercel.json`).
   Le moteur Prisma Linux OpenSSL 3 est généré et inclus dans la fonction API.
5. Après déploiement, ouvrir `/api/ping` puis `/api/health`.
   Le premier vérifie Express ; le second vérifie les tables EP2C.

### Diagnostic

- `DATABASE_URL_MISSING` : ajouter la variable serveur puis redéployer.
- `DATABASE_AUTH_FAILED` : vérifier les identifiants MySQL.
- `DATABASE_UNREACHABLE` : vérifier accès réseau, pare-feu et disponibilité MySQL.
- `DATABASE_SCHEMA_MISSING` : vérifier les tables/colonnes User, Document et Folder.
- `DATABASE_UNAVAILABLE` : consulter les journaux serveur et vérifier le moteur Prisma/TLS.
- HTML ou 404 à la place du JSON : vérifier le routage API et la racine du projet Vercel.

`npm run db:check` est en lecture seule et ne renvoie aucune donnée client.
Le schéma Prisma contient aussi des tables d'autres applications : ne pas lancer
`prisma db push`, `migrate reset` ou une migration destructive à l'aveugle.
Aucune modification de schéma n'est nécessaire pour ce correctif.

### Documents

Règle du projet : voir `ia.md`.

- Les PDF sont enregistrés dans MySQL, dans `DocumentPdf.data` (LONGBLOB).
  La route `/api/documents/:id/file` les sert avec le type `application/pdf`.
- Les images PNG/JPG/JPEG utilisent Cloudinary ; la base conserve leur URL.
- Cette répartition est identique en local et sur Vercel. Limite d'envoi : 4 Mo.

Sur une nouvelle base, après `prisma generate`, exécuter
`node scripts/setup-pdf-storage.js --apply` pour créer uniquement la table
`DocumentPdf`. Le SQL est disponible dans `prisma/document-pdf.sql`. Ne pas
exécuter une synchronisation destructive du schéma global.

Pour un ancien PDF présent dans `api/uploads`, la commande
`node scripts/migrate-local-pdf.js NOM.pdf` vérifie le fichier et compte les liens
sans modifier les données. Avec `--apply`, elle enregistre les octets dans MySQL,
vérifie leur intégrité puis remplace le lien en transaction. L'original local
est conservé. Aucun PDF n'est transféré à Cloudinary.

Après modification de l'API, redémarrer le serveur local et redéployer sur Vercel.
Recharger la liste des documents pour récupérer les nouveaux liens. Les anciens
onglets `/api/uploads/...` ne constituent pas les nouveaux liens de téléchargement.

## Vérifications et audit

```sh
npm test
npm run build
npm run lint
```

Voir `AUDIT.md` pour les défauts identifiés, les corrections et les risques restants.
