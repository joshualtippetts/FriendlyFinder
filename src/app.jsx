import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

export default function App() {
    return (
        <div className="body bg-dark text-light">
            <header>
                <nav className="nav-body">
                    <img id="logo-head" src="public/word-duh-le_logo.png" alt="Word-duh-le logo" width="75px"/>
                    <menu className="nav nav-pills">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="login.html">
                                Login
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="play.html">
                                Play
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="leaderboard.html">
                                Leaderboard
                            </a>
                        </li>
                    </menu>
                </nav>
            </header>

      <main>App components go here</main>

      <footer className="bg-dark text-white-50">
        <div className="container-fluid">
          <span className="text-reset">Author Name(s)</span>
          <a className="text-reset" href="https://github.com/webprogramming260/simon-react">
            Source
          </a>
        </div>
      </footer>
    </div>
  );
}