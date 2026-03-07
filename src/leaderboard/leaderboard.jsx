import React from 'react';
import './leaderboard.css';


export function Leaderboard({ recentScore }) {

    /*------------------ Variables --------------------*/
  const [scores, setScores] = React.useState([]);
  const topScores = [...scores]
    .sort((a, b) => a.score - b.score)
    .slice(0, 5);

    /*--------- Return the leaderboard table ---------*/

  React.useEffect(() => {
    const loadScores = () => {
        fetch('/api/scores')
        .then(res => res.json())
        .then(data => setScores(data));
    };

    loadScores();
    const interval = setInterval(loadScores, 10000);

    return () => clearInterval(interval);
  }, []);

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