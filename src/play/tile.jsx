import React from 'react';

export default function Tile({ letter, color }) {
  return (
    <div className={`cell ${color || ""}`}>
      {letter}
    </div>
  );
}