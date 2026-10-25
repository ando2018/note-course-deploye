#!/usr/bin/env node
// Vide entièrement les collections MongoDB (users, courses, agenda, cards)
// pour repartir sur une base neuve. Irréversible, à ne lancer qu'à la demande.
//
// Utilisation : npm run reset:mongo

const { connectDb, closeDb } = require('../src/data/mongo');

const COLLECTIONS = ['users', 'courses', 'agenda', 'cards'];

async function main() {
  const db = await connectDb();
  for (const name of COLLECTIONS) {
    const { deletedCount } = await db.collection(name).deleteMany({});
    console.log(`${name} : ${deletedCount} document(s) supprimé(s).`);
  }
  console.log('\nMongoDB est maintenant vide (collections users/courses/agenda/cards).');
}

main()
  .catch((err) => {
    console.error('Échec de la réinitialisation :', err);
    process.exitCode = 1;
  })
  .finally(() => closeDb());
