import { createContext, ReactNode, useEffect, useState } from "react";
import { setCookie, parseCookies, destroyCookie } from 'nookies';
import Router from 'next/router';

import { api } from "../services/api";

type User = {
  name: string;
  email: string;
  isAdmin: boolean;
}

type SignInCredentials = {
  email: string;
  password: string;
}

interface AuthContextData {
  signIn: (credentials: SignInCredentials) => Promise<void>;
  signOut: () => void;
  isAuthenticated: boolean;
  user: User;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData);

let authChannel: BroadcastChannel;

export function signOut() {
  destroyCookie(undefined, '@TimeAttendance:token');

  authChannel.postMessage('signOut');

  Router.push('/');
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>();
  const isAuthenticated = !!user;

  useEffect(() => {
    authChannel = new BroadcastChannel('auth');

    authChannel.onmessage = (message) => {
      switch (message.data) {
        case 'signOut':
          signOut();
          break;
        default:
          break;
      }
    }
  }, []);

  useEffect(() => {
    const { '@TimeAttendance:token': token } = parseCookies();

    if(token) {
      api.defaults.headers['Authorization'] = `Bearer ${token}`;

      api.get('/profile/me').then(response => {
        setUser(response.data);
      }).catch(() => signOut());
    }
  }, []);

  async function signIn({ email, password }: SignInCredentials) {
    const response = await api.post('/sessions', {
      email,
      password
    });

    const { token, user } = response.data;

    setCookie(undefined, '@TimeAttendance:token', token, {
      maxAge: 60 * 60 * 24, // 24 hours
      path: '/'
    });

    setUser(user);
    
    api.defaults.headers['Authorization'] = `Bearer ${token}`;

    Router.push('/admin/registers');
  }

  return (
    <AuthContext.Provider value={{ signIn, signOut, isAuthenticated, user }}>
      {children}
    </AuthContext.Provider>
  )
}