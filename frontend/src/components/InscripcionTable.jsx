import { estadoMensualidad, formatFecha } from '../utils/dates';

/** Tabla de clientes/mensualidades. Editar y eliminar solo aparecen para el administrador. */
export default function InscripcionTable({ rows, isAdmin, onWhatsapp, onEdit, onDelete }) {
  if (!rows.length) return <p className="rounded-lg border border-carbon-700 p-8 text-center text-zinc-400">Aún no hay clientes en esta vista. Usa “Nueva inscripción” para registrar el primero.</p>;

  return (
    <div className="overflow-x-auto rounded-lg border border-carbon-700">
      <table className="w-full min-w-[820px] text-left text-sm">
        <thead className="bg-carbon-800 text-zinc-300">
          <tr>
            {['Cliente', 'Área', 'Teléfono', 'Peso', 'Pago', 'Inicio', 'Fin', 'Estado', ''].map((h) => (
              <th key={h} className="px-3 py-2 font-medium">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-carbon-700">
          {rows.map((r) => {
            const est = estadoMensualidad(r.dias_restantes);
            return (
              <tr key={r.id} className="hover:bg-carbon-900">
                <td className="px-3 py-2 font-medium">{r.nombre} {r.apellido}</td>
                <td className="px-3 py-2">{r.area}</td>
                <td className="px-3 py-2">{r.telefono}</td>
                <td className="px-3 py-2">{r.peso} kg</td>
                <td className="px-3 py-2">${r.pago} <span className="text-xs capitalize text-zinc-500">({r.modo_pago})</span></td>
                <td className="px-3 py-2">{formatFecha(r.fecha_inicio)}</td>
                <td className="px-3 py-2">{formatFecha(r.fecha_fin)}</td>
                <td className="px-3 py-2"><span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${est.clase}`}>{est.texto}</span></td>
                <td className="px-3 py-2">
                  <div className="flex justify-end gap-1.5">
                    <button onClick={() => onWhatsapp(r)} className="btn-wa">WhatsApp</button>
                    {isAdmin && <button onClick={() => onEdit(r)} className="btn-ghost px-3 py-1.5">Editar</button>}
                    {isAdmin && <button onClick={() => onDelete(r)} className="btn-danger px-3 py-1.5">Eliminar</button>}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
