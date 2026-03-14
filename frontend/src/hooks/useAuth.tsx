import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';
import type { User, UserRole } from '@/types';
import { findTestAccount } from '@/services/testAccounts';

interface LoginResult { ok: boolean; error?: string }

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  role: UserRole;
  loginWithCredentials: (email: string, password: string) => LoginResult;
  registerMock: (name: string, email: string) => void;
  loginUser: (user: User, token?: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const isLoggedIn = user !== null;
  const role: UserRole = user?.role ?? 'guest';

  useEffect(() => {
    const onForceLogout = () => {
      setUser(null);
      localStorage.removeItem('lf_token');
    };
    window.addEventListener('auth:logout', onForceLogout);
    return () => window.removeEventListener('auth:logout', onForceLogout);
  }, []);

  const loginUser = useCallback((newUser: User, token?: string) => {
    if (token) localStorage.setItem('lf_token', token);
    setUser(newUser);
  }, []);

  const loginWithCredentials = useCallback((email: string, password: string): LoginResult => {
    if (!email.trim() || !password.trim())
      return { ok: false, error: 'Completează email-ul și parola.' };
    const found = findTestAccount(email, password);
    if (!found)
      return { ok: false, error: 'Email sau parolă incorecte.' };
    setUser(found);
    return { ok: true };
  }, []);

  const registerMock = useCallback((name: string, email: string) => {
    setUser({
      id: Date.now(),
      name,
      email,
      role: 'student',
      avatar: '🧑‍💻',
      createdAt: new Date().toISOString().split('T')[0],
      streak: 0,
      totalPoints: 0,
    });
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('lf_token');
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, role, loginWithCredentials, registerMock, loginUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
