const env = require('./config/env');
const db = require('./config/db');
const app = require('./app');

const server = app.listen(env.port, () => {
  console.log(`🏋️  ActiveGym API escuchando en http://localhost:${env.port}`);
});

// Cierre ordenado (útil en despliegues)
const shutdown = () => server.close(async () => { await db.end(); process.exit(0); });
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
