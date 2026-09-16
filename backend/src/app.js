const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
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

// 404 JSON pour toute route /api/* non reconnue (avant le fallback SPA
// ci-dessous, qui ne doit s'appliquer qu'aux routes non-API).
app.use('/api', (req, res) => {
  res.status(404).json({ message: 'Route introuvable' });
});

// Sert le build Angular (frontend/dist/frontend/browser) : urlapi/ ouvre
// directement l'app, et toute route inconnue (ex: /home, /login après un
// rechargement de page) retombe sur index.html pour que le routeur Angular
// prenne la main, comme il se doit pour une SPA.
const FRONTEND_DIST = path.join(__dirname, '..', '..', 'frontend');
const FRONTEND_INDEX = path.join(FRONTEND_DIST, 'index.html');

if (fs.existsSync(FRONTEND_INDEX)) {
  app.use(express.static(FRONTEND_DIST));
  // Express 5 (path-to-regexp v8) exige un joker nommé : '*' seul n'est
  // plus valide, il faut '/*splat'.
  app.get('/*splat', (req, res) => {
    res.sendFile(FRONTEND_INDEX);
  });
} else {
  console.warn(
    `[frontend] Build introuvable (${FRONTEND_DIST}). ` +
      "Lancez `npm run build` dans frontend/ pour que le backend serve l'app."
  );
  app.use((req, res) => {
    res.status(404).json({ message: 'Route introuvable' });
  });
}

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Erreur serveur' });
});

module.exports = app;
