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
        {/* <form method="get" action="play.html">
            <div id="login-input">
                <div id="username">
                    <label id="name-label">Username:</label>
                    <input type="text" placeholder="Username"/>
                </div>
                <div id="password">
                    <label id="password-label">Password:</label>
                    <input type="password" placeholder="Password"/>
                </div>
            </div>
            <div id="login-confirm">
                <button type="submit">Create</button>
                <button type="submit">Confirm</button>
            </div>
        </form> */}

        <div id="quote-body">
            <h5>Quote of the day: <span id="quote">"Quit, don't quit. Noodles, don't noodles."</span></h5>
        </div>
    </main>
  );
}

