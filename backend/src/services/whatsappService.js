/**
 * Genera el enlace "click to chat" de WhatsApp (https://wa.me/...) con el mensaje de bienvenida.
 * No requiere API de pago: al abrir el enlace, WhatsApp se abre con el mensaje listo para enviar.
 */
const { format, parseISO } = require('date-fns');
const env = require('../config/env');

const fmt = (iso) => format(parseISO(iso), 'dd/MM/yyyy');

/** Convierte 0994494004 → 593994494004 (formato internacional sin "+"). */
function normalizePhone(raw) {
  let digits = String(raw).replace(/\D/g, '');
  if (digits.startsWith('00')) digits = digits.slice(2);
  if (digits.startsWith('0')) digits = env.whatsappCountryCode + digits.slice(1);
  else if (!digits.startsWith(env.whatsappCountryCode)) digits = env.whatsappCountryCode + digits;
  return digits;
}

const whatsappService = {
  buildWelcome(i) {
    const mensaje =
      `¡Bienvenido a Active Gym, ${i.nombre}! 💪\n` +
      `Área: ${i.area}\n` +
      `Tu peso registrado es ${i.peso} kg.\n` +
      `Tu mensualidad inicia el ${fmt(i.fecha_inicio)} y termina el ${fmt(i.fecha_fin)}.`;
    return { mensaje, url: `https://wa.me/${normalizePhone(i.telefono)}?text=${encodeURIComponent(mensaje)}` };
  },

  buildReminder(i) {
    const cuando = i.dias_restantes < 0 ? `venció el ${fmt(i.fecha_fin)}` : `vence el ${fmt(i.fecha_fin)}`;
    const mensaje = `Hola ${i.nombre}, te recordamos que tu mensualidad de ${i.area} en Active Gym ${cuando}. ¡Te esperamos para renovarla! 💪`;
    return { mensaje, url: `https://wa.me/${normalizePhone(i.telefono)}?text=${encodeURIComponent(mensaje)}` };
  },
};

module.exports = whatsappService;
