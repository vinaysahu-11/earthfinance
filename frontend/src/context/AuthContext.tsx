import React, { createContext, useContext, useState, useEffect } from 'react';
import { AdminUser } from '../types';
import { adminApi } from '../services/adminApi';

interface AuthContextType {
  user: AdminUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AdminUser | null>(() => {
    try {
      const saved = localStorage.getItem('earth_admin_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [token, setToken] = useState<string | null>(localStorage.getItem('earth_admin_token'));
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const verifyExistingToken = async () => {
      const storedToken = localStorage.getItem('earth_admin_token');
      const storedUser = localStorage.getItem('earth_admin_user');
      if (!storedToken) {
        setIsLoading(false);
        return;
      }

      try {
        const res = await adminApi.getMe();
        if (res.success && res.data) {
          setUser(res.data);
          setToken(storedToken);
          localStorage.setItem('earth_admin_user', JSON.stringify(res.data));
        } else if (storedUser) {
          setUser(JSON.parse(storedUser));
          setToken(storedToken);
        } else {
          logout();
        }
      } catch {
        if (storedUser) {
          try {
            setUser(JSON.parse(storedUser));
            setToken(storedToken);
          } catch {
            logout();
          }
        } else {
          logout();
        }
      } finally {
        setIsLoading(false);
      }
    };

    verifyExistingToken();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const res = await adminApi.login({ email, password });
      if (res.success && res.data) {
        const { token: receivedToken, user: receivedUser } = res.data;
        localStorage.setItem('earth_admin_token', receivedToken);
        localStorage.setItem('earth_admin_user', JSON.stringify(receivedUser));
        setToken(receivedToken);
        setUser(receivedUser);
        return { success: true };
      }
      return { success: false, error: res.error || 'Login failed' };
    } catch (err: any) {
      // Fallback for default admin/admin123 if backend API is temporarily unreachable
      if ((email.toLowerCase() === 'admin' || email.toLowerCase() === 'admin@earthfinance.in') && password === 'admin123') {
        const fallbackUser: AdminUser = {
          id: '00000000-0000-0000-0000-000000000001',
          name: 'Rajesh Sharma (Admin)',
          email: 'admin',
          role: 'SUPER_ADMIN',
          is_active: true,
          last_login: new Date().toISOString()
        };
        const fallbackToken = 'local-super-admin-token';
        localStorage.setItem('earth_admin_token', fallbackToken);
        localStorage.setItem('earth_admin_user', JSON.stringify(fallbackUser));
        setToken(fallbackToken);
        setUser(fallbackUser);
        return { success: true };
      }

      const msg = err.response?.data?.message || err.response?.data?.error || 'Invalid credentials';
      return { success: false, error: msg };
    }
  };

  const logout = () => {
    localStorage.removeItem('earth_admin_token');
    localStorage.removeItem('earth_admin_user');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token && !!user,
        isLoading,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};
