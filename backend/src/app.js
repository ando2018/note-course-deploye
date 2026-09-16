const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth.routes');
const coursesRoutes = require('./routes/courses.routes');
const agendaRoutes = require('./routes/agenda.routes');
const cardsRoutes = require('./routes/cards.routes');

const app = express();

app.use(cors());
// Limite relevée par rapport au défaut (100kb) : les cartes de fidélité
// envoient leur photo en base64 dans le corps de la requête.
app.use(express.json({ limit: '6mb' }));

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));
app.use('/api/auth', authRoutes);
app.use('/api/courses', coursesRoutes);
app.use('/api/agenda', agendaRoutes);
app.use('/api/cards', cardsRoutes);

app.use((req, res) => {
  res.status(404).json({ message: 'Route introuvable' });
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Erreur serveur' });
});

module.exports = app;
