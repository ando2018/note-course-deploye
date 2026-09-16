const express = require('express');
const crypto = require('crypto');
const { load, save } = require('../data/store');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();
router.use(requireAuth);

function findCourseOrFail(data, id, ownerId, res) {
  const course = data.courses.find((c) => c.id === id && c.ownerId === ownerId);
  if (!course) {
    res.status(404).json({ message: 'Liste de courses introuvable' });
    return null;
  }
  return course;
}

// GET /api/courses - toutes les listes de l'utilisateur
router.get('/', (req, res) => {
  const data = load();
  const courses = data.courses
    .filter((c) => c.ownerId === req.user.id)
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
  res.json(courses);
});

// POST /api/courses - créer une liste
router.post('/', (req, res) => {
  const { title, note } = req.body || {};
  if (!title || !String(title).trim()) {
    return res.status(400).json({ message: 'Le titre est requis' });
  }

  const now = new Date().toISOString();
  const course = {
    id: crypto.randomUUID(),
    ownerId: req.user.id,
    title: String(title).trim(),
    note: note || '',
    items: [],
    createdAt: now,
    updatedAt: now,
  };

  const data = load();
  data.courses.push(course);
  save(data);
  res.status(201).json(course);
});

// GET /api/courses/:id
router.get('/:id', (req, res) => {
  const data = load();
  const course = findCourseOrFail(data, req.params.id, req.user.id, res);
  if (!course) return;
  res.json(course);
});

// PUT /api/courses/:id - mise à jour titre / note
router.put('/:id', (req, res) => {
  const data = load();
  const course = findCourseOrFail(data, req.params.id, req.user.id, res);
  if (!course) return;

  const { title, note } = req.body || {};
  if (title !== undefined) course.title = String(title).trim();
  if (note !== undefined) course.note = note;
  course.updatedAt = new Date().toISOString();

  save(data);
  res.json(course);
});

// DELETE /api/courses/:id
router.delete('/:id', (req, res) => {
  const data = load();
  const idx = data.courses.findIndex(
    (c) => c.id === req.params.id && c.ownerId === req.user.id
  );
  if (idx === -1) {
    return res.status(404).json({ message: 'Liste de courses introuvable' });
  }
  data.courses.splice(idx, 1);
  save(data);
  res.status(204).end();
});

// POST /api/courses/:id/items - ajouter un item
router.post('/:id/items', (req, res) => {
  const data = load();
  const course = findCourseOrFail(data, req.params.id, req.user.id, res);
  if (!course) return;

  const { name, qty, price } = req.body || {};
  if (!name || !String(name).trim()) {
    return res.status(400).json({ message: "Le nom de l'article est requis" });
  }

  const item = {
    id: crypto.randomUUID(),
    name: String(name).trim(),
    qty: qty !== undefined && qty !== null && qty !== '' ? Number(qty) : 1,
    price: price !== undefined && price !== null && price !== '' ? Number(price) : null,
    done: false,
  };
  course.items.push(item);
  course.updatedAt = new Date().toISOString();
  save(data);
  res.status(201).json(course);
});

// PUT /api/courses/:id/items/:itemId - modifier un item
router.put('/:id/items/:itemId', (req, res) => {
  const data = load();
  const course = findCourseOrFail(data, req.params.id, req.user.id, res);
  if (!course) return;

  const item = course.items.find((i) => i.id === req.params.itemId);
  if (!item) {
    return res.status(404).json({ message: 'Article introuvable' });
  }

  const { name, qty, price, done } = req.body || {};
  if (name !== undefined) item.name = String(name).trim();
  if (qty !== undefined) item.qty = qty === '' ? 1 : Number(qty);
  if (price !== undefined) item.price = price === '' || price === null ? null : Number(price);
  if (done !== undefined) item.done = Boolean(done);

  course.updatedAt = new Date().toISOString();
  save(data);
  res.json(course);
});

// PATCH /api/courses/:id/items/:itemId/toggle - bascule statut (double-clic)
router.patch('/:id/items/:itemId/toggle', (req, res) => {
  const data = load();
  const course = findCourseOrFail(data, req.params.id, req.user.id, res);
  if (!course) return;

  const item = course.items.find((i) => i.id === req.params.itemId);
  if (!item) {
    return res.status(404).json({ message: 'Article introuvable' });
  }

  item.done = !item.done;
  course.updatedAt = new Date().toISOString();
  save(data);
  res.json(course);
});

// DELETE /api/courses/:id/items/:itemId
router.delete('/:id/items/:itemId', (req, res) => {
  const data = load();
  const course = findCourseOrFail(data, req.params.id, req.user.id, res);
  if (!course) return;

  const idx = course.items.findIndex((i) => i.id === req.params.itemId);
  if (idx === -1) {
    return res.status(404).json({ message: 'Article introuvable' });
  }
  course.items.splice(idx, 1);
  course.updatedAt = new Date().toISOString();
  save(data);
  res.json(course);
});

module.exports = router;
