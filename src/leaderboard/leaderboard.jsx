import React from 'react';
import './leaderboard.css';

export const [scores, setScores] = React.useState([
    { id: 1, player: "Joshua", score: 120 },
    { id: 2, player: "Alex", score: 110 },
    { id: 3, player: "Sam", score: 95 },
  ]);

export function Leaderboard({ entries }) {

  const sortedScores = [...scores].sort(
    (a, b) => b.score - a.score
  );


  return (
    <table className="leaderboard">
      <thead>
        <tr>
          <th>Rank</th>
          <th>Player</th>
          <th>Score</th>
        </tr>
      </thead>

      <tbody>
        {entries.map((entry, index) => (
          <tr key={entry.id}>
            <td>{index + 1}</td>
            <td>{entry.player}</td>
            <td>{entry.score}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}




// export function Leaderboard() {
//   const [scores, setScores] = React.useState([]);

//   // Demonstrates calling a service asynchronously so that
//   // React can properly update state objects with the results.
//   React.useEffect(() => {
//     const scoresText = localStorage.getItem('scores');
//     if (scoresText) {
//       setScores(JSON.parse(scoresText));
//     }
//   }, []);

//   // Demonstrates rendering an array with React
//   const scoreRows = [];
//   if (scores.length) {
//     for (const [i, score] of scores.entries()) {
//       scoreRows.push(
//         <tr id={i}>
//           <td className='table-placement'>{i}</td>
//           <td className='table-player'>{score.name}</td>
//           <td className='table-score'>{score.score}</td>
//         </tr>
//       );
//     }
//   } else {
//     scoreRows.push(
//       <tr key='0'>
//         <td colSpan='4'>Be the first to score</td>
//       </tr>
//     );
//   }

//   return (
//     <main className='leaderboard'>
//       <h3 className="subtitle">Daily Leaderboard</h3>
//       <table className='table'>
//         <thead className='table-head'>
//           <tr>
//             <th className='table-placement'>#</th>
//             <th className='table-player'>Player</th>
//             <th className='table-score'>Score</th>
//           </tr>
//         </thead>
//         <tbody id='scores'>{scoreRows}</tbody>
//       </table>
//     </main>
//   );
// }


// export function Leaderboard() {
//   return (
//     <main>
        
//         <table>
//             <thead>
//                 <th className="table-placement">#</th>
//                 <th className="table-player">Player</th>
//                 <th className="table-tries">Tries</th>
//             </thead>
//             <tbody>
//                 <tr>
//                     <td className="table-placement">1</td>
//                     <td className="table-player">John</td>
//                     <td className="table-tries">2</td>
//                 </tr>
//                 <tr>
//                     <td className="table-placement">2</td>
//                     <td className="table-player">Jane</td>
//                     <td className="table-tries">3</td>
//                 </tr>
//                 <tr>
//                     <td className="table-placement">3</td>
//                     <td className="table-player">You</td>
//                     <td className="table-tries">4</td>
//                 </tr>
//             </tbody>
//         </table>

//         <table id="your-stats">
//             <thead>
//                 <th className="table-placement">#</th>
//                 <th className="table-player">Player</th>
//                 <th className="table-tries">Tries</th>
//             </thead>
//             <tbody>
//                 <tr>
//                     <td className="table-placement">3</td>
//                     <td className="table-player">You</td>
//                     <td className="table-tries">4</td>
//                 </tr>
//             </tbody>
//         </table>
//     </main>
//   );
// }