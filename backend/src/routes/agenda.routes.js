const express = require('express');
const crypto = require('crypto');
const { getDb, NO_MONGO_ID } = require('../data/mongo');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();
router.use(requireAuth);

const agendaCol = getDb().collection('agenda');

async function findEventOrFail(id, ownerId, res) {
  const event = await agendaCol.findOne({ id, ownerId }, NO_MONGO_ID);
  if (!event) {
    res.status(404).json({ message: 'Rendez-vous introuvable' });
    return null;
  }
  return event;
}

// GET /api/agenda - tous les rendez-vous de l'utilisateur, triés par date/heure
router.get('/', async (req, res) => {
  const events = await agendaCol
    .find({ ownerId: req.user.id }, NO_MONGO_ID)
    .sort({ date: 1, time: 1 })
    .toArray();
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

  // insertOne ajoute un _id à l'objet passé : on insère une copie.
  await agendaCol.insertOne({ ...event });
  res.status(201).json(event);
});

// GET /api/agenda/:id
router.get('/:id', async (req, res) => {
  const event = await findEventOrFail(req.params.id, req.user.id, res);
  if (!event) return;
  res.json(event);
});

// PUT /api/agenda/:id - mise à jour
router.put('/:id', async (req, res) => {
  const event = await findEventOrFail(req.params.id, req.user.id, res);
  if (!event) return;

  const { title, description, date, time } = req.body || {};
  const changes = { updatedAt: new Date().toISOString() };
  if (title !== undefined) changes.title = String(title).trim();
  if (description !== undefined) changes.description = String(description);
  if (date !== undefined) changes.date = date;
  if (time !== undefined) changes.time = time;

  await agendaCol.updateOne({ id: event.id }, { $set: changes });
  res.json({ ...event, ...changes });
});

// DELETE /api/agenda/:id
router.delete('/:id', async (req, res) => {
  const event = await findEventOrFail(req.params.id, req.user.id, res);
  if (!event) return;
  await agendaCol.deleteOne({ id: event.id });
  res.status(204).end();
});

module.exports = router;
