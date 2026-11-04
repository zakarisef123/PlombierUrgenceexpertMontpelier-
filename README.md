# Plombier Urgence Expert Montpellier

Site statique (HTML/CSS/JS, sans build) du réseau d'artisans plombiers à Montpellier et dans ses environs (Hérault, 34).

## Structure

- `index.html` : accueil
- `urgence-plombier/`, `prestations/` et une page par prestation (fuite, débouchage, chauffe-eau, sanitaire, dégât des eaux, salle de bain, assainissement)
- `zones-intervention/` et une page par secteur : Montpellier, Lattes & littoral, Castelnau-le-Lez & nord,
  Saint-Jean-de-Védas & ouest, Mauguio & Lunel, Sète & bassin de Thau
- `notre-reseau/`, `realisations/`, `faq/`, `contact/`, `merci/`, mentions légales et confidentialité
- `assets/app.css` et `assets/app.js` : styles et scripts communs

## À compléter avant la mise en ligne

- **Nom de domaine** : les URL canoniques, le `sitemap.xml` et `robots.txt` utilisent l'adresse provisoire
  `https://plombier-urgence-expert-montpellier.netlify.app`. À remplacer par le vrai domaine.
- **Mentions légales** (`mentions-legales/index.html`) : éditeur SOS RENOV renseigné ; restent `[À COMPLÉTER]` : TVA intracommunautaire, assureur, médiateur.
- **Suivi Google** : Google Tag Manager, Google Ads et la validation Search Console ne sont pas installés
  (identifiants propres à ce site à ajouter).
- **Formulaires** : envoyés via FormSubmit vers sos.renov10@gmail.com ; un e-mail d'activation FormSubmit sera envoyé
  au premier envoi depuis ce site. Pour utiliser une autre boîte, remplacer cette adresse dans les `action="https://formsubmit.co/..."`.
- **Téléphone** : 06 00 00 00 00 est un numéro PROVISOIRE : changer `PHONE`/`TEL` puis remplacer partout.
