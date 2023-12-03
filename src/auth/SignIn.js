
import React from "react";
import { useState } from 'react';
import supabase from './supabaseClient';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "./AuthContext";
import '../css/SignIn.css';
import { useEffect } from 'react';


function SignIn() {

  let navigate = useNavigate();
  const { user } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signInError, setSignInError] = useState('');


  const handleSignIn = async (email, password) => {

    if (user) {
      setSignInError('Already signed in.');
      console.log('current user: ', user);
      return;
    }

    if (!(await checkIfEmailInUsersTable(email))) {
      setSignInError('Email not found. Please register.');
      return;
    }

    const result = await supabase.auth.signInWithPassword({ email, password });

    const { user: signedInUser, session, error } = result;


    if (error) {
      setSignInError('Error: ' + error.message);
      return;
    }
      
    else {
  
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


  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSignIn(email, password);
    }
  };

  useEffect(() => {
    if (signInError) {
        const timer = setTimeout(() => {
            setSignInError(''); // Clear the error message after 5 seconds
        }, 3000);

        return () => clearTimeout(timer); // Cleanup the timer
    }
  }, [signInError]);


  return (
  <div>
      <div className="center" onKeyDown={handleKeyDown}>

        <p className='title-header'>Sign in with Email</p>


        <input className='user-info-input' type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email"/>
        <br/>
        <br/>
        <input className='user-info-input' type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
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