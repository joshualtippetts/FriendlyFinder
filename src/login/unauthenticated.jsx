import React from 'react';

import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

export function Unauthenticated(props) {
  const [userName, setUserName] = React.useState(props.userName);
  const [password, setPassword] = React.useState('');
  const [displayError, setDisplayError] = React.useState(null);

  async function loginUser() {
    localStorage.setItem('userName', userName);
    props.onLogin(userName);
  }

  async function createUser() {
    localStorage.setItem('userName', userName);
    props.onLogin(userName);
  }

  return (
    <>
      <h2 className="login-messege">Login to play!</h2>
      <div className='form'>
        <div className='input-group mb-3'>
          <span className='input-group-text'>Username</span>
          <input className='form-control' type='text' value={userName} onChange={(e) => setUserName(e.target.value)} placeholder='your@email.com' />
        </div>
        <div className='input-group mb-3'>
          <span className='input-group-text'>Password</span>
          <input className='form-control' type='password' onChange={(e) => setPassword(e.target.value)} placeholder='password' />
        </div>
        <div className="buttons">
          <Button variant='primary' onClick={() => loginUser()} disabled={!userName || !password}>
            Login
          </Button>
          <Button variant='secondary' onClick={() => createUser()} disabled={!userName || !password}>
            Create
          </Button>
        </div>
      </div>

      {displayError && (
        <div className='mt-3'>
          <Alert variant='danger' dismissible onClose={() => setDisplayError(null)}>
            {displayError}
          </Alert>
        </div>
      )}
    </>
  );
}
