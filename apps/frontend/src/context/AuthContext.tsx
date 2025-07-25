import { createContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { useMe } from '../hooks/useAuth';
import type { User } from '../types/User';

interface AuthContextType {
  user: User | undefined;
  token: string | null;
  setToken: (token: string | null) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('token'));
  const { data: user, isLoading, refetch } = useMe(!!token);

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
      const timer = setTimeout(() => {
        refetch();
      }, 100);
      return () => clearTimeout(timer);
    } else {
      localStorage.removeItem('token');
    }
  }, [token, refetch]);

  function logout() {
    setToken(null);
  }

  return (
    <AuthContext.Provider value={{ user, token, setToken, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext }; 