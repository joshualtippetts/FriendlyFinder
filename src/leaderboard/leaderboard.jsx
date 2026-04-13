import React from 'react';
import './leaderboard.css';


export function Leaderboard({ recentScore }) {

    /*------------------ Variables --------------------*/
  const [scores, setScores] = React.useState([]);
  const topScores = scores;

    /*--------- Return the leaderboard table ---------*/

  React.useEffect(() => {
    let ws;
    let reconnectTimeout;

    const loadScores = () => {
      fetch('/api/scores')
        .then(res => res.json())
        .then(data => setScores(data));
    };

    function connectWebSocket() {
      const protocol = window.location.protocol === 'https:' ? 'wss' : 'ws';
      const wsUrl = `${protocol}://${window.location.hostname}`;
      ws = new window.WebSocket(wsUrl);

      ws.onmessage = (event) => {
        try {
          const msg = JSON.parse(event.data);
          if (msg.type === 'leaderboard' && Array.isArray(msg.scores)) {
            setScores(msg.scores);
          }
        } catch (e) {}
      };
      ws.onerror = () => {
        ws.close();
      };
      ws.onclose = () => {
        reconnectTimeout = setTimeout(connectWebSocket, 3000);
      };
    }

    loadScores();
    connectWebSocket();

    return () => {
      if (ws) ws.close();
      if (reconnectTimeout) clearTimeout(reconnectTimeout);
    };
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
              <tr key={score.id ?? `${score.username}-${i}`}>
                <td className="table-placement">{i + 1}</td>
                <td className="table-player">{score.username}</td>
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
              <td className="table-player">{recentScore.username}</td>
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