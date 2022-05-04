import React, { createContext, useState, useEffect, useContext } from 'react';
import nookies, { destroyCookie, parseCookies } from 'nookies';
import AsyncStorage from '@react-native-community/async-storage';
import * as auth from '../services/auth';
import { api } from '../services/api';
import { useRouter } from 'next/router';

interface User {
  name: string;
  email: string;
  avatarUrl: string;
}

interface AuthContextData {
  signed: boolean;
  user: User | null;
  loading: boolean;
  signIn(): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    function loadStorageData() {
      const { ['@RNAuth:token']: token } = parseCookies();
      const { ['@RNAuth:user']: userLocal } = parseCookies();

      if (token && JSON.parse(userLocal)) {
        setUser(JSON.parse(userLocal));
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      }

      setLoading(false);
    }
    loadStorageData();
  }, []);

  async function signIn() {
    const response = await auth.signIn();
    setUser(response.user);

    api.defaults.headers.common['Authorization'] = `Bearer ${response.token}`;

    nookies.set(undefined, '@RNAuth:user', JSON.stringify(response.user), {
      maxAge: 30 * 24 * 60 * 60,
    });
    nookies.set(undefined, '@RNAuth:token', response.token, {
      maxAge: 30 * 24 * 60 * 60,
    });

    router.push('/');
  }

  async function signOut() {
    await auth.delay();
    destroyCookie(null, '@RNAuth:token');
    destroyCookie(null, '@RNAuth:user');
    setUser(null);
    router.push('login');
  }

  return (
    <AuthContext.Provider
      value={{ signed: !!user, user, loading, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider.');
  }

  return context;
}

export { AuthProvider, useAuth };
