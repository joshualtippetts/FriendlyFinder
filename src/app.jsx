import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Play } from './play/play';
import { Leaderboard } from './leaderboard/leaderboard';

export default function App() {
    return (
        <BrowserRouter>
            <div className="body">
                <header>
                    <nav className="nav-body">
                        <img id="logo-head" src="public/word-duh-le_logo.png" alt="Word-duh-le logo" width="75px"/>
                        <menu className="nav nav-pills">
                            <li className="nav-item">
                                <NavLink className="nav-link" to="login">
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

        <main>App components go here</main>

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
