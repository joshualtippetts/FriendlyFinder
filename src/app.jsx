import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Play } from './play/play';
import { Leaderboard } from './leaderboard/leaderboard';
import { AuthState } from './login/authState';


export default function App() {
    const [userName, setUserName] = React.useState(localStorage.getItem('userName') || '');
    const currentAuthState = userName ? AuthState.Authenticated : AuthState.Unauthenticated;
    const [authState, setAuthState] = React.useState(currentAuthState);

    
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
                            <li className="nav-item">
                                <NavLink className="nav-link" to="play">
                                    Play
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="leaderboard">
                                    Leaderboard
                                </NavLink>
                            </li>
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
                <Route path='/play' element={<Play />} />
                <Route path='/leaderboard' element={<Leaderboard />} />
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