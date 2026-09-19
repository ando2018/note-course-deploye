const express = require('express');
const crypto = require('crypto');
const { getDb } = require('../data/firebase');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();
router.use(requireAuth);

const agendaCol = getDb().collection('agenda');

async function findEventOrFail(id, ownerId, res) {
  const doc = await agendaCol.doc(id).get();
  if (!doc.exists || doc.data().ownerId !== ownerId) {
    res.status(404).json({ message: 'Rendez-vous introuvable' });
    return null;
  }
  return doc;
}

// GET /api/agenda - tous les rendez-vous de l'utilisateur, triés par date/heure
router.get('/', async (req, res) => {
  const snap = await agendaCol.where('ownerId', '==', req.user.id).get();
  const events = snap.docs
    .map((d) => d.data())
    .sort((a, b) => `${a.date}T${a.time}`.localeCompare(`${b.date}T${b.time}`));
  res.json(events);
});

// POST /api/agenda - créer un rendez-vous
router.post('/', async (req, res) => {
  const { title, description, date, time } = req.body || {};
  if (!title || !String(title).trim()) {
    return res.status(400).json({ message: 'Le titre est requis' });
  }
  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return res.status(400).json({ message: 'Une date valide est requise' });
  }
  if (!time || !/^\d{2}:\d{2}$/.test(time)) {
    return res.status(400).json({ message: 'Une heure valide est requise' });
  }

  const now = new Date().toISOString();
  const event = {
    id: crypto.randomUUID(),
    ownerId: req.user.id,
    title: String(title).trim(),
    description: description ? String(description) : '',
    date,
    time,
    createdAt: now,
    updatedAt: now,
  };

  await agendaCol.doc(event.id).set(event);
  res.status(201).json(event);
});

// GET /api/agenda/:id
router.get('/:id', async (req, res) => {
  const doc = await findEventOrFail(req.params.id, req.user.id, res);
  if (!doc) return;
  res.json(doc.data());
});

// PUT /api/agenda/:id - mise à jour
router.put('/:id', async (req, res) => {
  const doc = await findEventOrFail(req.params.id, req.user.id, res);
  if (!doc) return;

  const { title, description, date, time } = req.body || {};
  const changes = { updatedAt: new Date().toISOString() };
  if (title !== undefined) changes.title = String(title).trim();
  if (description !== undefined) changes.description = String(description);
  if (date !== undefined) changes.date = date;
  if (time !== undefined) changes.time = time;

  await doc.ref.update(changes);
  res.json({ ...doc.data(), ...changes });
});

// DELETE /api/agenda/:id
router.delete('/:id', async (req, res) => {
  const doc = await findEventOrFail(req.params.id, req.user.id, res);
  if (!doc) return;
  await doc.ref.delete();
  res.status(204).end();
});

module.exports = router;
