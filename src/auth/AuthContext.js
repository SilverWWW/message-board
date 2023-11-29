import React, { createContext, useContext, useState, useEffect } from 'react';
import supabase from './supabaseClient';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Asynchronously check for an existing session and set user
    const fetchSession = async () => {
      const { session, error } = await supabase.auth.getSession();
      if (error) {
        console.error('Error fetching session:', error);
      } else {
        console.log('Session fetched: ', session);
        setUser(session?.user || null);
      }
    };

    fetchSession();

    // Set up a listener for authentication state changes
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    // Cleanup the listener when the component unmounts
    return () => {
        if (authListener && typeof authListener.unsubscribe === 'function') {
          authListener.unsubscribe();
        }
        // If the unsubscribe method isn't available, handle accordingly
      };
    }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
