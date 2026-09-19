const express = require('express');
const crypto = require('crypto');
const { getDb } = require('../data/firebase');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();
router.use(requireAuth);

const cardsCol = getDb().collection('cards');

const MAX_PHOTO_LENGTH = 4 * 1024 * 1024; // ~4 Mo en base64, la photo est déjà compressée côté client

async function findCardOrFail(id, ownerId, res) {
  const doc = await cardsCol.doc(id).get();
  if (!doc.exists || doc.data().ownerId !== ownerId) {
    res.status(404).json({ message: 'Carte introuvable' });
    return null;
  }
  return doc;
}

function isValidPhoto(photo) {
  return typeof photo === 'string' && photo.startsWith('data:image/');
}

// GET /api/cards - toutes les cartes de fidélité de l'utilisateur
router.get('/', async (req, res) => {
  const snap = await cardsCol.where('ownerId', '==', req.user.id).get();
  const cards = snap.docs
    .map((d) => d.data())
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
  res.json(cards);
});

// POST /api/cards - enregistrer une nouvelle carte (code scanné + nom, photo optionnelle)
router.post('/', async (req, res) => {
  const { name, code, format, photo } = req.body || {};
  if (!name || !String(name).trim()) {
    return res.status(400).json({ message: 'Le nom de la carte est requis' });
  }
  if (!code || !String(code).trim()) {
    return res.status(400).json({ message: 'Le code de la carte est requis' });
  }
  if (photo && !isValidPhoto(photo)) {
    return res.status(400).json({ message: 'Photo invalide' });
  }
  if (photo && photo.length > MAX_PHOTO_LENGTH) {
    return res.status(413).json({ message: 'Photo trop volumineuse' });
  }

  const now = new Date().toISOString();
  const card = {
    id: crypto.randomUUID(),
    ownerId: req.user.id,
    name: String(name).trim(),
    code: String(code).trim(),
    format: format ? String(format).trim() : 'CODE_128',
    photo: photo || null,
    createdAt: now,
    updatedAt: now,
  };

  await cardsCol.doc(card.id).set(card);
  res.status(201).json(card);
});

// PUT /api/cards/:id - modifier le nom, le code et/ou la photo
router.put('/:id', async (req, res) => {
  const doc = await findCardOrFail(req.params.id, req.user.id, res);
  if (!doc) return;

  const { name, code, format, photo } = req.body || {};
  const changes = { updatedAt: new Date().toISOString() };
  if (name !== undefined) {
    if (!String(name).trim()) {
      return res.status(400).json({ message: 'Le nom de la carte est requis' });
    }
    changes.name = String(name).trim();
  }
  if (code !== undefined) {
    if (!String(code).trim()) {
      return res.status(400).json({ message: 'Le code de la carte est requis' });
    }
    changes.code = String(code).trim();
  }
  if (format !== undefined) {
    changes.format = String(format).trim() || 'CODE_128';
  }
  if (photo !== undefined) {
    if (photo && !isValidPhoto(photo)) {
      return res.status(400).json({ message: 'Photo invalide' });
    }
    if (photo && photo.length > MAX_PHOTO_LENGTH) {
      return res.status(413).json({ message: 'Photo trop volumineuse' });
    }
    changes.photo = photo || null;
  }

  await doc.ref.update(changes);
  res.json({ ...doc.data(), ...changes });
});

// DELETE /api/cards/:id
router.delete('/:id', async (req, res) => {
  const doc = await findCardOrFail(req.params.id, req.user.id, res);
  if (!doc) return;
  await doc.ref.delete();
  res.status(204).end();
});

module.exports = router;
