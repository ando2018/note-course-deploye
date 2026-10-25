const app = require('./src/app');
const { PORT } = require('./src/config');
const { connectDb } = require('./src/data/mongo');

connectDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`API démarrée sur http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Connexion à MongoDB impossible :', err.message);
    process.exit(1);
  });
