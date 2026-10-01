/** Utilidades de fechas (las fechas viajan como texto 'AAAA-MM-DD'). */

/** Fecha de hoy en formato AAAA-MM-DD (hora local del navegador). */
export const hoyISO = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

/** 'AAAA-MM-DD' → 'DD/MM/AAAA' */
export const formatFecha = (iso) => (iso ? iso.split('-').reverse().join('/') : '');

/** Vista previa de la fecha de fin: un mes exacto (el servidor hace el cálculo oficial). */
export const calcularFin = (iso) => {
  if (!iso) return '';
  const [y, m, d] = iso.split('-').map(Number);
  const lastDayNextMonth = new Date(y, m + 1, 0).getDate(); // evita 31/01 → 03/03
  const fin = new Date(y, m, Math.min(d, lastDayNextMonth));
  return `${fin.getFullYear()}-${String(fin.getMonth() + 1).padStart(2, '0')}-${String(fin.getDate()).padStart(2, '0')}`;
};

/** Texto + color según los días que le quedan a la mensualidad. */
export const estadoMensualidad = (dias) => {
  if (dias < 0) return { texto: `Vencida hace ${Math.abs(dias)} d`, clase: 'bg-brand/20 text-brand-light' };
  if (dias === 0) return { texto: 'Vence hoy', clase: 'bg-brand/20 text-brand-light' };
  if (dias <= 2) return { texto: `Vence en ${dias} d`, clase: 'bg-amber-500/20 text-amber-300' };
  return { texto: `${dias} días`, clase: 'bg-emerald-500/15 text-emerald-300' };
};
