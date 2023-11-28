
import React, { useState } from 'react';
import supabase from './supabaseClient';
import { useNavigate } from 'react-router-dom';

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [signUpError, setSignUpError] = useState('');

  let navigate = useNavigate();

  const handleSignUp = async (email, password, name) => {

    if (await checkIfEmailInUsersTable(email)) {
        setSignUpError('Email already in use');
        return;
    }
    
    const { user, session, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
        console.error('Error signing up:', error);
        setSignUpError("Error: " + error.message);
    }

    /*
    else {

        const { data, insertError } = await supabase
        .from('users')
        .insert([{email: email, name: name}]);

        if (insertError) {
            console.error('Error inserting user email:', insertError);
        }
        
        navigate('/messageboard');
    }
    */
};

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
    <div className='center'>

        <p className='title-header'>Sign up with Email</p>  

        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        <br/>
        <br/>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
        <br/>
        <br/>
        <input type="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Display Name" />
        <br/>
        <br/>
        <button className='button' onClick={() => handleSignUp(email, password, name)}>Sign Up</button>
        <br/>
        <br/>
        {signUpError && <div className="error-message">{signUpError}</div>}

    </div>
  );
}

export default SignUp;
