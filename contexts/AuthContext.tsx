import Router from 'next/router';
import { parseCookies, setCookie } from 'nookies';
import { createContext, useEffect, useState } from 'react';
import { api } from '../services/api';
import { recoverUserInformation, signInRequest } from '../services/auth';

type User = { email: string; name: string; avatarUrl: string };
type SignInType = { email: string; password: string };
type AuthContextType = {
  isAuthenticated: boolean;
  user: User | null;
  signIn: (data: SignInType) => Promise<void>;
};
export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: any) {
  const [user, setUser] = useState<User | null>(null);

  const isAuthenticated = !!user;

  useEffect(() => {
    const { 'nextauth.token': token } = parseCookies();
    if (token) {
      recoverUserInformation().then(response => {
        setUser(response.user);
      });
    }
  }, []);

  async function signIn({ email, password }: SignInType) {
    const { token, user } = await signInRequest({ email, password });

    setCookie(undefined, 'nextauth.token', token, {
      maxAge: 60 * 60 * 1, //1 hora
    });

    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    setUser(user);
    Router.push('/dashboard');
  }
  async function signUp({ email, password }: SignInType) {
    Router.push('/login');
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn }}>
      {children}
    </AuthContext.Provider>
  );
}
