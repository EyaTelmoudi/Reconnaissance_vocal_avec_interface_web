# Projet de Reconnaissance Vocale avec Node.js et Vosk

## Description

Ce projet est une interface web simple qui permet de tester un module de reconnaissance vocale en français.  
Il utilise **Node.js** comme serveur backend et **Vosk** pour la reconnaissance de la parole.  

Sur la page web, vous trouverez :
- Un bouton micro 🎤 pour parler.
- Le texte que vous avez prononcé sera affiché en temps réel.

---

## Prérequis

Avant de pouvoir utiliser ce projet, vous devez :

1. Télécharger le modèle Vosk français **vosk-model-fr-0.22** depuis le site officiel :
   - [Télécharger vosk-model-fr-0.22](https://alphacephei.com/vosk/models)

2. Placer le dossier téléchargé dans le projet, sous le chemin suivant : ./vosk-model-fr-0.22/

⚠️ Assurez-vous que le modèle est bien dans le dossier racine du projet pour que tout fonctionne correctement.

---

## Installation

1. Clonez le dépôt :
`bash
git clone https://github.com/votre-utilisateur/nom-du-repo.git
cd nom-du-repo


2. Installez les dépendances :

npm install


3. Lancer le serveur
Démarrez votre serveur Node.js avec :

node server.js


 Utilisation
Ouvrez votre navigateur à l'adresse :

http://localhost:3000
Cliquez sur le bouton "Micro" 🎤.

Parlez, et votre message sera reconnu et affiché !


Technologies utilisées
Node.js

Vosk Speech Recognition API

HTML / CSS / JavaScript (Frontend)

Remarques importantes
Ce projet fonctionne uniquement en local pour des raisons de permissions du micro.

Utilisez Google Chrome pour éviter des problèmes d'accès au microphone.

La qualité de la reconnaissance dépend de la clarté de votre voix et du bruit ambiant.


Auteur
[Aya Telmoudi]



