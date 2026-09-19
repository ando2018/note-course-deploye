const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { getDb } = require('../data/firebase');
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

async function findUserDocByEmail(email) {
  const snap = await usersCol.where('emailLower', '==', String(email).toLowerCase()).limit(1).get();
  return snap.empty ? null : snap.docs[0];
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

  const doc = await findUserDocByEmail(email);
  res.json({ exists: Boolean(doc) });
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

  if (await findUserDocByEmail(email)) {
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
  await usersCol.doc(user.id).set(user);

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

  const doc = await findUserDocByEmail(email);
  const user = doc?.data();

  if (!user || !bcrypt.compareSync(code, user.codeHash)) {
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

  const doc = await findUserDocByEmail(email);
  if (!doc) {
    return res.status(404).json({ message: 'Aucun compte avec cet email' });
  }

  const provisionalCode = todaysProvisionalCode();
  await doc.ref.update({
    codeHash: bcrypt.hashSync(provisionalCode, 10),
    mustResetCode: true,
  });

  res.json({ ok: true });
});

// Après une connexion avec le code provisoire, le client doit définir un
// nouveau code définitif avant de pouvoir continuer à utiliser l'application.
router.post('/set-code', requireAuth, async (req, res) => {
  const { code } = req.body || {};
  if (!code || !CODE_RE.test(code)) {
    return res.status(400).json({ message: 'Le code doit contenir 6 chiffres' });
  }

  const ref = usersCol.doc(req.user.id);
  const doc = await ref.get();
  if (!doc.exists) {
    return res.status(404).json({ message: 'Compte introuvable' });
  }

  await ref.update({ codeHash: bcrypt.hashSync(code, 10), mustResetCode: false });
  res.json({ ok: true });
});

router.get('/me', requireAuth, (req, res) => {
  res.json({ user: req.user });
});

module.exports = router;
