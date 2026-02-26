import React from 'react';
import { useNavigate } from 'react-router-dom';

import Button from 'react-bootstrap/Button';

export function Authenticated(props) {

  /*------------------ Variables --------------------*/

  const navigate = useNavigate();

    /*----------------- Functions -------------------*/

  function logout() {
    localStorage.removeItem('userName');
    props.onLogout();
  }

  /*--------- Return the authenticated view ---------*/

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
