
import React, { useState } from 'react';
import supabase from './supabaseClient';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "./AuthContext";

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [signUpError, setSignUpError] = useState('');
  const { user, setUser } = useAuth();


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

    if (await checkIfEmailInUsersTable(email)) {
        setSignUpError('Email already in use');
        return;
    }
    
    const result = await supabase.auth.signUp({ email, password });

    const { data, error } = result;

    console.log(data);

    const { session, user: signedUpUser } = data;

    console.log(signedUpUser.id);



    if (error) {
        if (error.message.includes('email address: invalid format')) {
            setSignUpError('Invalid email');
            return;
        }
        setSignUpError("Error: " + error.message);
        return;
    }
    
    else {

      setUser(signedUpUser)

      const { data, insertError } = await supabase
      .from('users')
      .insert([{email: email, name: name, id: signedUpUser.id}]);
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
        <button className='background-button' onClick={() => navigate('/loginhome')}>Back to Login</button>
        <br/>
        <br/>
        {signUpError && <div className="error-message">{signUpError}</div>}

    </div>
  );
}

export default SignUp;
