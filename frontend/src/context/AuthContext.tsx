import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';
import type { User, UserRole } from '@/types';
import { findTestAccount } from '@/services/testAccounts';
import { authService } from '@/api';
import { USE_MOCK } from '@/config';

interface LoginResult { ok: boolean; error?: string }

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  role: UserRole;
  loginWithCredentials: (email: string, password: string) => Promise<LoginResult>;
  registerWithApi: (name: string, email: string, password: string) => Promise<LoginResult>;
  loginUser: (user: User, token?: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

function parseTokenUser(token: string): User | null {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    if (payload.exp && payload.exp * 1000 < Date.now()) return null;
    return {
      id: parseInt(payload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier']),
      email: payload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'],
      name: payload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'],
      role: payload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] as UserRole,
      avatar: payload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name']?.split(' ').map((w: string) => w[0]).join('') || 'U',
      createdAt: '',
      streak: 0,
      totalPoints: 0,
    };
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isLoggedIn = user !== null;
  const role: UserRole = user?.role ?? 'guest';

  // Restore session from token on page load
  useEffect(() => {
    const storedToken = localStorage.getItem('lf_token');
    if (storedToken) {
      const parsed = parseTokenUser(storedToken);
      if (parsed) {
        setUser(parsed);
      } else {
        localStorage.removeItem('lf_token');
      }
    }
    setIsLoading(false);
  }, []);

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

  const loginWithCredentials = useCallback(async (email: string, password: string): Promise<LoginResult> => {
    if (!email.trim() || !password.trim())
      return { ok: false, error: 'Completează email-ul și parola.' };

    if (USE_MOCK) {
      const found = findTestAccount(email, password);
      if (!found) return { ok: false, error: 'Email sau parolă incorecte.' };
      setUser(found);
      return { ok: true };
    }

    try {
      const res = await authService.login({ email, password });
      const data = res.data as any;
      const token = data.token;
      const userDto = data.user;
      localStorage.setItem('lf_token', token);
      setUser({
        id: userDto.id,
        name: userDto.name,
        email: userDto.email,
        role: userDto.role,
        avatar: userDto.avatar || userDto.name?.split(' ').map((w: string) => w[0]).join('') || 'U',
        createdAt: userDto.createdAt || '',
        streak: userDto.streak || 0,
        totalPoints: userDto.totalPoints || 0,
      });
      return { ok: true };
    } catch (err: any) {
      const msg = err.response?.data?.message || 'Email sau parolă incorecte.';
      return { ok: false, error: msg };
    }
  }, []);

  const registerWithApi = useCallback(async (name: string, email: string, password: string): Promise<LoginResult> => {
    if (!name.trim() || !email.trim() || !password.trim())
      return { ok: false, error: 'Completează toate câmpurile.' };

    if (USE_MOCK) {
      setUser({
        id: Date.now(), name, email, role: 'student',
        avatar: '🧑‍💻', createdAt: new Date().toISOString().split('T')[0],
        streak: 0, totalPoints: 0,
      });
      return { ok: true };
    }

    try {
      await authService.register({ name, email, password });
      // Auto-login after register
      const loginRes = await authService.login({ email, password });
      const data = loginRes.data as any;
      localStorage.setItem('lf_token', data.token);
      setUser({
        id: data.user.id, name: data.user.name, email: data.user.email,
        role: data.user.role,
        avatar: data.user.avatar || name.split(' ').map(w => w[0]).join('') || 'U',
        createdAt: data.user.createdAt || '', streak: 0, totalPoints: 0,
      });
      return { ok: true };
    } catch (err: any) {
      const msg = err.response?.data?.message || 'Eroare la înregistrare.';
      return { ok: false, error: msg };
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('lf_token');
  }, []);

  if (isLoading) return null;

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, role, loginWithCredentials, registerWithApi, loginUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
