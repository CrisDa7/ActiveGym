/**
 * Esquemas de validación (Zod). Todo lo que llega del cliente se valida AQUÍ
 * antes de tocar la lógica o la base de datos.
 */
const { z } = require('zod');

const texto = (campo, max = 80) =>
  z.string({ required_error: `${campo} es obligatorio` }).trim().min(1, `${campo} es obligatorio`).max(max);

const telefono = z
  .string({ required_error: 'El teléfono es obligatorio' })
  .trim()
  .regex(/^\+?[0-9\s-]{7,15}$/, 'Teléfono inválido (solo números, 7 a 15 dígitos)');

const fechaISO = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Fecha inválida (use AAAA-MM-DD)');

// Contraseña fuerte: 8+ caracteres, mayúscula, minúscula, número y símbolo
const password = z
  .string()
  .min(8, 'Mínimo 8 caracteres')
  .max(72, 'Máximo 72 caracteres') // límite real de bcrypt
  .regex(/[a-z]/, 'Debe incluir una minúscula')
  .regex(/[A-Z]/, 'Debe incluir una mayúscula')
  .regex(/[0-9]/, 'Debe incluir un número')
  .regex(/[^A-Za-z0-9]/, 'Debe incluir un símbolo');

const loginSchema = z.object({
  correo: z.string().trim().email('Correo inválido').max(120),
  password: z.string().min(1, 'La contraseña es obligatoria').max(72),
});

const usuarioSchema = z.object({
  nombre: texto('El nombre'),
  apellido: texto('El apellido'),
  celular: telefono,
  correo: z.string().trim().email('Correo inválido').max(120),
  password,
  rol: z.enum(['administrador', 'entrenador']),
});

const estadoUsuarioSchema = z.object({ activo: z.boolean() });

const inscripcionSchema = z.object({
  areaId: z.coerce.number().int().positive('Selecciona un área'),
  nombre: texto('El nombre'),
  apellido: texto('El apellido'),
  telefono,
  peso: z.coerce.number().positive('El peso debe ser mayor a 0').max(500),
  pago: z.coerce.number().min(0, 'El pago no puede ser negativo').max(99999),
  // El usuario escribe "transferencia" o "efectivo" (se normaliza a minúsculas)
  modoPago: z.string().trim().toLowerCase().pipe(z.enum(['efectivo', 'transferencia'], {
    errorMap: () => ({ message: 'El modo de pago debe ser efectivo o transferencia' }),
  })),
  fechaInicio: fechaISO,
});

module.exports = { loginSchema, usuarioSchema, estadoUsuarioSchema, inscripcionSchema };
