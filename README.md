# ELHEM MATHELI — THE CREATIVE EDITIONS

Portfolio web éditorial mobile-first de Brand Designer & Content Creator.

## Design
Palette institutionnelle beige, teal et bordeaux. Police **Instrument Serif** pour les titres, **DM Sans** pour le texte, **Amiri** pour les futurs textes arabes. Chaque projet conserve sa propre palette.

## Quatre expériences clés

1. **Interactive Art Book** : table des matières, sélection d'une édition, feuille de projet.
2. **Reveal the Design** : comparateur avant/après utilisable au toucher, à la souris ou au clavier.
3. **The Creative Journal** : notes éditoriales ouvrables sans duplication des projets.
4. **Start Your Brand Story** : brief commercial guidé et copiable; aucun agent IA payant ni backend nécessaire.

### Et en plus
**The Logo Atelier** : galerie distincte pour les logos exploratoires; 6 emplacements, avec possibilité d'ajouter d'autres études.
4 projets de démonstration : Élya Natura, MÉTALLUX, ForceClean et TrackSolid Pro.
About Me, diplômes, réseaux sociaux, contact et effets compatibles avec la préférence « moins d'animations ».

## Fichiers
- `index.html` : structure du site.
- `styles.css` : mise en page et typographie responsive.
- `content.js` : **votre seul fichier principal à personnaliser** (projets, texte, logos, diplômes, liens).
- `app.js` : interactions.
- `ASSET_CHECKLIST.md` : noms et dimensions des photos à ajouter.

## Prévisualisation
Le site est statique. Servir le dossier avec un serveur web local : `python3 -m http.server 8000`, puis ouvrir `http://localhost:8000`. Il peut aussi être déployé avec GitHub Pages.

## Limites
- Les photos finales ne sont pas fournies et n'ont pas été inventées.
- Aucun diplôme, chiffre de résultat client, email ou réseau social fictif n'est présenté comme authentique.
- Le brief **n'est pas envoyé automatiquement** : copie du texte, puis WhatsApp/email après configuration.
- Ce n'est ni une boutique, ni un agent IA connecté, ni un hébergement de formulaires.
- Les animations spécifiques de produits et vidéos 3D pourront être ajoutées après réception des assets.
- Avant mise en production, tester sur de vrais appareils et vérifier la disponibilité de vos contenus, liens et droits d'utilisation.

## Publication
Tout a été préparé sur la branche de travail `creative-editions-v3`, sans modifier directement la branche `main`. Examiner puis fusionner la pull request pour remplacer le prototype existant.

## Version Mobile App (PWA)

La même expérience est installable via le navigateur : icônes PNG 192 et 512, manifest, service worker, barre de navigation mobile, swipe horizontal entre éditions, écran de conseils d'installation iOS et Android. Elle reste accessible en site classique sur ordinateur. La mise en ligne HTTPS et le test sur téléphone réel sont nécessaires pour vérifier l'installation et le fonctionnement hors ligne. Le contenu de la galerie doit être fourni par la créatrice.

## Organisation finale des projets — 12 novembre 2026

Les **projets ne sont pas dupliqués** : le seul sommaire se trouve dans **Interactive Art Book** (ancien bloc nommé « The Editions »). Chaque chapitre a quatre parties : **Cover**, **Project Goal & Design Decision**, **Visual Identity** (logo, palette, typographie, éléments), **The Final Work** (produits en paires mockup + design à plat et comparaison avant/après intégrée). Aucun second Reveal global.

Les produits de chaque marque sont déclarés sous `projects[].products` dans `content.js`. Les couleurs, logos et typographies sont propres à chaque projet. La checklist est dans `ASSET_CHECKLIST.md`.
