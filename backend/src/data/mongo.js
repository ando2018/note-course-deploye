const { MongoClient } = require('mongodb');
const { MONGODB_URI, MONGODB_DB } = require('../config');

// Un seul client partagé par tout le process : le driver gère lui-même le
// pool de connexions. getDb() est synchrone (les routes l'appellent au
// chargement du module) ; la vraie connexion est établie par connectDb()
// au démarrage du serveur, ou à défaut à la première requête.
//
// Chaque document garde son champ `id` (UUID) comme identifiant applicatif,
// exactement comme avec Firestore : le frontend ne voit aucune différence.
// Le `_id` interne de MongoDB n'est jamais renvoyé (voir NO_MONGO_ID).
if (!MONGODB_URI) {
  throw new Error(
    'MONGODB_URI non défini. Renseignez-le dans backend/.env ' +
      '(voir .env.example), ex. mongodb://localhost:27017 ou une URI MongoDB Atlas.'
  );
}

const client = new MongoClient(MONGODB_URI);
const NO_MONGO_ID = { projection: { _id: 0 } };

function getDb() {
  return client.db(MONGODB_DB);
}

async function connectDb() {
  await client.connect();
  const db = getDb();
  await Promise.all([
    db.collection('users').createIndex({ id: 1 }, { unique: true }),
    db.collection('users').createIndex({ emailLower: 1 }, { unique: true }),
    ...['courses', 'agenda', 'cards'].flatMap((name) => [
      db.collection(name).createIndex({ id: 1 }, { unique: true }),
      db.collection(name).createIndex({ ownerId: 1 }),
    ]),
  ]);
  return db;
}

async function closeDb() {
  await client.close();
}

module.exports = { getDb, connectDb, closeDb, NO_MONGO_ID };
