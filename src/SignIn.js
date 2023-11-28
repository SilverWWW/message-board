
import React from "react";
import { useState } from 'react';
import supabase from './supabaseClient';
import { useNavigate } from 'react-router-dom';


function SignIn() {

  let navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const handleSignIn = async () => {
    console.log('handleSignIn');
  }
  

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
        <button className='button' onClick={handleSignIn}>Sign In</button>
        <br/>
        <br/>
        <button className='button' onClick={() => navigate('/signup')}>Not Registered? Sign Up</button>
        
      
        </div>
    </div>
    );

}

export default SignIn;