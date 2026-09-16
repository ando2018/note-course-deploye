const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

const DB_PATH = path.join(__dirname, 'db.json');
const DEMO_CODE = '123456';

function defaultData() {
  return {
    users: [
      {
        id: 'u1',
        email: 'demo@course.local',
        codeHash: bcrypt.hashSync(DEMO_CODE, 10),
        name: 'Demo',
        mustResetCode: false,
      },
    ],
    courses: [],
    agenda: [],
    cards: [],
  };
}

function load() {
  if (!fs.existsSync(DB_PATH)) {
    const data = defaultData();
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
    return data;
  }
  const raw = fs.readFileSync(DB_PATH, 'utf-8');
  const data = JSON.parse(raw);
  // Compatibilité avec un fichier existant créé avant l'ajout de l'agenda,
  // des cartes de fidélité, et avant le passage au login par code à 6
  // chiffres (ex mot de passe / WebAuthn).
  if (!data.agenda) data.agenda = [];
  if (!data.cards) data.cards = [];
  for (const card of data.cards) {
    // Cartes créées avant l'ajout du scan : on leur attribue un format
    // générique pour qu'elles restent affichables comme code-barres.
    if (!card.format) card.format = 'CODE_128';
  }
  for (const user of data.users) {
    if (!user.codeHash) {
      // Ancien compte : on lui attribue le code de démo pour rester utilisable.
      user.codeHash = bcrypt.hashSync(DEMO_CODE, 10);
    }
    if (user.mustResetCode === undefined) user.mustResetCode = false;
    delete user.passwordHash;
    delete user.webauthnCredentials;
    delete user.pinHash;
  }
  return data;
}

function save(data) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

module.exports = { load, save, DEMO_CODE };
