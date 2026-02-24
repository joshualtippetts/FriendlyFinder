import React from 'react';
import { useNavigate } from 'react-router-dom';

import Button from 'react-bootstrap/Button';

// import './authenticated.css';

export function Authenticated(props) {
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem('userName');
    props.onLogout();
  }

  return (
    <div>
      <h2 className='login-messege' id='auth-messege'>Welcome, {props.userName}!</h2>
      <div className='form'>
        <div className='buttons' id="auth-buttons">
          <Button variant='primary' onClick={() => navigate('/play')}>
            Play
          </Button>
          <Button variant='secondary' onClick={() => logout()}>
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
}
