#!/bin/bash

# 🚀 Script de déploiement automatique pour Vercel
# Usage: ./deploy.sh

echo "🚀 Déploiement IATA CBTA Platform sur Vercel"
echo "=============================================="

# Vérifier que nous sommes dans le bon répertoire
if [ ! -f "package.json" ]; then
    echo "❌ Erreur : Exécutez ce script depuis le répertoire du projet"
    exit 1
fi

echo "📦 1. Installation des dépendances..."
bun install

echo "🔨 2. Build de production..."
bun run build

if [ $? -ne 0 ]; then
    echo "❌ Erreur lors du build"
    exit 1
fi

echo "✅ Build réussi !"

echo "📊 3. Statistiques du build :"
echo "   • Taille dist/ : $(du -sh dist | cut -f1)"
echo "   • Fichiers générés : $(find dist -type f | wc -l)"

echo ""
echo "🎯 Prêt pour le déploiement !"
echo ""
echo "Options de déploiement :"
echo "📌 Option 1 - Vercel CLI (Plus rapide) :"
echo "   npm install -g vercel"
echo "   vercel login"
echo "   vercel --prod"
echo ""
echo "📌 Option 2 - Upload manuel :"
echo "   1. Allez sur https://vercel.com"
echo "   2. Glissez-déposez le dossier 'dist'"
echo ""
echo "📌 Option 3 - GitHub (Recommandé) :"
echo "   1. Créez un repo GitHub"
echo "   2. git init && git add . && git commit -m 'Initial commit'"
echo "   3. git remote add origin VOTRE_REPO_URL"
echo "   4. git push -u origin main"
echo "   5. Importez le repo sur Vercel"
echo ""
echo "🌐 Votre site sera accessible sur : https://nom-unique.vercel.app"
echo ""
echo "✨ Bon déploiement !"