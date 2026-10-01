import { useState } from 'react';
import Field from './Field';
import { errorMessage } from '../api/http';

/** Formulario para que el administrador cree usuarios (administrador o entrenador). */
export default function UserForm({ onSubmit, onCancel }) {
  const [form, setForm] = useState({ nombre: '', apellido: '', celular: '', correo: '', password: '', rol: 'entrenador' });
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setSaving(true);
    try { await onSubmit(form); } catch (err) { setError(errorMessage(err)); setSaving(false); }
  };

  return (
    <form onSubmit={submit} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <Field label="Nombre"><input className="input" value={form.nombre} onChange={set('nombre')} required /></Field>
      <Field label="Apellido"><input className="input" value={form.apellido} onChange={set('apellido')} required /></Field>
      <Field label="Celular"><input className="input" type="tel" value={form.celular} onChange={set('celular')} required /></Field>
      <Field label="Correo"><input className="input" type="email" value={form.correo} onChange={set('correo')} autoComplete="off" required /></Field>
      <Field label="Contraseña" hint="Mínimo 8 caracteres con mayúscula, minúscula, número y símbolo.">
        <input className="input" type="password" value={form.password} onChange={set('password')} autoComplete="new-password" required />
      </Field>
      <Field label="Rol">
        <select className="input" value={form.rol} onChange={set('rol')}>
          <option value="entrenador">Entrenador</option>
          <option value="administrador">Administrador</option>
        </select>
      </Field>
      {error && <p role="alert" className="sm:col-span-2 rounded-md bg-brand/15 px-3 py-2 text-sm text-brand-light">{error}</p>}
      <div className="flex justify-end gap-2 sm:col-span-2">
        <button type="button" onClick={onCancel} className="btn-ghost">Cancelar</button>
        <button type="submit" disabled={saving} className="btn-primary">{saving ? 'Creando…' : 'Crear usuario'}</button>
      </div>
    </form>
  );
}
