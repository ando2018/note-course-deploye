const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { load, save } = require('../data/store');
const { JWT_SECRET } = require('../config');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const CODE_RE = /^\d{6}$/;

function signToken(user) {
  return jwt.sign(
    { sub: user.id, email: user.email, name: user.name },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
}

function findByEmail(data, email) {
  return data.users.find((u) => u.email.toLowerCase() === String(email).toLowerCase());
}

/** Code provisoire prévisible pour "code oublié" : la date du jour en JJMMAA. */
function todaysProvisionalCode() {
  const now = new Date();
  const pad = (n) => String(n).padStart(2, '0');
  return `${pad(now.getDate())}${pad(now.getMonth() + 1)}${String(now.getFullYear()).slice(-2)}`;
}

// Étape 1 du login : le frontend envoie l'email pour savoir s'il doit
// proposer de créer un code (nouveau compte) ou de le saisir (compte existant).
router.post('/check-email', (req, res) => {
  const { email } = req.body || {};
  if (!email || !EMAIL_RE.test(email)) {
    return res.status(400).json({ message: 'Email invalide' });
  }

  const data = load();
  const exists = Boolean(findByEmail(data, email));
  res.json({ exists });
});

// Nouveau compte : email + code à 6 chiffres choisi par l'utilisateur.
router.post('/register', (req, res) => {
  const { email, code } = req.body || {};
  if (!email || !EMAIL_RE.test(email)) {
    return res.status(400).json({ message: 'Email invalide' });
  }
  if (!code || !CODE_RE.test(code)) {
    return res.status(400).json({ message: 'Le code doit contenir 6 chiffres' });
  }

  const data = load();
  if (findByEmail(data, email)) {
    return res.status(409).json({ message: 'Un compte existe déjà avec cet email' });
  }

  const user = {
    id: crypto.randomUUID(),
    email,
    codeHash: bcrypt.hashSync(code, 10),
    name: email.split('@')[0],
    mustResetCode: false,
  };
  data.users.push(user);
  save(data);

  const token = signToken(user);
  res.status(201).json({
    token,
    user: { id: user.id, email: user.email, name: user.name, mustResetCode: false },
  });
});

// Compte existant : email + code à 6 chiffres pour débloquer l'application.
router.post('/login', (req, res) => {
  const { email, code } = req.body || {};
  if (!email || !code) {
    return res.status(400).json({ message: 'Email et code requis' });
  }

  const data = load();
  const user = findByEmail(data, email);

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
router.post('/forgot', (req, res) => {
  const { email } = req.body || {};
  if (!email || !EMAIL_RE.test(email)) {
    return res.status(400).json({ message: 'Email invalide' });
  }

  const data = load();
  const user = findByEmail(data, email);
  if (!user) {
    return res.status(404).json({ message: 'Aucun compte avec cet email' });
  }

  const provisionalCode = todaysProvisionalCode();
  user.codeHash = bcrypt.hashSync(provisionalCode, 10);
  user.mustResetCode = true;
  save(data);

  res.json({ ok: true });
});

// Après une connexion avec le code provisoire, le client doit définir un
// nouveau code définitif avant de pouvoir continuer à utiliser l'application.
router.post('/set-code', requireAuth, (req, res) => {
  const { code } = req.body || {};
  if (!code || !CODE_RE.test(code)) {
    return res.status(400).json({ message: 'Le code doit contenir 6 chiffres' });
  }

  const data = load();
  const user = data.users.find((u) => u.id === req.user.id);
  if (!user) {
    return res.status(404).json({ message: 'Compte introuvable' });
  }

  user.codeHash = bcrypt.hashSync(code, 10);
  user.mustResetCode = false;
  save(data);

  res.json({ ok: true });
});

router.get('/me', requireAuth, (req, res) => {
  res.json({ user: req.user });
});

module.exports = router;
