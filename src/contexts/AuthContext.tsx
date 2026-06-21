import React, { createContext, useContext, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';

interface AuthContextType {
  session: Session | null;
  user: User | null;
  signOut: () => Promise<void>;
  loading: boolean;
}

// Mock user — bypasses Supabase for local/hackathon demo
const MOCK_USER: User = {
  id: 'demo-user-id',
  email: 'demo@supportflow.ai',
  aud: 'authenticated',
  role: 'authenticated',
  created_at: new Date().toISOString(),
} as User;

const AuthContext = createContext<AuthContextType>({
  session: null,
  user: MOCK_USER,
  signOut: async () => {},
  loading: false,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  // Always keep mock user — sign out just navigates to landing, doesn't break app
  const [user] = useState<User | null>(MOCK_USER);

  // Sign out is a no-op on user state — navigation is handled in MissionControlLayout
  const signOut = async () => {};

  return (
    <AuthContext.Provider value={{ session: null, user, signOut, loading: false }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
