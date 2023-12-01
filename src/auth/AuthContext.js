import React, { createContext, useContext, useState, useEffect } from 'react';
import supabase from './supabaseClient';

const AuthContext = createContext({ user: null, setUser: () => {} });

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Updated method to get the current session
    supabase.auth.getSession()
      .then(({ data: { session } }) => {
        setUser(session?.user || null);
      })
      .catch(error => {
        console.error('Error fetching session:', error);
      });

    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      const currentUser = session?.user || null;
      setUser(currentUser);

      if (event === 'SIGNED_OUT' || event === 'USER_DELETED') {
        deleteCookie('app_access_token');
        deleteCookie('app_refresh_token');
      } else if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        setCookie('app_access_token', session.access_token, 365);
        setCookie('app_refresh_token', session.refresh_token, 365);
      }
    });

    return () => {
      authListener.unsubscribe();
    };
  }, []);

  const setCookie = (name, value, days) => {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax; secure`;
  };

  const deleteCookie = (name) => {
    document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax; secure`;
  };

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
};
