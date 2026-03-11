import React from 'react';
import './login.css';

import { Unauthenticated } from './unauthenticated';
import { Authenticated } from './authenticated';
import { AuthState } from './authState';

export function Login({ userName, authState, onAuthChange }) {

    /*------------------ Variables --------------------*/
  const [quote, setQuote] = React.useState('Loading...');
  const [quoteAuthor, setQuoteAuthor] = React.useState('unknown');

  /*----------------- Functions -------------------*/
    React.useEffect(() => {
      fetch('https://quote.cs260.click')
      .then((response) => response.json())
      .then((data) => {
        setQuote(data.quote);
        setQuoteAuthor(data.author);
      })
      .catch((error) => {
        setQuote('Noodles. Don\'t noodles. Quit. Don\'t quit.');
        setQuoteAuthor('');
      });
    }, []);

    /*--------- Return the login view ---------*/
  return (
    <main>
      <div id="title">
        <h1>Welcome to Word-duh-le!</h1>
      </div>
      <div>
        {authState === AuthState.Authenticated && (
        <Authenticated userName={userName} onLogout={() => 
            onAuthChange(userName, AuthState.Unauthenticated)
            
        } />
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
        <span id='quote'>"{quote}" - <b>{quoteAuthor}</b></span>
      </div>
    </main>
  );
}

