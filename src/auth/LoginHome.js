
import React from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from './supabaseClient';
import { useState } from 'react';

function Login() {

  let navigate = useNavigate();

  const [signInError, setSignInError] = useState('');

  const handleGoogleLogin = async () => {


    const { user, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    });

    if (error) {
      console.log(error);
      setSignInError('Error: ' + error.message);
      return;
    }

    else {
      navigate('/messageboard');
    }
  };




    return (
    <div>
        <div className='center'>
            <p className='title-header'>Sign in to chat!</p>

            <button className="button" onClick={() => navigate('/signin')}>Sign in with Email</button>
            <br/>
            <br/>
            <button className="button" onClick={handleGoogleLogin}>Sign in with Google</button>
            <br/>
            <br/>
            {signInError && <div className="error-message">{signInError}</div>}
            
        </div>
    </div>
  );
}

export default Login;