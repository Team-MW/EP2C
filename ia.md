# Règles du projet EP2C pour les assistants IA

## Stockage des documents

Cette règle s'applique en développement local et en production.

- **PDF : enregistrer le contenu du fichier directement dans MySQL**, dans
  `DocumentPdf.data` (LONGBLOB), lié au document par `documentId`.
- Ne pas envoyer les PDF sur Cloudinary et ne pas utiliser le disque local ou
  `/tmp` comme stockage permanent des PDF.
- Servir les PDF depuis la base via `/api/documents/:id/file`, avec le type
  `application/pdf` pour permettre leur ouverture dans le navigateur.
- Créer le document, enregistrer son contenu PDF et définir son lien dans une
  même transaction. Ne pas inclure les octets PDF dans les listes JSON.
- **Images PNG, JPG et JPEG : stocker les fichiers sur Cloudinary** et conserver
  leurs métadonnées et leur URL dans la base de données.
- Pour récupérer un ancien PDF local, vérifier son enregistrement en base avant
  de remplacer son lien ; conserver le fichier original pendant la migration.

Ne pas modifier cette répartition du stockage sans instruction explicite de
l'utilisateur.
