#!/usr/bin/env node
// Migre une bonne fois les données de backend/src/data/db.json vers Firestore.
// Ce script ne fait que LIRE db.json : il n'est jamais modifié ni supprimé.
//
// Utilisation : node scripts/migrate-to-firestore.js
// (nécessite les mêmes identifiants Firebase que le serveur, voir le README)

const fs = require('fs');
const path = require('path');
const { getDb } = require('../src/data/firebase');

const DB_PATH = path.join(__dirname, '..', 'src', 'data', 'db.json');
const BATCH_SIZE = 400; // Firestore limite un batch à 500 écritures.

async function main() {
  if (!fs.existsSync(DB_PATH)) {
    console.log(`Aucun fichier ${DB_PATH} trouvé, rien à migrer.`);
    return;
  }

  const data = JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
  const db = getDb();

  const collections = {
    users: data.users || [],
    courses: data.courses || [],
    agenda: data.agenda || [],
    cards: data.cards || [],
  };

  for (const [name, items] of Object.entries(collections)) {
    if (items.length === 0) {
      console.log(`${name} : rien à migrer.`);
      continue;
    }

    for (let i = 0; i < items.length; i += BATCH_SIZE) {
      const chunk = items.slice(i, i + BATCH_SIZE);
      const batch = db.batch();

      for (const item of chunk) {
        if (!item.id) continue;
        const doc = normalize(name, item);
        batch.set(db.collection(name).doc(item.id), doc);
      }

      await batch.commit();
      console.log(`${name} : ${Math.min(i + BATCH_SIZE, items.length)}/${items.length} migrés`);
    }
  }

  console.log('\nMigration terminée. db.json est conservé tel quel (non modifié).');
}

// Même logique de compatibilité que l'ancien store.js (comptes créés avant
// le login par code, cartes créées avant le scan, etc.).
function normalize(collectionName, item) {
  const doc = { ...item };

  if (collectionName === 'users') {
    doc.emailLower = String(doc.email || '').toLowerCase();
    if (!doc.codeHash) doc.codeHash = null; // sera régénéré via "code oublié" si besoin.
    if (doc.mustResetCode === undefined) doc.mustResetCode = false;
    delete doc.passwordHash;
    delete doc.webauthnCredentials;
    delete doc.pinHash;
  }

  if (collectionName === 'cards' && !doc.format) {
    doc.format = 'CODE_128';
  }

  return doc;
}

main().catch((err) => {
  console.error('Échec de la migration :', err);
  process.exit(1);
});
