import React from 'react';
import '../css/Footer.css';
import { useNavigate } from 'react-router-dom';
import supabase from '../auth/supabaseClient';
import { useAuth } from "../auth/AuthContext";
import { useState, useEffect } from 'react';

const Footer = () => {
  const { user } = useAuth();


  const [userName, setUserName] = useState("Not signed in");

  useEffect(() => {
    const fetchUserName = async () => {
      if (user) {
        const name = await getUserName(user.id);
        setUserName(name);
      } else {
        setUserName("Not signed in");
      }
    };

    fetchUserName();
  }, [user]);



  const logoutUser = async () => {
    const { error } = await supabase.auth.signOut();
  
    if (error) {
      console.error('Error logging out:', error);
    } else {
    }
  };


  const getUserName = async (id) => {

    const {data, error} = await supabase
      .from('users')
      .select('name')
      .eq('id', id)
      .maybeSingle();
    
      if (error) {
        console.error('Error getting user name:', error);
        return "Unknown";
      }

      return data ? data.name : "Unknown";
  }


  return (

    
    <div className='footer'>
      <div className="footer-left-message">
        <p>Currently signed in as: {userName}</p>
        {user && (
          <button className='button background-button' onClick={logoutUser}>Logout</button>
        )}
      </div>

      <p className="footer-right-message">© 2023 The Daily You. All rights reserved.</p>
    </div>
  );
};

export default Footer;