/**
 * Crea el PRIMER administrador con los datos del .env (ADMIN_*).
 * La contraseña se guarda cifrada (bcrypt). Si ya existe, no hace nada.
 * Uso: npm run db:seed
 */
const bcrypt = require('bcryptjs');
const env = require('../config/env');
const db = require('../config/db');
const userModel = require('../models/userModel');

(async () => {
  try {
    const a = env.admin;
    if (!a.correo || !a.password) throw new Error('Define ADMIN_CORREO y ADMIN_PASSWORD en el .env');

    if (await userModel.findByEmail(a.correo)) {
      console.log('ℹ️  El administrador ya existe. No se hizo nada.');
      return;
    }
    await userModel.create({
      nombre: a.nombre, apellido: a.apellido, celular: a.celular, correo: a.correo,
      passwordHash: await bcrypt.hash(a.password, 12), rol: 'administrador',
    });
    console.log(`✅ Administrador creado: ${a.correo}`);
  } catch (e) {
    console.error('❌', e.message);
    process.exitCode = 1;
  } finally {
    await db.end();
  }
})();
