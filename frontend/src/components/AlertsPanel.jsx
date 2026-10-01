import { estadoMensualidad, formatFecha } from '../utils/dates';

/** Panel de alertas: mensualidades por vencer o vencidas, con botón directo a WhatsApp. */
export default function AlertsPanel({ alerts }) {
  if (!alerts.length) return null;
  return (
    <section aria-label="Alertas de vencimiento" className="mb-6 rounded-lg border border-brand/40 bg-brand/5 p-4">
      <h2 className="title-display mb-3 text-xl text-brand-light">Mensualidades por vencer ({alerts.length})</h2>
      <ul className="grid gap-2 md:grid-cols-2">
        {alerts.map((a) => {
          const est = estadoMensualidad(a.dias_restantes);
          return (
            <li key={a.id} className="flex items-center justify-between gap-3 rounded-md bg-carbon-900 px-3 py-2">
              <div className="min-w-0">
                <p className="truncate font-medium">{a.nombre} {a.apellido}</p>
                <p className="text-xs text-zinc-400">{a.area} · termina el {formatFecha(a.fecha_fin)}</p>
              </div>
              <span className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-semibold ${est.clase}`}>{est.texto}</span>
              <a href={a.whatsapp.url} target="_blank" rel="noopener noreferrer" className="btn-wa shrink-0">WhatsApp</a>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
