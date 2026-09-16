const express = require('express');
const crypto = require('crypto');
const { load, save } = require('../data/store');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();
router.use(requireAuth);

const MAX_PHOTO_LENGTH = 4 * 1024 * 1024; // ~4 Mo en base64, la photo est déjà compressée côté client

function findCardOrFail(data, id, ownerId, res) {
  const card = data.cards.find((c) => c.id === id && c.ownerId === ownerId);
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
router.get('/', (req, res) => {
  const data = load();
  const cards = data.cards
    .filter((c) => c.ownerId === req.user.id)
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
  res.json(cards);
});

// POST /api/cards - enregistrer une nouvelle carte (code scanné + nom, photo optionnelle)
router.post('/', (req, res) => {
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

  const data = load();
  data.cards.push(card);
  save(data);
  res.status(201).json(card);
});

// PUT /api/cards/:id - modifier le nom, le code et/ou la photo
router.put('/:id', (req, res) => {
  const data = load();
  const card = findCardOrFail(data, req.params.id, req.user.id, res);
  if (!card) return;

  const { name, code, format, photo } = req.body || {};
  if (name !== undefined) {
    if (!String(name).trim()) {
      return res.status(400).json({ message: 'Le nom de la carte est requis' });
    }
    card.name = String(name).trim();
  }
  if (code !== undefined) {
    if (!String(code).trim()) {
      return res.status(400).json({ message: 'Le code de la carte est requis' });
    }
    card.code = String(code).trim();
  }
  if (format !== undefined) {
    card.format = String(format).trim() || 'CODE_128';
  }
  if (photo !== undefined) {
    if (photo && !isValidPhoto(photo)) {
      return res.status(400).json({ message: 'Photo invalide' });
    }
    if (photo && photo.length > MAX_PHOTO_LENGTH) {
      return res.status(413).json({ message: 'Photo trop volumineuse' });
    }
    card.photo = photo || null;
  }
  card.updatedAt = new Date().toISOString();

  save(data);
  res.json(card);
});

// DELETE /api/cards/:id
router.delete('/:id', (req, res) => {
  const data = load();
  const idx = data.cards.findIndex(
    (c) => c.id === req.params.id && c.ownerId === req.user.id
  );
  if (idx === -1) {
    return res.status(404).json({ message: 'Carte introuvable' });
  }
  data.cards.splice(idx, 1);
  save(data);
  res.status(204).end();
});

module.exports = router;
