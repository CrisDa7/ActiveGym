import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { authApi } from '../api/services';

const AuthContext = createContext(null);

/** Guarda al usuario logueado y expone login/logout a toda la app. */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Al abrir la app, pregunta al servidor si ya hay una sesión válida
  useEffect(() => {
    authApi.me().then(setUser).catch(() => setUser(null)).finally(() => setLoading(false));
  }, []);

  const login = useCallback(async (credentials) => setUser(await authApi.login(credentials)), []);
  const logout = useCallback(async () => { await authApi.logout(); setUser(null); }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, isAdmin: user?.rol === 'administrador' }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
