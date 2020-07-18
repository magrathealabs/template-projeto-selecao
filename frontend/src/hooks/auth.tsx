import React, { createContext, useCallback, useState, useContext } from 'react';

import api from '../services/api';

interface UserInfo {
  id: number;
  avatarUrl: string;
  name: string;
  login: string;
  followers: number;
  following: number;
}

interface AuthState {
  token: string;
  user: UserInfo;
}

interface AuthContextData {
  token: string;
  user: UserInfo;
  signIn(code: string): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = sessionStorage.getItem('@Magrathea:token');
    const user = JSON.parse(sessionStorage.getItem('@Magrathea:user') || '{}');

    if (token && user) {
      return { token, user };
    }

    return {} as AuthState;
  });

  const signIn = useCallback(async (code: string) => {
    const response = await api.get(`/auth/${code}`);

    sessionStorage.setItem('@Magrathea:token', response.data.token);
    sessionStorage.setItem('@Magrathea:user', JSON.stringify(response.data.user));

    setData({ token: response.data.token, user: response.data.user });
  }, []);

  const signOut = useCallback(async () => {
    localStorage.clear();
    sessionStorage.clear();

    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider value={{ token: data.token, user: data.user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

export { AuthProvider, useAuth };
