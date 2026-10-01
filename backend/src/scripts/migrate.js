/** Ejecuta sql/schema.sql: crea tablas, tipos y las 4 áreas. Uso: npm run db:migrate */
const fs = require('fs');
const path = require('path');
const db = require('../config/db');

(async () => {
  try {
    const sql = fs.readFileSync(path.join(__dirname, '../../sql/schema.sql'), 'utf8');
    await db.query(sql);
    console.log('✅ Base de datos lista (tablas y áreas creadas).');
  } catch (e) {
    console.error('❌ Error en la migración:', e.message);
    process.exitCode = 1;
  } finally {
    await db.end();
  }
})();
