# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


# PredictionAstreIPS

## Introduction

**PredictionAstreIPS** est une application web développée avec React et Vite, conçue pour prédire les futurs choix de filière des étudiants de 3A à l’Ensim, savoir s'ils s'orienteront vers la filière ASTRE ou alors vers la filière IPS. Les résultats seront affichés sous un graphique et les hypothèses contiendront des pondérations modifiables.

## Fonctionnalités

- **Poids Personnalisables :** Ajuste l'importance de chaque catégorie pour affiner les calculs des scores.
- **Tableau des Hypothèses Interactif :** Modifie les hypothèses et leurs poids directement au sein de l'application.
- **Visualisation des Scores :** Consulte la distribution des scores à travers des graphiques intégrés.
- **Données Persistantes :** Les configurations et les poids sont sauvegardés automatiquement et persistent entre les sessions grâce au `localStorage`.
- **Interface Réactive :** Compatible avec divers appareils et tailles d'écran pour une expérience utilisateur optimale.

## Technologies Utilisées

- **React** : Bibliothèque JavaScript pour la création d'interfaces utilisateur.
- **Vite** : Outil de build frontend rapide.
- **Firebase Hosting** : Hébergement et déploiement de l'application web.
- **Firebase CLI** : Interface en ligne de commande pour les services Firebase.
- **Papa Parse** : Bibliothèque de parsing CSV pour JavaScript.
- **Chart.js** : Bibliothèque de graphiques pour la visualisation des données.

## Installation

Suivez les étapes ci-dessous pour configurer le projet localement :

1. **Cloner le Dépôt**

   ```bash
   git clone https://github.com/MarieAngeMBALA/PredictionAstreIPS.git
   cd PredictionAstreIPS

2. **Installer les Dépendances**  
    npm install

3. **Demarrer l'application en local** 
    npm run dev

4. **Heberger sur Firebase**  
    Node.js et npm 
    node -v
    npm -v

    Firebase CLI installée
    npm install -g firebase-tools

    Se Connecter à Firebase
    firebase login

    firebase init
    npm run build
    firebase deploy

N'oubliez pas de verifier le fichier firebase.json et configurer public : dist

Vite.config.js

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist'
  }
})
