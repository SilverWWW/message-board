
import React from "react";
import { useState } from 'react';
import supabase from './supabaseClient';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "./AuthContext";


function SignIn() {

  let navigate = useNavigate();
  const { setUser } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signInError, setSignInError] = useState('');


  const handleSignIn = async (email, password) => {
    
    if (!(await checkIfEmailInUsersTable(email))) {
      setSignInError('Email not found. Please register.');
      return;
    }

    const { user, session, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      setSignInError('Error: ' + error.message);
      return;
    }
      
    else {
      setUser(user);
      navigate('/messageboard');
    }
  }

  const checkIfEmailInUsersTable = async (email) => {

    const { data, error } = await supabase
        .from('users')
        .select('email')
        .eq('email', email)
        .maybeSingle();

    if (error) {
        console.error('Error getting user email:', error);
        return false;
    }

    return !!data;
  };
  

  return (
  <div>
      <div className="center">

        <p className='title-header'>Sign in with Email</p>


        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email"/>
        <br/>
        <br/>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
        <br/>
        <br/>
        <button className='button' onClick={() => handleSignIn(email, password)}>Sign In</button>
        <br/>
        <br/>
        <button className='button background-button'  onClick={() => navigate('/signup')}>Not Registered? Sign Up</button>
        <br/>
        <br/>
        <button className='button background-button' onClick={() => navigate('/loginhome')}>Back to Login</button>
        <br/>
        <br/>
        {signInError && <div className="error-message">{signInError}</div>}
        
      
        </div>
    </div>
    );

}

export default SignIn;