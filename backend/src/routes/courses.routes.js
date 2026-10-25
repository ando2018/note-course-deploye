const express = require('express');
const crypto = require('crypto');
const { getDb, NO_MONGO_ID } = require('../data/mongo');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();
router.use(requireAuth);

const coursesCol = getDb().collection('courses');

async function findCourseOrFail(id, ownerId, res) {
  const course = await coursesCol.findOne({ id, ownerId }, NO_MONGO_ID);
  if (!course) {
    res.status(404).json({ message: 'Liste de courses introuvable' });
    return null;
  }
  return course;
}

// GET /api/courses - toutes les listes de l'utilisateur
router.get('/', async (req, res) => {
  const courses = await coursesCol
    .find({ ownerId: req.user.id }, NO_MONGO_ID)
    .sort({ updatedAt: -1 })
    .toArray();
  res.json(courses);
});

// POST /api/courses - créer une liste
router.post('/', async (req, res) => {
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

  // insertOne ajoute un _id à l'objet passé : on insère une copie.
  await coursesCol.insertOne({ ...course });
  res.status(201).json(course);
});

// GET /api/courses/:id
router.get('/:id', async (req, res) => {
  const course = await findCourseOrFail(req.params.id, req.user.id, res);
  if (!course) return;
  res.json(course);
});

// PUT /api/courses/:id - mise à jour titre / note
router.put('/:id', async (req, res) => {
  const course = await findCourseOrFail(req.params.id, req.user.id, res);
  if (!course) return;

  const { title, note } = req.body || {};
  const changes = { updatedAt: new Date().toISOString() };
  if (title !== undefined) changes.title = String(title).trim();
  if (note !== undefined) changes.note = note;

  await coursesCol.updateOne({ id: course.id }, { $set: changes });
  res.json({ ...course, ...changes });
});

// DELETE /api/courses/:id
router.delete('/:id', async (req, res) => {
  const course = await findCourseOrFail(req.params.id, req.user.id, res);
  if (!course) return;
  await coursesCol.deleteOne({ id: course.id });
  res.status(204).end();
});

// POST /api/courses/:id/items - ajouter un item
router.post('/:id/items', async (req, res) => {
  const course = await findCourseOrFail(req.params.id, req.user.id, res);
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

  const items = [...course.items, item];
  const updatedAt = new Date().toISOString();
  await coursesCol.updateOne({ id: course.id }, { $set: { items, updatedAt } });
  res.status(201).json({ ...course, items, updatedAt });
});

// PUT /api/courses/:id/items/:itemId - modifier un item
router.put('/:id/items/:itemId', async (req, res) => {
  const course = await findCourseOrFail(req.params.id, req.user.id, res);
  if (!course) return;

  const items = course.items;
  const idx = items.findIndex((i) => i.id === req.params.itemId);
  if (idx === -1) {
    return res.status(404).json({ message: 'Article introuvable' });
  }

  const { name, qty, price, done } = req.body || {};
  const item = { ...items[idx] };
  if (name !== undefined) item.name = String(name).trim();
  if (qty !== undefined) item.qty = qty === '' ? 1 : Number(qty);
  if (price !== undefined) item.price = price === '' || price === null ? null : Number(price);
  if (done !== undefined) item.done = Boolean(done);

  const newItems = [...items];
  newItems[idx] = item;
  const updatedAt = new Date().toISOString();
  await coursesCol.updateOne({ id: course.id }, { $set: { items: newItems, updatedAt } });
  res.json({ ...course, items: newItems, updatedAt });
});

// PATCH /api/courses/:id/items/:itemId/toggle - bascule statut (double-clic)
router.patch('/:id/items/:itemId/toggle', async (req, res) => {
  const course = await findCourseOrFail(req.params.id, req.user.id, res);
  if (!course) return;

  const items = course.items;
  const idx = items.findIndex((i) => i.id === req.params.itemId);
  if (idx === -1) {
    return res.status(404).json({ message: 'Article introuvable' });
  }

  const newItems = [...items];
  newItems[idx] = { ...newItems[idx], done: !newItems[idx].done };
  const updatedAt = new Date().toISOString();
  await coursesCol.updateOne({ id: course.id }, { $set: { items: newItems, updatedAt } });
  res.json({ ...course, items: newItems, updatedAt });
});

// DELETE /api/courses/:id/items/:itemId
router.delete('/:id/items/:itemId', async (req, res) => {
  const course = await findCourseOrFail(req.params.id, req.user.id, res);
  if (!course) return;

  const items = course.items;
  const newItems = items.filter((i) => i.id !== req.params.itemId);
  if (newItems.length === items.length) {
    return res.status(404).json({ message: 'Article introuvable' });
  }

  const updatedAt = new Date().toISOString();
  await coursesCol.updateOne({ id: course.id }, { $set: { items: newItems, updatedAt } });
  res.json({ ...course, items: newItems, updatedAt });
});

module.exports = router;
