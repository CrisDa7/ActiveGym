import { useCallback, useEffect, useState } from 'react';
import { inscripcionesApi, openWhatsapp } from '../api/services';
import { errorMessage } from '../api/http';
import { useAuth } from '../context/AuthContext';
import AlertsPanel from '../components/AlertsPanel';
import InscripcionTable from '../components/InscripcionTable';
import InscripcionForm from '../components/InscripcionForm';
import Modal from '../components/Modal';

export default function DashboardPage() {
  const { isAdmin } = useAuth();
  const [areas, setAreas] = useState([]);
  const [areaId, setAreaId] = useState(''); // '' = todas
  const [search, setSearch] = useState('');
  const [rows, setRows] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [modal, setModal] = useState(null); // null | { type: 'new' } | { type: 'edit', row }
  const [created, setCreated] = useState(null); // última inscripción creada (para ofrecer WhatsApp)
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    try {
      const [list, al] = await Promise.all([
        inscripcionesApi.list({ areaId: areaId || undefined, q: search || undefined }),
        inscripcionesApi.alerts(),
      ]);
      setRows(list);
      setAlerts(al);
    } catch (e) { setError(errorMessage(e)); }
  }, [areaId, search]);

  useEffect(() => { inscripcionesApi.areas().then(setAreas).catch((e) => setError(errorMessage(e))); }, []);

  // Recarga al cambiar de área o al escribir (con pequeña espera para no saturar)
  useEffect(() => { const t = setTimeout(load, 250); return () => clearTimeout(t); }, [load]);

  const handleSave = async (data) => {
    if (modal.type === 'edit') {
      await inscripcionesApi.update(modal.row.id, data);
    } else {
      setCreated(await inscripcionesApi.create(data));
    }
    setModal(null);
    load();
  };

  const handleDelete = async (row) => {
    if (!window.confirm(`¿Eliminar a ${row.nombre} ${row.apellido}? Esta acción no se puede deshacer.`)) return;
    try { await inscripcionesApi.remove(row.id); load(); } catch (e) { setError(errorMessage(e)); }
  };

  const sendWa = (row, tipo) => openWhatsapp(row.id, tipo).catch((e) => setError(errorMessage(e)));

  const tabClass = (active) =>
    `rounded-full px-4 py-1.5 text-sm font-medium ${active ? 'bg-brand text-white' : 'bg-carbon-800 text-zinc-300 hover:bg-carbon-700'}`;

  return (
    <>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <h1 className="title-display text-4xl">Clientes y mensualidades</h1>
        <button onClick={() => setModal({ type: 'new' })} className="btn-primary">Nueva inscripción</button>
      </div>

      {error && <p role="alert" className="mb-4 rounded-md bg-brand/15 px-3 py-2 text-sm text-brand-light">{error}</p>}

      {created && (
        <div role="status" className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-emerald-600/40 bg-emerald-500/10 px-4 py-3">
          <p className="text-sm">Se registró a <strong>{created.nombre} {created.apellido}</strong> en {created.area}.</p>
          <div className="flex gap-2">
            <button className="btn-wa" onClick={() => sendWa(created, 'bienvenida')}>Enviar bienvenida por WhatsApp</button>
            <button className="btn-ghost py-1.5" onClick={() => setCreated(null)}>Cerrar</button>
          </div>
        </div>
      )}

      <AlertsPanel alerts={alerts} />

      <div className="mb-4 flex flex-wrap items-center gap-2">
        <button className={tabClass(areaId === '')} onClick={() => setAreaId('')}>Todas</button>
        {areas.map((a) => <button key={a.id} className={tabClass(areaId === a.id)} onClick={() => setAreaId(a.id)}>{a.nombre}</button>)}
        <input className="input ml-auto max-w-xs" type="search" placeholder="Buscar nombre o teléfono…" value={search} onChange={(e) => setSearch(e.target.value)} aria-label="Buscar clientes" />
      </div>

      <InscripcionTable rows={rows} isAdmin={isAdmin} onWhatsapp={(r) => sendWa(r, 'bienvenida')} onEdit={(r) => setModal({ type: 'edit', row: r })} onDelete={handleDelete} />

      {modal && (
        <Modal title={modal.type === 'edit' ? 'Editar inscripción' : 'Nueva inscripción'} onClose={() => setModal(null)}>
          <InscripcionForm areas={areas} initial={modal.row} onSubmit={handleSave} onCancel={() => setModal(null)} />
        </Modal>
      )}
    </>
  );
}
