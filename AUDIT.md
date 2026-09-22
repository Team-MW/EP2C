# Audit technique EP2C — 15 septembre 2026

## Conclusion

La base MySQL configurée dans le `.env` local répond et les trois modèles EP2C
(`User`, `Document`, `Folder`) sont lisibles. Vérification réelle effectuée en
lecture seule : `npm run db:check` renvoie `connected / ready`.

Plusieurs défauts de déploiement et de chargement ont été corrigés dans le code.
La cause exacte de l'incident en production reste à confirmer : l'URL du site,
les journaux Vercel et ses variables d'environnement n'ont pas été fournis.
La connexion locale valide ne prouve pas que Vercel dispose du même accès.

**La sécurité de l'application n'est pas validée : les accès API restent publics.**

## Corrections effectuées

### P1 — Compatibilité Prisma / runtime Vercel

`prisma/schema.prisma` ne ciblait explicitement que Linux OpenSSL 1 et le système
de génération (`native`). Le moteur de la génération locale était uniquement
macOS avant régénération. La configuration cible maintenant Linux OpenSSL 3 ;
Node 22 est fixé dans `package.json`, et `vercel.json` inclut explicitement le
client généré dans la fonction API. La génération reste exécutée au build,
afin d'éviter un client obsolète provenant du cache.

Le fichier de verrou npm classait encore `@prisma/client` parmi les dépendances
de développement ; il est désormais aligné sur les dépendances de production.

Nuance : `native` peut déjà produire le bon moteur lorsque le build tourne sur
le même environnement Linux que la fonction. L'ancienne cible explicite est un
défaut de portabilité confirmé, pas une preuve suffisante de la panne observée.

