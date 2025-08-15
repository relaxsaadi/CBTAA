# 🚀 Guide de Déploiement - Plateforme IATA CBTA

## 📋 Étapes de déploiement en production

### 1. Préparation du build de production

#### A. Optimisation des assets
```bash
# Dans le répertoire de votre projet
cd iata-cbta-platform

# Installer les dépendances si nécessaire
bun install

# Créer le build optimisé pour la production
bun run build
```

#### B. Configuration des variables d'environnement
Créez un fichier `.env.production` :
```env
# Configuration de production
VITE_API_URL=https://api.votre-domaine.fr
VITE_SITE_URL=https://votre-domaine.fr
VITE_GA_TRACKING_ID=G-XXXXXXXXXX
VITE_CONTACT_EMAIL=contact@votre-domaine.fr
VITE_PHONE=+33123456789
```

### 2. Choix de la plateforme d'hébergement

## Option A: Vercel (Recommandé - Simple et performant)

### Avantages :
- Déploiement automatique depuis Git
- SSL gratuit
- CDN global intégré
- Optimisations automatiques
- Support excellent pour React/Vite

### Étapes :
1. **Créer un compte sur [Vercel](https://vercel.com)**
2. **Connecter votre repository Git** (GitHub, GitLab, Bitbucket)
3. **Import du projet** :
   - Cliquez sur "New Project"
   - Importez votre repository
   - Framework: Vite
   - Build Command: `bun run build`
   - Output Directory: `dist`

4. **Configuration des variables d'environnement** :
   - Dans le dashboard Vercel > Project Settings > Environment Variables
   - Ajoutez toutes vos variables `.env.production`

## Option B: Netlify (Alternative excellent)

### Avantages :
- Interface intuitive
- Fonctions serverless incluses
- Formulaires intégrés
- SSL automatique

### Étapes :
1. **Compte sur [Netlify](https://netlify.com)**
2. **Drag & Drop ou Git** :
   - Glissez votre dossier `dist` OU
   - Connectez votre repo Git
3. **Build settings** :
   - Build command: `bun run build`
   - Publish directory: `dist`

## Option C: OVH/Hostinger (Hébergement français)

### Pour la conformité RGPD et hébergement en France :
1. **OVH Web Hosting** ou **Hostinger**
2. **Upload via FTP** du contenu du dossier `dist`
3. **Configuration du domaine** dans le panel

---

### 3. Configuration du domaine personnalisé

#### A. Achat du domaine
**Recommandations de registrars :**
- **OVH** (français, bon support)
- **Gandi** (français, éthique)
- **Namecheap** (international, bon prix)
- **Google Domains** (simplicité)

**Suggestions de noms :**
- `cbta-formation.fr`
- `formation-iata.fr` 
- `centre-cbta.fr`
- `iata-dg-formation.fr`

#### B. Configuration DNS

**Pour Vercel :**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com

Type: A
Name: @
Value: 76.76.19.61 (IP Vercel)
```

**Pour Netlify :**
```
Type: CNAME  
Name: www
Value: your-site.netlify.app

Type: ALIAS/ANAME
Name: @
Value: your-site.netlify.app
```

#### C. Configuration SSL/HTTPS
- **Automatique** sur Vercel/Netlify
- **Let's Encrypt gratuit** sur la plupart des hébergeurs
- **Redirection HTTP → HTTPS** à configurer

---

### 4. Configuration spécifique production

#### A. Fichier de configuration Vercel
Créez `vercel.json` :
```json
{
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": { "distDir": "dist" }
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options", 
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    }
  ]
}
```

#### B. Fichier _redirects pour Netlify
Créez `public/_redirects` :
```
/* /index.html 200
/api/* https://votre-api.fr/api/:splat 200
```

---

### 5. Optimisations post-déploiement

#### A. Google Analytics
```html
<!-- Dans index.html -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_TRACKING_ID');
</script>
```

#### B. Google Search Console
1. **Ajouter votre site** sur [Google Search Console](https://search.google.com/search-console)
2. **Vérifier la propriété** via balise HTML ou DNS
3. **Soumettre votre sitemap** : `https://votre-domaine.fr/sitemap.xml`

#### C. Performance monitoring
```javascript
// Web Vitals
import { onLCP, onFID, onCLS } from 'web-vitals';

onCLS(console.log);
onFID(console.log);
onLCP(console.log);
```

---

### 6. Sécurité et maintenance

#### A. Headers de sécurité
```javascript
// Dans vite.config.ts
export default defineConfig({
  // ...
  server: {
    headers: {
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'X-XSS-Protection': '1; mode=block',
      'Strict-Transport-Security': 'max-age=31536000; includeSubDomains'
    }
  }
})
```

#### B. Sauvegarde et CI/CD
```yaml
# .github/workflows/deploy.yml
name: Deploy to Production
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
      - run: bun install
      - run: bun run build
      - run: bun run test
```

---

### 7. Checklist de déploiement

- [ ] **Build de production** testé localement
- [ ] **Variables d'environnement** configurées
- [ ] **Domaine** acheté et configuré
- [ ] **DNS** pointant vers l'hébergement
- [ ] **SSL/HTTPS** activé et fonctionnel
- [ ] **Redirections** HTTP → HTTPS
- [ ] **Google Analytics** configuré
- [ ] **Search Console** configuré avec sitemap
- [ ] **Performance** testée (PageSpeed Insights)
- [ ] **Accessibilité** validée
- [ ] **Responsive** testé sur tous devices
- [ ] **Formulaires** testés et fonctionnels
- [ ] **Emails** de contact configurés

---

### 8. Coûts estimés

**Domaine .fr** : 8-15€/an
**Hébergement Vercel Pro** : 20$/mois (si trafic important)
**Hébergement Netlify Pro** : 19$/mois
**Hébergement OVH** : 3-10€/mois

**Total pour commencer** : ~100-200€/an

---

### 9. Support et monitoring

#### A. Monitoring d'uptime
- **UptimeRobot** (gratuit)
- **Pingdom** (payant)

#### B. Analytics avancés
- **Google Analytics 4**
- **Hotjar** (heatmaps)
- **Sentry** (error tracking)

---

## 🎯 Recommandation finale

**Pour débuter** : **Vercel + domaine OVH**
- Simplicité maximale
- Performance excellente  
- Coût réduit (~100€/an)
- Scaling automatique

**Commandes pour démarrer maintenant :**
```bash
# 1. Préparer le build
bun run build

# 2. Installer Vercel CLI
npm i -g vercel

# 3. Déployer
vercel --prod

# 4. Configurer le domaine dans le dashboard Vercel
```

Votre plateforme sera en ligne en moins d'1 heure ! 🚀