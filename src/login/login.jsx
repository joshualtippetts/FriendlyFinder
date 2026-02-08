import React from 'react';
import './login.css';

export function Login() {
  return (
    <main>
        <div id="title">
            <h1>Welcome to Word-duh-le!</h1>
            <h2>Login to play!</h2>
        </div>
        <form method="get" action="play.html">
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
        </form>

        <div id="quote-body">
            <h5>Quote of the day: <span id="quote">"Quit, don't quit. Noodles, don't noodles."</span></h5>
        </div>
    </main>
  );
}