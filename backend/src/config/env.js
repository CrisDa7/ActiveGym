/**
 * Configuración central. Lee las variables de entorno UNA sola vez y
 * valida que lo imprescindible exista (falla rápido si algo falta).
 */
require('dotenv').config();

const required = ['DATABASE_URL', 'JWT_SECRET', 'CLIENT_ORIGIN'];
for (const key of required) {
  if (!process.env[key]) {
    console.error(`❌ Falta la variable de entorno obligatoria: ${key}`);
    process.exit(1);
  }
}
if (process.env.JWT_SECRET.length < 32) {
  console.error('❌ JWT_SECRET debe tener al menos 32 caracteres.');
  process.exit(1);
}

const isProd = process.env.NODE_ENV === 'production';

module.exports = Object.freeze({
  isProd,
  port: Number(process.env.PORT) || 4000,
  clientOrigin: process.env.CLIENT_ORIGIN,
  databaseUrl: process.env.DATABASE_URL,
  dbSsl: process.env.DB_SSL === 'true',
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '8h',
  alertDaysBefore: Number(process.env.ALERT_DAYS_BEFORE) || 2,
  whatsappCountryCode: process.env.WHATSAPP_COUNTRY_CODE || '593',
  cookieSameSite: process.env.COOKIE_SAMESITE || 'lax',
  timezone: process.env.APP_TIMEZONE || 'America/Guayaquil',
  admin: {
    nombre: process.env.ADMIN_NOMBRE,
    apellido: process.env.ADMIN_APELLIDO,
    celular: process.env.ADMIN_CELULAR,
    correo: process.env.ADMIN_CORREO,
    password: process.env.ADMIN_PASSWORD,
  },
});
