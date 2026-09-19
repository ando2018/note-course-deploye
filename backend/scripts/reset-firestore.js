#!/usr/bin/env node
// Vide entièrement les collections Firestore (users, courses, agenda, cards)
// pour repartir sur une base neuve. Action confirmée explicitement par
// l'utilisateur — irréversible, à ne lancer qu'à la demande.
//
// Utilisation : node scripts/reset-firestore.js

const { getDb } = require('../src/data/firebase');

const COLLECTIONS = ['users', 'courses', 'agenda', 'cards'];
const BATCH_SIZE = 400;

async function clearCollection(db, name) {
  const snap = await db.collection(name).get();
  if (snap.empty) {
    console.log(`${name} : déjà vide.`);
    return;
  }

  const docs = snap.docs;
  for (let i = 0; i < docs.length; i += BATCH_SIZE) {
    const batch = db.batch();
    for (const doc of docs.slice(i, i + BATCH_SIZE)) {
      batch.delete(doc.ref);
    }
    await batch.commit();
  }
  console.log(`${name} : ${docs.length} document(s) supprimé(s).`);
}

async function main() {
  const db = getDb();
  for (const name of COLLECTIONS) {
    await clearCollection(db, name);
  }
  console.log('\nFirestore est maintenant vide (collections users/courses/agenda/cards).');
}

main().catch((err) => {
  console.error('Échec de la réinitialisation :', err);
  process.exit(1);
});
