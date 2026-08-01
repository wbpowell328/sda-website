import { createContext, useContext } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from './api/client.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ['me'],
    queryFn: () => api.me().then(d => d.user).catch(() => null),
    retry: false,
    staleTime: Infinity,
  });

  const value = {
    user: data || null,
    isLoading,
    refresh: () => queryClient.invalidateQueries({ queryKey: ['me'] }),
    setUser: (user) => queryClient.setQueryData(['me'], () => user),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
