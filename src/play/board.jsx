import React from 'react';
import Row from "./row";
import { MAX_GUESSES } from "./play";
import { WORD_LENGTH } from "./play";

export default function Board({ guesses, currentGuess }) {
  const rows = [];

  for (let i = 0; i < MAX_GUESSES; i++) {
    const guess = guesses[i];

    if (guess) {
      rows.push(
        <Row id={`row${i + 1}`} word={guess.word} result={guess.result} />
      );
    } else if (i === guesses.length) {
      rows.push(
        <Row id={`row${i + 1}`} word={currentGuess} result={[]} />
      );
    } else {
      rows.push(
        <Row id={`row${i + 1}`} word="" result={[]} />
      );
    }
  }

  return <div className="board">{rows}</div>;
}