Références : [moteurs Prisma sur AWS](https://www.prisma.io/docs/orm/v6/prisma-client/deployment/caveats-when-deploying-to-aws-platforms)
et [Express sur Vercel](https://vercel.com/docs/frameworks/backend/express).

### P1 — PDF temporaires et inaccessibles en production

`api/index.js` écrivait les PDF dans `/tmp/uploads` sur Vercel, tandis que la route
statique correspondante était désactivée. Les nouveaux PDF passent maintenant
par Cloudinary en mode `raw`. Leur suppression tient compte du type de ressource.
La taille est limitée à 4 Mo côté serveur et dans l'interface d'envoi.

Limites : aucun fichier réel n'a été téléversé ou supprimé pendant l'audit.
Les anciens liens locaux ne sont pas migrés et les fichiers temporaires perdus
ne sont pas récupérables par ce correctif. L'accès public Cloudinary reste un
risque à traiter ci-dessous.

### P2 — Erreurs de connexion masquées

`AdminDashboard.tsx` affichait zéro client après une erreur HTTP. Un message
visible avec bouton Réessayer distingue maintenant une panne d'une liste vide.
Les pages client signalent également les échecs de chargement des documents et
dossiers, au lieu d'ignorer les réponses non réussies.

`DocumentList.tsx` synchronise le compte avant le chargement : un accès direct à
`/panel/documents` ne dépend plus d'une visite préalable au tableau de bord.
Le lien `/dashboard/documents`, qui ne correspondait à aucune route, pointe
maintenant vers `/panel/documents`.

### P2 — Diagnostic et configuration de déploiement

- `/api/ping` vérifie seulement le processus HTTP et ne prétend plus vérifier MySQL.
- `/api/health` vérifie les trois modèles EP2C ; retourne 200 ou 503 et un code
  stable sans données client ni chaîne de connexion, avec cache désactivé.
- `npm run db:check` fournit le même diagnostic en lecture seule.
- Le lancement local est déplacé de `api/start.js` vers `scripts/start.js` pour
  éviter une seconde entrée de fonction Vercel dépourvue de handler exporté.
- Les routes API inconnues retournent du JSON en 404.
- `.env.example` et le README décrivent les variables et les vérifications Vercel.
- Le corps complet de synchronisation utilisateur n'est plus journalisé et
  cette route ne renvoie plus les messages internes de Prisma au navigateur.

## Risques restants, par priorité

### P0 — Absence d'authentification et d'autorisation serveur

Toutes les routes métier de `api/index.js` sont accessibles sans middleware de
vérification Clerk. Un appelant peut lister les clients, demander les documents
d'un autre utilisateur, envoyer des fichiers ou appeler les routes de suppression.
Les identifiants de propriétaire sont fournis par la requête sans contrôle des
droits. `POST /api/users` accepte même `role` et peut réassocier un compte par email.

Le PIN `00000` dans `AdminDashboard.tsx` est livré au navigateur ; le chargement
des clients démarre avant son déverrouillage. Il ne constitue aucune protection.

Remédiation nécessaire : vérifier les sessions Clerk sur le serveur, dériver
l'identité du jeton vérifié, imposer un rôle administrateur côté serveur et
vérifier la propriété de chaque document/dossier, y compris les destinations de
déplacement. Adapter simultanément les appels front avec le jeton de session.
Cette refonte d'autorisation n'est pas incluse dans le correctif de connexion.

### P1 — Confidentialité des documents

Cloudinary est configuré avec `access_mode: public` et `type: upload`. Les URL
peuvent être ouvertes par quiconque les connaît. Prévoir un stockage privé et
des téléchargements autorisés ou des URL signées à durée courte.

Un PDF dans `api/uploads/` est déjà suivi par Git. L'ajout de ce répertoire au
`.gitignore` protège les nouveaux fichiers, mais ne retire ni ce fichier déjà
suivi ni l'historique. Vérifier l'exposition du dépôt et organiser son retrait
sans perdre le document source. Les fichiers `.env` ne sont pas suivis dans
l'état Git courant ; l'historique complet des secrets n'a pas été analysé.

### P1 — Dépendances vulnérables

`npm audit --omit=dev --json` signale **14 paquets affectés : 1 critique,
10 élevés, 1 modéré, 2 faibles**. Ce décompte inclut les dépendances transitives
et ne correspond pas à 14 exploits démontrés dans cette application.

Paquets concernés : `@clerk/shared`, `@clerk/backend`, `@clerk/clerk-sdk-node`,
`@clerk/clerk-react`, `multer`, `react-router`, `react-router-dom`, `lodash`,
`path-to-regexp`, `form-data`, `js-cookie`, `qs`, `cookie`, `body-parser`.

Une mise à niveau majeure du SDK Clerk serveur est proposée par npm. Planifier
cette migration avec la correction d'authentification et tester création de
compte, sessions et droits. Aucun `npm audit fix --force` n'a été exécuté.
Les alertes React Router côté SSR/RSC ne démontrent pas une exploitation de ce
site Vite purement client ; leur applicabilité doit être évaluée par fonctionnalité.

### P2 — Intégrité des données et suppression

Le schéma utilise `relationMode: prisma`, sans garantie de clés étrangères MySQL.
Les routes ne valident pas systématiquement propriétaires, destinations ni cycles
de dossiers. Les suppressions utilisateur/dossier enchaînent plusieurs écritures
sans transaction. Une erreur intermédiaire peut laisser un état partiel ; les
sous-dossiers ne sont pas traités de manière récursive et les objets Cloudinary
peuvent devenir orphelins lors des suppressions en masse.

Le schéma inclut de nombreuses tables d'autres applications et aucune stratégie
de migration versionnée n'est présente. Ne pas appliquer une synchronisation
destructive du schéma global pour résoudre un problème de connexion.

### P2 — Qualité et performances

ESLint échoue avec **23 erreurs et 2 avertissements** : types `any`, variables
inutilisées, mises à jour synchrones dans certains effets React et composant
`MobileMenu` défini pendant le rendu. Ces catégories concernent du code déjà
présent ; elles ne bloquent pas le build TypeScript actuel.

Le build signale un bundle JavaScript d'environ 512 Ko minifié, des syntaxes CSS
de gradients anciennes et une base Browserslist périmée. Le chargement différé
des pages admin/client réduirait le coût de la page publique.

## Vérifications

- Connexion réelle MySQL et lecture des modèles EP2C : réussies, aucune mutation.
- Tests unitaires du diagnostic : 7 réussis, configuration absente, succès,
  identifiants invalides, hôte inaccessible, table/colonne absente et erreur inconnue.
- Génération Prisma, TypeScript et build Vite : réussis (environnement local Node 20.20.2).
- Syntaxe JavaScript et `git diff --check` : réussis.
- ESLint : échec, 23 erreurs et 2 avertissements détaillés ci-dessus.
- Audit npm de production : réalisé, 14 paquets affectés.
- Tests HTTP du handler Vercel : réussis (ping, santé sans configuration en 503,
  route inconnue en JSON 404 et refus d'un fichier de plus de 4 Mo en 413).
  Total final `npm test` : **8 tests réussis, 0 échec**.

Le runtime Node 22 sur Vercel, le parcours navigateur authentifié et les
téléversements Cloudinary restent à vérifier sur un déploiement de validation.

## Validation en production

1. Vérifier les variables de production décrites dans le README, notamment
   `DATABASE_URL`, et l'autorisation réseau MySQL depuis Vercel.
2. Déployer la correction ; vérifier `/api/ping` puis `/api/health`.
3. Confirmer le chargement clients/documents avec un compte de test autorisé.
4. Vérifier un PDF de test après une nouvelle invocation/redéploiement.
5. Traiter les accès API publics avant de considérer l'application sécurisée.

Les modifications utilisateur déjà présentes au début de l'intervention,
notamment le proxy Vite et le lancement local du serveur, ont été conservées.

## Complément — démarrage local

Le lancement silencieux a été reproduit. Un lancement direct de Vite a révélé
une erreur de lecture `ECANCELED` dans `node_modules/picomatch/lib/scan.js`.
Réinstallation réalisée avec `npm ci --no-audit --no-fund` (383 paquets), puis
régénération Prisma réussie. La cause système exacte de l'annulation de lecture
n'a pas été établie.

`npm run dev` utilise désormais un lanceur Node sans dépendance à `concurrently`,
avec sorties visibles et arrêt des processus enfants. Vérification après réparation :
Vite prêt, API démarrée, page et module React en HTTP 200, `/api/health` via le
proxy Vite en `connected / ready`, et 8 tests réussis.

## Complément — stockage PDF demandé par l'utilisateur

La règle définitive est inscrite dans `ia.md` : PDF dans MySQL, images PNG/JPG/JPEG
sur Cloudinary, en local comme sur Vercel. Elle remplace la proposition antérieure
d'envoyer les PDF à Cloudinary. Aucun transfert du PDF signalé vers Cloudinary
n'a été effectué.

La table `DocumentPdf` a été créée de manière additive dans la base configurée,
avec une colonne LONGBLOB. Les métadonnées, le contenu PDF et le lien sont
créés dans une transaction. Les listes de documents ne chargent pas les octets.
La route `/api/documents/:id/file` renvoie les octets avec `application/pdf` et
un cache désactivé. Le diagnostic de santé vérifie également la nouvelle table.

Le PDF de la capture a été récupéré depuis le Mac : un document mis à jour,
119 984 octets conservés en MySQL et vérifiés identiques à l'original.
La route HTTP a été testée avec la base réelle : statut 200 et contenu identique.
L'original local est conservé.

Validation finale : 14 tests réussis, compilation réussie et contrôle de syntaxe
réussi. Aucun serveur de test n'est laissé ouvert. Le serveur local doit être
redémarré et la nouvelle API redéployée sur Vercel ; recharger ensuite la liste
des documents pour obtenir les nouveaux liens.

La sécurité d'accès aux routes API reste le point P0 décrit plus haut ; stocker
les PDF dans MySQL ne remplace pas les contrôles d'identité et de propriété.
