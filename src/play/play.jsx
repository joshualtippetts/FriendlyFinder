import React from 'react';
import { useState, useEffect } from 'react';
import Board from "./board";
import { evaluateGuess } from "./evaluateGuess";
import './play.css';

export const WORD_LENGTH = 5;
export const MAX_GUESSES = 6;

export function Play({ userName, setRecentScore }) {

  /*------------------ Variables --------------------*/
  const [answer, setAnswer] = useState("BASIC");
  const [guesses, setGuesses] = useState([]);
  const [currentGuess, setCurrentGuess] = useState("");
  const [complete, setComplete] = useState(false);
  const [loading, setLoading] = useState(true);
  const [answerFormat, setAnswerFormat] = useState("subtitle");

  /*----------------- Functions & Mechanics -------------------*/

  //Simulate other players playing and adding scores to the leaderboard
  useEffect(() => {
    const interval = setInterval(() => {
      const score = Math.floor(Math.random() * 6) + 1;
      const player = 'Oogway';
      addScore(player, score);
    }, 500000);

    return () => clearInterval(interval);
  }, []);


  useEffect(() => {
    fetch("/words.txt")
      .then(res => res.text())
      .then(text => {
        const words = text
          .split("\n")
          .map(w => w.trim())
          .filter(Boolean);
        setAnswer(getRandomWord(words));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (loading) return;
      if (e.key === "Enter") {
        submitGuess();
      } else if (!complete && e.key === "Backspace") {
        setCurrentGuess((prev) => prev.slice(0, -1));
      } else if (!complete && /^[a-zA-Z]$/.test(e.key)) {
        if (currentGuess.length < WORD_LENGTH) {
          setCurrentGuess((prev) => prev + e.key.toUpperCase());
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentGuess, loading]);

  function getRandomWord(words) {
    const index = Math.floor(Math.random() * words.length);
    return words[index];
  }

  function submitGuess() {
    if (currentGuess.length !== WORD_LENGTH) return;

    const result = evaluateGuess(currentGuess, answer);
    const isCorrect = currentGuess.toUpperCase() === answer.toUpperCase();

    setGuesses((prev) => {
      const newGuesses = [...prev, { word: currentGuess, result }];
      if (isCorrect || newGuesses.length === MAX_GUESSES) {
        setComplete(true);
        setAnswerFormat("changed-subtitle")
        addScore(userName, newGuesses.length);
      }
      return newGuesses;
    });
    setCurrentGuess("");
  }

  async function addScore( playerName, guessCount) {
    const newScore = { player: playerName, score: guessCount };

    await fetch('/api/score', {
      method: 'POST',
      headers: { 'content-type': 'application/json; charset=UTF-8' },
      body: JSON.stringify(newScore),
    });

    if (playerName === userName) {
      setRecentScore({player: playerName, score: guessCount});
    }
  }

  /*--------- Return the play view ---------*/
  return (
    <main>
      <section>
        <div className={`${answerFormat}`}>
          <h3>Player Profile: <span>{userName}</span></h3> 
          {complete && (
                  <h4 className="answer">
                      The answer was: {answer.toUpperCase()}
                  </h4>
                  )
          }
        </div>
        <div className="game">
          <Board
            guesses={guesses}
            currentGuess={currentGuess}
            complete={complete}
          />
        </div>
      </section>
    </main>
  );
}