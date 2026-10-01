import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const linkClass = ({ isActive }) =>
  `rounded-md px-3 py-1.5 text-sm font-medium ${isActive ? 'bg-brand text-white' : 'text-zinc-300 hover:bg-carbon-800'}`;

export default function Navbar() {
  const { user, isAdmin, logout } = useAuth();
  return (
    <header className="border-b border-carbon-700 bg-carbon-900">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-3 px-4 py-3">
        <img src="/logo.png" alt="Active Gym" className="h-10 w-10 rounded" />
        <span className="title-display text-2xl text-white">ACTIVE <span className="text-brand">GYM</span></span>
        <nav className="ml-4 flex gap-1">
          <NavLink to="/" end className={linkClass}>Clientes</NavLink>
          {isAdmin && <NavLink to="/usuarios" className={linkClass}>Usuarios</NavLink>}
        </nav>
        <div className="ml-auto flex items-center gap-3 text-sm">
          <span className="text-zinc-400">{user.nombre} · <span className="capitalize">{user.rol}</span></span>
          <button onClick={logout} className="btn-ghost py-1.5">Salir</button>
        </div>
      </div>
    </header>
  );
}
