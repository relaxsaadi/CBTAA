# 🌟 Guide Débutant - Déployer sur Netlify (20 minutes)

**Parfait pour les débutants !** Netlify est très simple et gratuit.

---

## 🎯 Ce que nous allons faire :
1. **Préparer** votre site (5 min)
2. **Créer un compte** Netlify gratuit (2 min)
3. **Déployer** votre site (3 min)
4. **Personnaliser** l'adresse (5 min)
5. **Vérifier** que tout fonctionne (5 min)

**Résultat** : Votre site sur `https://votre-nom.netlify.app` ✨

---

## 📦 Étape 1 : Préparer votre site (5 minutes)

### A. Créer le dossier à déployer
Nous allons créer un fichier ZIP de votre site :

```bash
# 1. Aller dans le dossier de votre projet
cd iata-cbta-platform

# 2. Construire la version finale de votre site
bun run build

# 3. Vérifier que le dossier "dist" est créé
ls -la dist
```

**Vous devriez voir :**
```
dist/
├── index.html          (votre page principale)
├── assets/             (fichiers CSS et JS)
├── manifest.json       (config de l'app)
└── vite.svg           (icône)
```

### B. Créer une archive ZIP (optionnel)
```bash
# Créer un ZIP du dossier dist (pour upload manuel)
cd dist
zip -r ../site-iata-cbta.zip .
cd ..
```

**✅ Votre site est prêt !**

---

## 🚀 Étape 2 : Créer un compte Netlify (2 minutes)

### Instructions détaillées :

