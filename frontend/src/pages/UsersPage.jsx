import { useEffect, useState } from 'react';
import { usersApi } from '../api/services';
import { errorMessage } from '../api/http';
import { useAuth } from '../context/AuthContext';
import Modal from '../components/Modal';
import UserForm from '../components/UserForm';

/** Gestión de usuarios (solo administrador). */
export default function UsersPage() {
  const { user: me } = useAuth();
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState('');

  const load = () => usersApi.list().then(setUsers).catch((e) => setError(errorMessage(e)));
  useEffect(() => { load(); }, []);

  const toggle = async (u) => {
    try { await usersApi.setActive(u.id, !u.activo); load(); } catch (e) { setError(errorMessage(e)); }
  };

  return (
    <>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <h1 className="title-display text-4xl">Usuarios</h1>
        <button onClick={() => setOpen(true)} className="btn-primary">Nuevo usuario</button>
      </div>
      {error && <p role="alert" className="mb-4 rounded-md bg-brand/15 px-3 py-2 text-sm text-brand-light">{error}</p>}

      <div className="overflow-x-auto rounded-lg border border-carbon-700">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="bg-carbon-800 text-zinc-300">
            <tr>{['Nombre', 'Celular', 'Correo', 'Rol', 'Estado', ''].map((h) => <th key={h} className="px-3 py-2 font-medium">{h}</th>)}</tr>
          </thead>
          <tbody className="divide-y divide-carbon-700">
            {users.map((u) => (
              <tr key={u.id} className="hover:bg-carbon-900">
                <td className="px-3 py-2 font-medium">{u.nombre} {u.apellido}</td>
                <td className="px-3 py-2">{u.celular}</td>
                <td className="px-3 py-2">{u.correo}</td>
                <td className="px-3 py-2 capitalize">{u.rol}</td>
                <td className="px-3 py-2">{u.activo ? 'Activo' : 'Desactivado'}</td>
                <td className="px-3 py-2 text-right">
                  {u.id !== me.id && <button onClick={() => toggle(u)} className={u.activo ? 'btn-danger px-3 py-1.5' : 'btn-ghost px-3 py-1.5'}>{u.activo ? 'Desactivar' : 'Activar'}</button>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {open && (
        <Modal title="Nuevo usuario" onClose={() => setOpen(false)}>
          <UserForm onCancel={() => setOpen(false)} onSubmit={async (d) => { await usersApi.create(d); setOpen(false); load(); }} />
        </Modal>
      )}
    </>
  );
}
