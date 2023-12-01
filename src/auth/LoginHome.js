
import React from 'react';
import { useNavigate } from 'react-router-dom';

function LoginHome() {

  let navigate = useNavigate();

    return (
    <div>
        <div className='center'>
            <p className='title-header'>Sign in to chat!</p>

            <button className="button" onClick={() => navigate('/signin')}>Sign in with Email</button>
            
        </div>
    </div>
  );
}

export default LoginHome;