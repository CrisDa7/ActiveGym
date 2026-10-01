import { useState } from 'react';
import Field from './Field';
import { calcularFin, formatFecha, hoyISO } from '../utils/dates';
import { errorMessage } from '../api/http';

/**
 * Formulario de inscripción (sirve para crear y para editar).
 * Los datos son los mismos para las 4 áreas de ActiveGym.
 */
export default function InscripcionForm({ areas, initial, onSubmit, onCancel }) {
  const [form, setForm] = useState({
    areaId: initial?.area_id ?? areas[0]?.id ?? '',
    nombre: initial?.nombre ?? '',
    apellido: initial?.apellido ?? '',
    telefono: initial?.telefono ?? '',
    peso: initial?.peso ?? '',
    pago: initial?.pago ?? '',
    modoPago: initial?.modo_pago ?? 'efectivo',
    fechaInicio: initial?.fecha_inicio ?? hoyISO(),
  });
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setSaving(true);
    try {
      await onSubmit(form);
    } catch (err) {
      setError(errorMessage(err));
      setSaving(false);
    }
  };

  return (
    <form onSubmit={submit} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <div className="sm:col-span-2">
        <Field label="Área">
          <select className="input" value={form.areaId} onChange={set('areaId')} required>
            {areas.map((a) => <option key={a.id} value={a.id}>{a.nombre}</option>)}
          </select>
        </Field>
      </div>
      <Field label="Nombre"><input className="input" value={form.nombre} onChange={set('nombre')} required maxLength={80} /></Field>
      <Field label="Apellido"><input className="input" value={form.apellido} onChange={set('apellido')} required maxLength={80} /></Field>
      <Field label="Teléfono (WhatsApp)"><input className="input" type="tel" inputMode="tel" value={form.telefono} onChange={set('telefono')} placeholder="0991234567" required /></Field>
      <Field label="Peso (kg)"><input className="input" type="number" step="0.1" min="1" value={form.peso} onChange={set('peso')} required /></Field>
      <Field label="Pago ($)"><input className="input" type="number" step="0.01" min="0" value={form.pago} onChange={set('pago')} placeholder="20" required /></Field>
      <Field label="Modo de pago">
        <select className="input" value={form.modoPago} onChange={set('modoPago')}>
          <option value="efectivo">Efectivo</option>
          <option value="transferencia">Transferencia</option>
        </select>
      </Field>
      <Field label="Fecha de inicio"><input className="input" type="date" value={form.fechaInicio} onChange={set('fechaInicio')} required /></Field>
      <Field label="Fecha de fin (1 mes exacto)">
        <input className="input cursor-not-allowed opacity-70" value={formatFecha(calcularFin(form.fechaInicio))} readOnly />
      </Field>

      {error && <p role="alert" className="sm:col-span-2 rounded-md bg-brand/15 px-3 py-2 text-sm text-brand-light">{error}</p>}

      <div className="flex justify-end gap-2 sm:col-span-2">
        <button type="button" onClick={onCancel} className="btn-ghost">Cancelar</button>
        <button type="submit" disabled={saving} className="btn-primary">{saving ? 'Guardando…' : 'Guardar'}</button>
      </div>
    </form>
  );
}
