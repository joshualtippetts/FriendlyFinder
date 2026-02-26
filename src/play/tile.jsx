import React from 'react';

export default function Tile({ letter, color }) {

    /*--------- Return the tile ---------*/
  return (
    <div className={`cell ${color || ""}`}>
      {letter}
    </div>
  );
}