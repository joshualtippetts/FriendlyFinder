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
                        <img id="logo-head" src="public/word-duh-le_logo.png" alt="Word-duh-le logo"/>
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
                <Route path='/' element={<Login />} exact />
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
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4" crossorigin="anonymous"></script>
        </div>
    </BrowserRouter>
  );
}

function NotFound() {
  return <main>404: Return to sender. Address unknown.</main>;
}