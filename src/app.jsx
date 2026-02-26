import React from 'react';
import { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Play } from './play/play';
import { Leaderboard } from './leaderboard/leaderboard';
import { AuthState } from './login/authState';


export default function App() {

    /*------------------ Variables --------------------*/
  const [userName, setUserName] = React.useState(localStorage.getItem('userName') || '');
  const currentAuthState = userName ? AuthState.Authenticated : AuthState.Unauthenticated;
  const [authState, setAuthState] = React.useState(currentAuthState);
  const [scores, setScores] = React.useState([
      { player: "Joshua", score: 2 },
      { player: "Alex", score: 3 },
      { player: "Sam", score: 4 },
    ]);
  const [recentScore, setRecentScore] = React.useState(null);


    /*----------------- Functions -------------------*/
  useEffect(() => {
    const stored = localStorage.getItem("scores");
    if (stored) {
        setScores(JSON.parse(stored));
    }
  }, []);

  //Simulate other players playing and adding scores to the leaderboard
  setInterval(() => {
    const score = Math.floor(Math.random() * 6) + 1;
    const userName = 'Oogway';
    setScores((prev) => [...prev, { player: userName, score }]);;
  }, 50000);


  /*--------- Return the app view ---------*/
  return (
    <BrowserRouter>
      <div className="body">
        <header>
          <nav className="nav-body">
            <img id="logo-head" src="/word-duh-le_logo.png" alt="Word-duh-le logo"/>
            <menu className="nav nav-pills">
              <li className="nav-item">
                <NavLink className="nav-link" to="">
                  Login
                </NavLink>
              </li>
              {authState === AuthState.Authenticated && (
                <li className="nav-item">
                  <NavLink className="nav-link" to="play">
                    Play
                  </NavLink>
                </li>
              )}
              {authState === AuthState.Authenticated && (
                <li className="nav-item">
                  <NavLink className="nav-link" to="leaderboard">
                    Leaderboard
                  </NavLink>
                </li>
              )}
            </menu>
          </nav>
        </header>

        <Routes>
          <Route
            path='/'
            element={
              <Login
                userName={userName}
                authState={authState}
                onAuthChange={(userName, authState) => {
                setAuthState(authState);
                setUserName(userName);
                  }}
              />
            }
              exact
          />
          <Route 
            path='/play' 
            element={
              <Play 
              userName={userName} 
              setScores={setScores} 
              scores={scores} 
              setRecentScore={setRecentScore} 
              />
            } 
          />
          <Route 
            path='/leaderboard' 
            element={
              <Leaderboard 
                scores={scores} 
                recentScore={recentScore} 
              />
            } 
          />
          <Route path='*' element={<NotFound />} />
        </Routes>

        <footer>
          <div className="author">
            <span>Joshua Tippetts</span>
            <a className="repo" href="https://github.com/joshualtippetts/Word-duh-le">
              Github
            </a>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

function NotFound() {
  return <main>404: Return to sender. Address unknown.</main>;
}