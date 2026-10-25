const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { getDb, NO_MONGO_ID } = require('../data/mongo');
const { JWT_SECRET } = require('../config');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();
const usersCol = getDb().collection('users');

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const CODE_RE = /^\d{6}$/;

function signToken(user) {
  return jwt.sign(
    { sub: user.id, email: user.email, name: user.name },
    JWT_SECRET,
    { expiresIn: '30d' }
  );
}

function findUserByEmail(email) {
  return usersCol.findOne({ emailLower: String(email).toLowerCase() }, NO_MONGO_ID);
}

/** Code provisoire prévisible pour "code oublié" : la date du jour en JJMMAA. */
function todaysProvisionalCode() {
  const now = new Date();
  const pad = (n) => String(n).padStart(2, '0');
  return `${pad(now.getDate())}${pad(now.getMonth() + 1)}${String(now.getFullYear()).slice(-2)}`;
}

// Étape 1 du login : le frontend envoie l'email pour savoir s'il doit
// proposer de créer un code (nouveau compte) ou de le saisir (compte existant).
router.post('/check-email', async (req, res) => {
  const { email } = req.body || {};
  if (!email || !EMAIL_RE.test(email)) {
    return res.status(400).json({ message: 'Email invalide' });
  }

  const user = await findUserByEmail(email);
  res.json({ exists: Boolean(user) });
});

// Nouveau compte : email + code à 6 chiffres choisi par l'utilisateur.
router.post('/register', async (req, res) => {
  const { email, code } = req.body || {};
  if (!email || !EMAIL_RE.test(email)) {
    return res.status(400).json({ message: 'Email invalide' });
  }
  if (!code || !CODE_RE.test(code)) {
    return res.status(400).json({ message: 'Le code doit contenir 6 chiffres' });
  }

  if (await findUserByEmail(email)) {
    return res.status(409).json({ message: 'Un compte existe déjà avec cet email' });
  }

  const user = {
    id: crypto.randomUUID(),
    email,
    emailLower: email.toLowerCase(),
    codeHash: bcrypt.hashSync(code, 10),
    name: email.split('@')[0],
    mustResetCode: false,
  };
  // insertOne ajoute un _id à l'objet passé : on insère une copie.
  await usersCol.insertOne({ ...user });

  const token = signToken(user);
  res.status(201).json({
    token,
    user: { id: user.id, email: user.email, name: user.name, mustResetCode: false },
  });
});

// Compte existant : email + code à 6 chiffres pour débloquer l'application.
router.post('/login', async (req, res) => {
  const { email, code } = req.body || {};
  if (!email || !code) {
    return res.status(400).json({ message: 'Email et code requis' });
  }

  const user = await findUserByEmail(email);

  if (!user || !user.codeHash || !bcrypt.compareSync(code, user.codeHash)) {
    return res.status(401).json({ message: 'Code incorrect' });
  }

  const token = signToken(user);
  res.json({
    token,
    user: { id: user.id, email: user.email, name: user.name, mustResetCode: user.mustResetCode },
  });
});

// Code oublié : réinitialise le code sur la date du jour (JJMMAA) sans
// jamais révéler ce format côté client (pas d'envoi d'email dans cette
// version). Le compte est marqué "à réinitialiser" : la prochaine connexion
// réussie devra obligatoirement être suivie de la création d'un nouveau code.
router.post('/forgot', async (req, res) => {
  const { email } = req.body || {};
  if (!email || !EMAIL_RE.test(email)) {
    return res.status(400).json({ message: 'Email invalide' });
  }

  const user = await findUserByEmail(email);
  if (!user) {
    return res.status(404).json({ message: 'Aucun compte avec cet email' });
  }

  const provisionalCode = todaysProvisionalCode();
  await usersCol.updateOne(
    { id: user.id },
    { $set: { codeHash: bcrypt.hashSync(provisionalCode, 10), mustResetCode: true } }
  );

  res.json({ ok: true });
});

// Après une connexion avec le code provisoire, le client doit définir un
// nouveau code définitif avant de pouvoir continuer à utiliser l'application.
router.post('/set-code', requireAuth, async (req, res) => {
  const { code } = req.body || {};
  if (!code || !CODE_RE.test(code)) {
    return res.status(400).json({ message: 'Le code doit contenir 6 chiffres' });
  }

  const result = await usersCol.updateOne(
    { id: req.user.id },
    { $set: { codeHash: bcrypt.hashSync(code, 10), mustResetCode: false } }
  );
  if (result.matchedCount === 0) {
    return res.status(404).json({ message: 'Compte introuvable' });
  }
  res.json({ ok: true });
});

router.get('/me', requireAuth, (req, res) => {
  res.json({ user: req.user });
});

module.exports = router;
