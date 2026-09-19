const fs = require('fs');
const path = require('path');
const admin = require('firebase-admin');

// Le backend a besoin d'un accès "admin" (clé de compte de service), pas du
// SDK client — c'est le seul moyen d'écrire dans Firestore sans passer par
// des règles de sécurité pensées pour un accès direct depuis le navigateur.
//
// Deux façons de fournir les identifiants (une seule est nécessaire) :
//   - FIREBASE_SERVICE_ACCOUNT_JSON : le contenu JSON de la clé, tel quel
//     (pratique pour une variable d'environnement sur un serveur de prod).
//   - FIREBASE_SERVICE_ACCOUNT_PATH : chemin vers le fichier .json de la clé
//     (pratique en local). Défaut : backend/firebase-service-account.json,
//     un fichier volontairement ignoré par git (voir .gitignore).
function loadServiceAccount() {
  if (process.env.FIREBASE_SERVICE_ACCOUNT_JSON) {
    return JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON);
  }

  const keyPath =
    process.env.FIREBASE_SERVICE_ACCOUNT_PATH ||
    path.join(__dirname, '..', '..', 'firebase-service-account.json');

  if (!fs.existsSync(keyPath)) {
    throw new Error(
      "Clé de compte de service Firebase introuvable. Définissez FIREBASE_SERVICE_ACCOUNT_JSON " +
        `ou FIREBASE_SERVICE_ACCOUNT_PATH, ou placez le fichier à : ${keyPath}`
    );
  }
  return JSON.parse(fs.readFileSync(keyPath, 'utf-8'));
}

let app;
function getApp() {
  if (!app) {
    const serviceAccount = loadServiceAccount();
    app = admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  }
  return app;
}

function getDb() {
  return getApp().firestore();
}

module.exports = { getDb };
