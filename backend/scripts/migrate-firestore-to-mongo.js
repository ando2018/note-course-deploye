#!/usr/bin/env node
// Recopie une bonne fois toutes les données Firestore (users, courses,
// agenda, cards) vers MongoDB, en conservant les mêmes identifiants : les
// sessions déjà connectées restent valides après la migration.
// Firestore n'est que LU : rien n'y est modifié ni supprimé.
// Relançable sans risque : chaque document est upserté par son `id`.
//
// Utilisation : npm run migrate:mongo
// (nécessite MONGODB_URI + la clé Firebase habituelle, voir le README)

const { getDb: getFirestore } = require('../src/data/firebase');
const { connectDb, closeDb } = require('../src/data/mongo');

const COLLECTIONS = ['users', 'courses', 'agenda', 'cards'];

async function main() {
  const firestore = getFirestore();
  const mongo = await connectDb();

  for (const name of COLLECTIONS) {
    const snap = await firestore.collection(name).get();
    if (snap.empty) {
      console.log(`${name} : rien à migrer.`);
      continue;
    }

    const ops = snap.docs.map((d) => {
      const doc = { id: d.id, ...d.data() };
      return { replaceOne: { filter: { id: doc.id }, replacement: doc, upsert: true } };
    });

    await mongo.collection(name).bulkWrite(ops, { ordered: false });
    console.log(`${name} : ${ops.length} document(s) migré(s).`);
  }

  console.log('\nMigration terminée. Firestore est conservé tel quel (non modifié).');
}

main()
  .catch((err) => {
    console.error('Échec de la migration :', err);
    process.exitCode = 1;
  })
  .finally(() => closeDb());
