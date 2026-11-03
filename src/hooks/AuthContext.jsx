import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import * as authService from '../services/authService';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [session, setSession] = useState(() => authService.getSessionSync());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    authService.getSession().then((s) => {
      setSession(s);
      setLoading(false);
    });
  }, []);

  const login = useCallback(async (credentials) => {
    const s = await authService.demoLogin(credentials);
    setSession(s);
    return s;
  }, []);

  const register = useCallback(async (fields) => {
    const s = await authService.demoRegister(fields);
    setSession(s);
    return s;
  }, []);

  const logout = useCallback(async () => {
    await authService.logout();
    setSession(null);
  }, []);

  const switchRole = useCallback(async (role) => {
    const s = await authService.setRole(role);
    setSession(s);
    return s;
  }, []);

  const value = {
    session,
    user: session?.user ?? null,
    role: session?.role ?? 'student',
    isAuthenticated: Boolean(session),
    isModerator: session?.role === 'moderator',
    loading,
    login,
    register,
    logout,
    switchRole,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
