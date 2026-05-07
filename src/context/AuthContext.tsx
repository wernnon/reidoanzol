// src/context/AuthContext.tsx
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '../libs/supabase';
import { authAPI } from '../api/auth';
import { Profile } from '../types';

interface AuthContextProps {
  user: User | null;
  profile: Profile | null;
  session: Session | null;
  isLoading: boolean;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 1. Pega a sessão atual ao carregar o site
    const initializeAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      setUser(session?.user || null);

      if (session?.user) {
        try {
          // Se tem utilizador, busca o perfil com CPF, Role, etc.
          const userProfile = await authAPI.getCurrentProfile(session.user.id);
          setProfile(userProfile);
        } catch (error) {
          console.error("Erro ao carregar perfil do DB", error);
        }
      }
      setIsLoading(false);
    };

    initializeAuth();

    // 2. Fica a escutar mudanças (Ex: Quando o utilizador faz login na Navbar)
    const { data: authListener } = supabase.auth.onAuthStateChange(async (_event, newSession) => {
      setSession(newSession);
      setUser(newSession?.user || null);
      
      if (newSession?.user) {
        const userProfile = await authAPI.getCurrentProfile(newSession.user.id);
        setProfile(userProfile);
      } else {
        setProfile(null);
      }
      setIsLoading(false);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    await authAPI.logoutUser();
  };

  return (
    <AuthContext.Provider value={{ user, profile, session, isLoading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};