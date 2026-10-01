/** Configuración de Express: seguridad, middlewares globales y rutas. */
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
const env = require('./config/env');
const routes = require('./routes');
const { notFound, errorHandler } = require('./middlewares/errorHandler');

const app = express();

app.set('trust proxy', 1); // necesario detrás de proxies (Render, Railway, Nginx...)
app.use(helmet()); // cabeceras de seguridad HTTP

// CORS: solo el frontend autorizado, con cookies
app.use(cors({ origin: env.clientOrigin, credentials: true }));

app.use(express.json({ limit: '10kb' })); // limita el tamaño del body
app.use(cookieParser());

// Límite general de peticiones por IP
app.use('/api', rateLimit({ windowMs: 60 * 1000, max: 200, standardHeaders: true, legacyHeaders: false }));

// Defensa extra contra CSRF: las peticiones con body deben ser JSON
// (un formulario de otro sitio no puede enviar application/json sin pasar por CORS).
app.use('/api', (req, res, next) => {
  const hasBody = ['POST', 'PUT', 'PATCH'].includes(req.method) && Number(req.headers['content-length'] || 0) > 0;
  if (hasBody && !req.is('application/json')) return res.status(415).json({ message: 'Content-Type debe ser application/json' });
  next();
});

app.use('/api', routes);
app.use(notFound);
app.use(errorHandler);

module.exports = app;
