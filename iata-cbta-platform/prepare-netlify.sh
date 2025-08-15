#!/bin/bash

# 🌟 Script de préparation pour Netlify (Débutants)
# Usage: ./prepare-netlify.sh

echo "🌟 Préparation de votre site pour Netlify"
echo "========================================"

# Vérifier que nous sommes dans le bon répertoire
if [ ! -f "package.json" ]; then
    echo "❌ Erreur : Exécutez ce script depuis le répertoire iata-cbta-platform"
    exit 1
fi

echo "📦 1. Installation des dépendances..."
bun install

if [ $? -ne 0 ]; then
    echo "❌ Erreur lors de l'installation"
    echo "💡 Essayez : npm install"
    exit 1
fi

echo "🔨 2. Construction de votre site..."
bun run build

if [ $? -ne 0 ]; then
    echo "❌ Erreur lors de la construction"
    exit 1
fi

echo "✅ Site construit avec succès !"

echo "📊 3. Vérification des fichiers..."
if [ -d "dist" ]; then
    echo "   ✅ Dossier dist/ créé"
    echo "   📁 Taille : $(du -sh dist | cut -f1)"
    echo "   📄 Fichiers : $(find dist -type f | wc -l) fichiers"
    
    # Vérifier les fichiers essentiels
    if [ -f "dist/index.html" ]; then
        echo "   ✅ index.html présent"
    else
        echo "   ❌ index.html manquant"
    fi
    
    if [ -d "dist/assets" ]; then
        echo "   ✅ Dossier assets/ présent"
    else
        echo "   ❌ Dossier assets/ manquant"
    fi
else
    echo "   ❌ Dossier dist/ introuvable"
    exit 1
fi

echo "🔧 4. Vérification de la configuration Netlify..."
if [ -f "netlify.toml" ]; then
    echo "   ✅ netlify.toml configuré"
else
    echo "   ❌ netlify.toml manquant"
fi

if [ -f "public/_redirects" ]; then
    echo "   ✅ Fichier _redirects présent"
else
    echo "   ❌ Fichier _redirects manquant"
fi

echo ""
echo "🎯 VOTRE SITE EST PRÊT POUR NETLIFY !"
echo ""
echo "📋 Prochaines étapes :"
echo "1. Allez sur https://netlify.com"
echo "2. Créez un compte gratuit"
echo "3. Glissez-déposez le dossier 'dist' complet"
echo "4. Votre site sera en ligne en 2 minutes !"
echo ""
echo "📁 Fichiers à déployer :"
echo "   → Tout le contenu du dossier 'dist/'"
echo "   → Ne pas déployer les fichiers sources (src/, node_modules/, etc.)"
echo ""
echo "🌐 Votre site sera accessible sur : https://nom-unique.netlify.app"
echo ""
echo "✨ Bon déploiement ! 🚀"