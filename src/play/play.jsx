import React from 'react';
import { useState, useEffect } from 'react';
import Board from "./board";
import { evaluateGuess } from "./evaluateGuess";
import './play.css';

export const WORD_LENGTH = 5;
export const MAX_GUESSES = 6;

export function Play({ userName, setScores, scores, setRecentScore }) {

  /*------------------ Variables --------------------*/
  const [answer, setAnswer] = useState("BASIC");
  const [guesses, setGuesses] = useState([]);
  const [currentGuess, setCurrentGuess] = useState("");
  const [complete, setComplete] = useState(false);
  const [loading, setLoading] = useState(true);
  const [answerFormat, setAnswerFormat] = useState("subtitle");

  /*----------------- Functions & Mechanics -------------------*/
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

  useEffect(() => {
      localStorage.setItem("scores", JSON.stringify(scores));
  }, [scores]);

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
        addScore(newGuesses.length);
      }
      return newGuesses;
    });
    setCurrentGuess("");
  }

  function addScore(guessCount) {
    setScores(prev => {
      const existing = prev.find(s => s.player === userName);

      let next;
      if (existing) {
        next = prev.map(s =>
          s.player === userName
            ? { ...s, score: Math.min(s.score, guessCount) }
            : s
        );
      } else {
        next = [...prev, { player: userName, score: guessCount }];
      }

      return next.slice(0, 5);
    });
    
    setRecentScore({player: userName, score: guesses.length + 1});
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