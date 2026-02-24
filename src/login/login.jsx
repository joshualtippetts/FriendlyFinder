import React from 'react';
import './login.css';

import { Unauthenticated } from './unauthenticated';
import { Authenticated } from './authenticated';
import { AuthState } from './authState';

export function Login({ userName, authState, onAuthChange }) {
  return (
    <main>
      <div id="title">
        <h1>Welcome to Word-duh-le!</h1>
      </div>
      <div>
        {authState === AuthState.Authenticated && (
        <Authenticated userName={userName} onLogout={() => onAuthChange(userName, AuthState.Unauthenticated)} />
        )}
        {authState === AuthState.Unauthenticated && (
        <Unauthenticated
          userName={userName}
          onLogin={(loginUserName) => {
          onAuthChange(loginUserName, AuthState.Authenticated);
          }}
        />
        )}
      </div>

      <div id="quote-body">
        <h5>Quote of the day: <span id="quote">"Quit, don't quit. Noodles, don't noodles."</span></h5>
      </div>
    </main>
  );
}

