const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth.routes');
const coursesRoutes = require('./routes/courses.routes');
const agendaRoutes = require('./routes/agenda.routes');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));
app.use('/api/auth', authRoutes);
app.use('/api/courses', coursesRoutes);
app.use('/api/agenda', agendaRoutes);

app.use((req, res) => {
  res.status(404).json({ message: 'Route introuvable' });
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Erreur serveur' });
});

module.exports = app;
