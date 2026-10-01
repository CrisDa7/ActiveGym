/**
 * Patrón Singleton: un único pool de conexiones compartido por toda la app.
 * Todas las consultas del proyecto usan parámetros ($1, $2...) → previene SQL Injection.
 */
const { Pool, types } = require('pg');
const env = require('./env');

// DATE (oid 1082) → se devuelve como texto 'YYYY-MM-DD' (evita líos de zona horaria)
types.setTypeParser(1082, (v) => v);
// NUMERIC (oid 1700) → número JS (peso y pago)
types.setTypeParser(1700, (v) => parseFloat(v));

const pool = new Pool({
  connectionString: env.databaseUrl,
  ssl: env.dbSsl ? { rejectUnauthorized: false } : false,
  max: 10,
});

pool.on('error', (err) => console.error('Error inesperado en el pool de PostgreSQL', err));

module.exports = pool;
