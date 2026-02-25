import React from 'react';
import { useState, useEffect } from 'react';
import Board from "./board";
import { evaluateGuess } from "./evaluateGuess";
import './play.css';

export const WORD_LENGTH = 5;
export const MAX_GUESSES = 6;

export function Play(props) {
  const userName= props.userName;
  const [answer, setAnswer] = useState("CRANE");
  const [guesses, setGuesses] = useState([]);
  const [currentGuess, setCurrentGuess] = useState("");

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Enter") {
        submitGuess();
      } else if (e.key === "Backspace") {
        setCurrentGuess((prev) => prev.slice(0, -1));
      } else if (/^[a-zA-Z]$/.test(e.key)) {
        if (currentGuess.length < WORD_LENGTH) {
          setCurrentGuess((prev) => prev + e.key.toUpperCase());
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentGuess]);

  function submitGuess() {
    if (currentGuess.length !== WORD_LENGTH) return;

    const result = evaluateGuess(currentGuess, answer);

    setGuesses((prev) => [...prev, { word: currentGuess, result }]);
    setCurrentGuess("");
  }

  return (
    <main>
      <section>
        <h3 className="subtitle">Player Profile: <span>{userName}</span></h3> 
        <div className="game">
          <Board
            guesses={guesses}
            currentGuess={currentGuess}
          />
        </div>
      </section>
    </main>
  );
}