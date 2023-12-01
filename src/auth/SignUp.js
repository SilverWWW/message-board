
import React, { useState } from 'react';
import supabase from './supabaseClient';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "./AuthContext";

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [signUpError, setSignUpError] = useState('');
  const { user } = useAuth();


  let navigate = useNavigate();

  const handleSignUp = async (email, password, name) => {

    if (password.length < 6) {
        setSignUpError('Password must be at least 6 characters long');
        return;
    }

    if (user) {
      console.log('Already signed in: ', user);
      return;
    }

    if (!email || !password || !name) {
      setSignUpError('Missing email, password, or name');
      return;
    }

    if (await checkIfEmailInUsersTable(email)) {
        setSignUpError('Email already in use');
        return;
    }

    if (await checkIfUsernameInUsersTable(name)) {
      setSignUpError('Username already in use');
      return;
    }
    
    const { data: newData, error } = await supabase.auth.signUp({ email, password });


    if (error) {
        if (error.message.includes('email address: invalid format')) {
            setSignUpError('Invalid email');
            return;
        }
        setSignUpError("Error: " + error.message);
        return;
    }
    
    else {

      const { insertData, insertError } = await supabase
      .from('users')
      .insert([{email: email, name: name, id: newData.user.id}]);

      if (insertError) {
        console.error('Error inserting user:', insertError);
        return;
      }
    }

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

  const checkIfUsernameInUsersTable = async (username) => {

    const { data, error } = await supabase
        .from('users')
        .select('name')
        .eq('name', username)
        .maybeSingle();

    if (error) {
        console.error('Error getting user name:', error);
        return false;
    }

    return !!data;
  };



  return (
    <div className='center'>

        <p className='title-header'>Sign up with Email</p>  

        <input className='user-info-input' type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        <br/>
        <br/>
        <input className='user-info-input' type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
        <br/>
        <br/>
        <input className='user-info-input' type="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Display Name" />
        <br/>
        <br/>
        <button className='button' onClick={() => handleSignUp(email, password, name)}>Sign Up</button>
        <br/>
        <br/>
        <button className='button background-button' onClick={() => navigate('/loginhome')}>Back to Login</button>
        <br/>
        <br/>
        {signUpError && <div className="error-message">{signUpError}</div>}

    </div>
  );
}

export default SignUp;
