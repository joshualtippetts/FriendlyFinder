import React from 'react';
import './leaderboard.css';


export function Leaderboard({ scores, recentScore }) {
  const topScores = [...scores]
    .sort((a, b) => a.score - b.score)
    .slice(0, 5);

  return (
    <main>
        <table className="leaderboard">
        <thead>
            <tr>
            <th className="table-placement">Rank</th>
            <th className="table-player">Player</th>
            <th className="table-tries">Score</th>
            </tr>
        </thead>

        <tbody>
            {topScores.length ? (
            topScores.map((score, i) => (
                <tr key={score.id ?? `${score.player}-${i}`}>
                <td className="table-placement">{i + 1}</td>
                <td className="table-player">{score.player}</td>
                <td className="table-tries">{score.score}</td>
                </tr>
            ))
            ) : (
            <tr key="no-scores">
                <td className="table-no-scores" colSpan="3">Be the first to score</td>
            </tr>
            )}
        </tbody>

        
        </table>
        <table id='your-stats'>
            <thead>
                <tr>
                    <th className="table-placement">Rank</th>
                    <th className="table-player">Player</th>
                    <th className="table-tries">Score</th>
                </tr>
            </thead>

            <tbody>
                {recentScore ? (
                <tr key="recent">
                    <td className="table-placement">Recent</td>
                    <td className="table-player">{recentScore.player}</td>
                    <td className="table-tries">{recentScore.score}</td>
                </tr>
                ) : (
                <tr key="no-recent">
                    <td className="table-no-scores" colSpan="3">Play first to show a score!</td>
                </tr>
                )}
            </tbody>
        </table>
    </main>
  );
}

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