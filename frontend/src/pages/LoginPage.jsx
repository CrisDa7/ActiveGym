import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { errorMessage } from '../api/http';
import Field from '../components/Field';

export default function LoginPage() {
  const { user, login } = useAuth();
  const [form, setForm] = useState({ correo: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (user) return <Navigate to="/" replace />;

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try { await login(form); } catch (err) { setError(errorMessage(err)); setLoading(false); }
  };

  return (
    <main className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <img src="/logo.png" alt="Active Gym — Deporte, salud, bienestar" className="mx-auto mb-6 w-56 rounded-lg" />
        <form onSubmit={submit} className="space-y-4 rounded-lg border border-carbon-700 bg-carbon-900 p-6">
          <h1 className="title-display text-3xl">Iniciar sesión</h1>
          <Field label="Correo"><input className="input" type="email" autoComplete="username" value={form.correo} onChange={(e) => setForm({ ...form, correo: e.target.value })} required /></Field>
          <Field label="Contraseña"><input className="input" type="password" autoComplete="current-password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required /></Field>
          {error && <p role="alert" className="rounded-md bg-brand/15 px-3 py-2 text-sm text-brand-light">{error}</p>}
          <button type="submit" disabled={loading} className="btn-primary w-full">{loading ? 'Entrando…' : 'Entrar'}</button>
        </form>
      </div>
    </main>
  );
}
