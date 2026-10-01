import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/** Protege rutas: exige sesión y, opcionalmente, rol de administrador. */
export default function ProtectedRoute({ children, adminOnly = false }) {
  const { user, loading, isAdmin } = useAuth();
  if (loading) return <p className="p-8 text-zinc-400">Cargando…</p>;
  if (!user) return <Navigate to="/login" replace />;
  if (adminOnly && !isAdmin) return <Navigate to="/" replace />;
  return children;
}