1. **Aller sur le site Netlify**
   - Ouvrez votre navigateur
   - Allez sur : [https://netlify.com](https://netlify.com)

2. **Créer un compte gratuit**
   - Cliquez sur **"Sign up"** (en haut à droite)
   - Choisissez **"Sign up with email"**
   - Remplissez :
     - **Email** : votre adresse email
     - **Password** : un mot de passe sécurisé
   - Cliquez **"Sign up"**

3. **Vérifier votre email**
   - Allez dans votre boîte mail
   - Ouvrez l'email de Netlify
   - Cliquez sur **"Verify email"**

4. **Se connecter**
   - Retournez sur netlify.com
   - Cliquez **"Log in"**
   - Entrez vos identifiants

**✅ Votre compte est créé !**

---

## 🎊 Étape 3 : Déployer votre site (3 minutes)

### Méthode A : Glisser-Déposer (Plus facile pour débutants)

1. **Sur la page d'accueil de Netlify**
   - Vous verrez une zone qui dit : **"Want to deploy a new site without connecting to Git?"**
   - Il y a une grande boîte avec : **"Drag and drop your site output folder here"**

2. **Glisser votre dossier**
   - Ouvrez votre explorateur de fichiers
   - Naviguez jusqu'au dossier `iata-cbta-platform/dist`
   - **Glissez le dossier `dist` entier** dans la boîte sur Netlify
   - **OU** cliquez sur **"browse to upload"** et sélectionnez tous les fichiers du dossier `dist`

3. **Attendre le déploiement**
   - Netlify va traiter vos fichiers (30 secondes)
   - Vous verrez : **"Site deploy in progress"**
   - Puis : **"Your site is live!"** ✨

### Méthode B : Upload ZIP

1. **Si vous avez créé un ZIP**
   - Cliquez sur **"browse to upload"**
   - Sélectionnez votre fichier `site-iata-cbta.zip`
   - Cliquez **"Open"**

2. **Netlify va automatiquement :**
   - Décompresser votre ZIP
   - Déployer vos fichiers
   - Vous donner une URL

**✅ Votre site est en ligne !**

---

## 🌐 Étape 4 : Voir votre site (1 minute)

### Votre URL temporaire :

Netlify vous donne une URL automatique comme :
- `https://silly-name-123456.netlify.app`
- `https://amazing-site-789123.netlify.app`

### Tester votre site :
1. **Cliquez sur l'URL** que Netlify vous a donnée
2. **Votre site IATA CBTA s'ouvre !** 🎉
3. **Testez la navigation** : cliquez sur les menus
4. **Testez sur mobile** : redimensionnez la fenêtre

**✅ Ça marche !**

---

## 🎨 Étape 5 : Personnaliser l'adresse (5 minutes)

### Changer le nom de domaine Netlify :

1. **Dans votre dashboard Netlify**
   - Cliquez sur votre site (dans la liste de vos sites)
   - Vous arrivez sur la page de détail du site

2. **Changer le nom**
   - Cliquez sur **"Domain settings"** (dans le menu gauche)
   - OU cliquez sur **"Site settings"** → **"General"**
   - Trouvez **"Site information"**
   - Cliquez sur **"Change site name"**

3. **Choisir un nouveau nom**
   - Tapez votre nom souhaité : `cbta-formation`
   - Votre nouvelle URL sera : `https://cbta-formation.netlify.app`
   - Cliquez **"Save"**

### Suggestions de noms disponibles :
- `formation-cbta-2025`
- `centre-iata-formations`  
- `iata-dg-training`
- `cbta-learning-center`
- `formation-marchandises-dangereuses`

**✅ Votre site a maintenant une belle adresse !**

---

## ✅ Étape 6 : Vérification complète (5 minutes)

### Checklist pour débutants :

**Navigation :**
- [ ] Page d'accueil s'affiche bien
- [ ] Menu "Formations" fonctionne
- [ ] Menu "Calendrier" fonctionne  
- [ ] Menu "À propos" fonctionne
- [ ] Menu "Actualités" fonctionne
- [ ] Menu "Contact" fonctionne

**Authentification (demo) :**
- [ ] Bouton "Connexion" en haut à droite
- [ ] Connexion étudiant : `etudiant@test.fr` / `password123`
- [ ] Connexion admin : `admin@test.fr` / `admin123`
- [ ] Déconnexion fonctionne

**Responsive (mobile) :**
- [ ] Menu mobile (hamburger) fonctionne
- [ ] Texte lisible sur petit écran
- [ ] Boutons cliquables sur mobile

**Sécurité :**
- [ ] URL commence par `https://` (cadenas vert 🔒)
- [ ] Certificat SSL valide

**✅ Tout fonctionne parfaitement !**

---

## 🔄 Mettre à jour votre site

### Quand vous voulez changer quelque chose :

1. **Modifiez vos fichiers localement**
2. **Reconstruisez** : `bun run build`
3. **Re-déployez** :
   - Allez sur Netlify
   - Cliquez sur votre site
   - **"Deploys"** → **"Deploy manually"**
   - Glissez le nouveau dossier `dist`

**Ou plus simple :**
- Cliquez **"Retry deploy"** si vous voulez refaire le même déploiement

---

## 🎯 Fonctionnalités gratuites de Netlify

**Avec le plan gratuit, vous avez :**
- ✅ **SSL gratuit** (HTTPS automatique)
- ✅ **100 GB de bande passante/mois** (largement suffisant)
- ✅ **CDN mondial** (site rapide partout)
- ✅ **Domaine .netlify.app gratuit**
- ✅ **Formulaires** (500 soumissions/mois)
- ✅ **Functions serverless** (125k requêtes/mois)

---

## 🆘 Problèmes courants et solutions

### ❌ "Page non trouvée" sur certaines pages
**Solution :**
- Le fichier `_redirects` est déjà ajouté dans `public/`
- Si le problème persiste, vérifiez que le fichier `public/_redirects` est bien présent

### ❌ Site qui ne s'affiche pas correctement
**Solution :**
```bash
# Reconstruire proprement
cd iata-cbta-platform
rm -rf dist
bun run build
# Re-déployer le nouveau dossier dist
```

### ❌ Erreur "Build failed"
**Solution :**
- Utilisez l'upload manuel (glisser-déposer le dossier `dist`)
- Netlify n'a pas besoin de construire votre site, vous l'avez déjà fait

### ❌ Le nom de site est déjà pris
**Solution :**
- Ajoutez des chiffres : `cbta-formation-2025`
- Ajoutez votre ville : `cbta-formation-paris`
- Soyez créatif : `formation-iata-pro`

---

## 🎊 Félicitations !

**Votre plateforme IATA CBTA est maintenant en ligne !** 🚀

### Ce que vous avez accompli :
✅ Site professionnel déployé  
✅ SSL sécurisé activé  
✅ Adresse personnalisée  
✅ Accessible depuis le monde entier  
✅ Optimisé pour mobile et desktop  

### Votre site inclut :
- **Catalogue complet** des formations CBTA (7.1 à 7.10)
- **Calendrier** des sessions de formation
- **Espace étudiant** avec dashboard et ressources
- **Panneau admin** pour la gestion
- **Blog** pour les actualités réglementaires
- **Formulaire de contact** fonctionnel
- **Design professionnel** responsive

### Prochaines étapes possibles :
1. **Domaine personnalisé** → `cbta-formation.fr`
2. **Vraies données** → Remplacer les données de démo
3. **Emails** → Configurer l'envoi d'emails
4. **Analytics** → Suivre vos visiteurs
5. **Paiements** → Système de réservation payant

---

## 📞 Support

**Netlify :**
- [Documentation](https://docs.netlify.com)
- [Support communautaire](https://community.netlify.com)
- [Status](https://www.netlifystatus.com)

**Votre plateforme :**
- [Guide complet](./DEPLOYMENT_GUIDE.md)
- Tests de connexion : `etudiant@test.fr` / `password123`

---

**Temps total utilisé : ~20 minutes** ⏱️  
**Votre site est maintenant professionnel et accessible 24h/24 !** 🌟