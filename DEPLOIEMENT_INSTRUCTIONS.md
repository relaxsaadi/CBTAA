# 🚀 INSTRUCTIONS DE DÉPLOIEMENT EXPRESS

## ✅ Votre plateforme est prête !

**Taille du build** : 560KB (optimisé)  
**Fichiers générés** : 6 fichiers essentiels  
**Configuration** : Vercel optimisée  

---

## 🎯 3 Options de déploiement (choisissez une)

### Option 1️⃣ : Script automatique (Le plus simple)
```bash
cd iata-cbta-platform
./deploy.sh
```
Puis suivez les instructions à l'écran.

### Option 2️⃣ : Vercel CLI (Le plus rapide)
```bash
# Installer Vercel CLI (une seule fois)
npm install -g vercel

# Se connecter (une seule fois)
vercel login

# Déployer
cd iata-cbta-platform
vercel --prod
```

### Option 3️⃣ : Interface Vercel (Le plus visuel)
1. Allez sur [vercel.com](https://vercel.com)
2. Créez un compte (gratuit)
3. Cliquez "New Project"
4. Glissez-déposez le dossier `iata-cbta-platform`
5. Cliquez "Deploy"

---

## 🎊 Résultat attendu

**URL de votre site** : `https://nom-unique.vercel.app`

### Fonctionnalités actives :
✅ Site complet avec toutes les pages  
✅ SSL automatique (HTTPS sécurisé)  
✅ CDN global (rapide partout dans le monde)  
✅ Responsive (mobile + desktop)  
✅ Authentification démo (étudiant/admin)  
✅ Formulaires de contact  
✅ Catalogue de formations CBTA  
✅ Calendrier des sessions  

---

## ⏱️ Temps estimé : 15 minutes

1. **Création compte Vercel** : 2 minutes
2. **Configuration projet** : 3 minutes  
3. **Déploiement** : 2 minutes
4. **Vérification** : 5 minutes
5. **Personnalisation URL** : 3 minutes

---

## 🆘 Aide immédiate

**Problème de build ?**
```bash
cd iata-cbta-platform
bun install
bun run build
```

**Erreur Vercel ?**
- Vérifiez que `vercel.json` est présent
- Framework : Vite
- Build Command : `bun run build`  
- Output Directory : `dist`

**Questions ?**
- Documentation Vercel : [vercel.com/docs](https://vercel.com/docs)
- Support : [vercel.com/support](https://vercel.com/support)

---

## 🎯 Après le déploiement

Votre plateforme sera accessible avec :
- **Accès étudiant** : `etudiant@test.fr` / `password123`
- **Accès admin** : `admin@test.fr` / `admin123`

**Prochaines étapes possibles :**
1. Personnaliser l'URL Vercel
2. Acheter un domaine personnalisé  
3. Configurer Google Analytics
4. Ajouter des vraies données
5. Configurer les emails

---

## 🏁 Commande rapide

**Pour déployer maintenant :**
```bash
cd iata-cbta-platform && vercel --prod
```

**C'est parti ! 🚀**