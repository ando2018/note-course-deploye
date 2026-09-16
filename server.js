const app = require('./src/app');
const { PORT } = require('./src/config');

app.listen(PORT, () => {
  console.log(`API démarrée sur http://localhost:${PORT}`);
});
