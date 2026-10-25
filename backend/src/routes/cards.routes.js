const express = require('express');
const crypto = require('crypto');
const { getDb, NO_MONGO_ID } = require('../data/mongo');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();
router.use(requireAuth);

const cardsCol = getDb().collection('cards');

const MAX_PHOTO_LENGTH = 4 * 1024 * 1024; // ~4 Mo en base64, la photo est déjà compressée côté client

async function findCardOrFail(id, ownerId, res) {
  const card = await cardsCol.findOne({ id, ownerId }, NO_MONGO_ID);
  if (!card) {
    res.status(404).json({ message: 'Carte introuvable' });
    return null;
  }
  return card;
}

function isValidPhoto(photo) {
  return typeof photo === 'string' && photo.startsWith('data:image/');
}

// GET /api/cards - toutes les cartes de fidélité de l'utilisateur
router.get('/', async (req, res) => {
  const cards = await cardsCol
    .find({ ownerId: req.user.id }, NO_MONGO_ID)
    .sort({ updatedAt: -1 })
    .toArray();
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

  // insertOne ajoute un _id à l'objet passé : on insère une copie.
  await cardsCol.insertOne({ ...card });
  res.status(201).json(card);
});

// PUT /api/cards/:id - modifier le nom, le code et/ou la photo
router.put('/:id', async (req, res) => {
  const card = await findCardOrFail(req.params.id, req.user.id, res);
  if (!card) return;

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

  await cardsCol.updateOne({ id: card.id }, { $set: changes });
  res.json({ ...card, ...changes });
});

// DELETE /api/cards/:id
router.delete('/:id', async (req, res) => {
  const card = await findCardOrFail(req.params.id, req.user.id, res);
  if (!card) return;
  await cardsCol.deleteOne({ id: card.id });
  res.status(204).end();
});

module.exports = router;
