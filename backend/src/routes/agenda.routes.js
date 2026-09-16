const express = require('express');
const crypto = require('crypto');
const { load, save } = require('../data/store');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();
router.use(requireAuth);

function findEventOrFail(data, id, ownerId, res) {
  const event = data.agenda.find((e) => e.id === id && e.ownerId === ownerId);
  if (!event) {
    res.status(404).json({ message: 'Rendez-vous introuvable' });
    return null;
  }
  return event;
}

// GET /api/agenda - tous les rendez-vous de l'utilisateur, triés par date/heure
router.get('/', (req, res) => {
  const data = load();
  const events = data.agenda
    .filter((e) => e.ownerId === req.user.id)
    .sort((a, b) => `${a.date}T${a.time}`.localeCompare(`${b.date}T${b.time}`));
  res.json(events);
});

// POST /api/agenda - créer un rendez-vous
router.post('/', (req, res) => {
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

  const data = load();
  data.agenda.push(event);
  save(data);
  res.status(201).json(event);
});

// GET /api/agenda/:id
router.get('/:id', (req, res) => {
  const data = load();
  const event = findEventOrFail(data, req.params.id, req.user.id, res);
  if (!event) return;
  res.json(event);
});

// PUT /api/agenda/:id - mise à jour
router.put('/:id', (req, res) => {
  const data = load();
  const event = findEventOrFail(data, req.params.id, req.user.id, res);
  if (!event) return;

  const { title, description, date, time } = req.body || {};
  if (title !== undefined) event.title = String(title).trim();
  if (description !== undefined) event.description = String(description);
  if (date !== undefined) event.date = date;
  if (time !== undefined) event.time = time;
  event.updatedAt = new Date().toISOString();

  save(data);
  res.json(event);
});

// DELETE /api/agenda/:id
router.delete('/:id', (req, res) => {
  const data = load();
  const idx = data.agenda.findIndex(
    (e) => e.id === req.params.id && e.ownerId === req.user.id
  );
  if (idx === -1) {
    return res.status(404).json({ message: 'Rendez-vous introuvable' });
  }
  data.agenda.splice(idx, 1);
  save(data);
  res.status(204).end();
});

module.exports = router;
