import React from 'react';
import Tile from "./tile";
import { WORD_LENGTH } from "./play";

export default function Row({ word, result }) {

    /*------------------ Variables --------------------*/
  const letters = word.padEnd(WORD_LENGTH).split("");

  /*--------- Return the row ---------*/
  return (
    <div className="rows">
      {letters.map((letter, i) => (
        <Tile
          id={`cell-${i}`}
          letter={letter}
          color={result[i]}
        />
      ))}
    </div>
  );
}