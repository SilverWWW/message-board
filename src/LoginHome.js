
import React from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from './supabaseClient';
import SignUp from './SignUp';

function Login() {

  let navigate = useNavigate();

  const handleGoogleLogin = async () => {

    console.log('handleGoogleLogin');

    try {
      const { user, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
      });
  
    } catch (error) {
      console.error('Login error:', error);
    }

  };




    return (
    <div>
        <div className='center'>
            <p className='title-header'>Sign in to chat!</p>

            <button className="button" onClick={handleGoogleLogin}>Sign in with Google</button>
            <br/>
            <br/>
            <button className="button" onClick={() => navigate('/signin')}>Sign in with Email</button>
        </div>
    </div>
  );
}

export default Login;