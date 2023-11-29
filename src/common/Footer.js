import React from 'react';
import '../css/Footer.css';
import { useNavigate } from 'react-router-dom';
import supabase from '../auth/supabaseClient';
import { useAuth } from "../auth/AuthContext";
import { useState, useEffect } from 'react';

const Footer = () => {
  let navigate = useNavigate();
  const { user, setUser } = useAuth();

  const logoutUser = async () => {
    const { error } = await supabase.auth.signOut();
  
    if (error) {
      console.error('Error logging out:', error);
    } else {
      setUser(null);
    }
  };

  return (
    <div className='footer'>
      <div className="footer-left-message">
        <p>Currently signed in as: {user ? user.email : 'none'}</p>
        {user && (
          <button className='button background-button' onClick={logoutUser}>Logout</button>
        )}
      </div>

      <p className="footer-right-message">© 2023 The Daily You. All rights reserved.</p>
    </div>
  );
};

export default Footer;