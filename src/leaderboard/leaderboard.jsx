import React from 'react';
import './leaderboard.css';

export function Leaderboard() {
  return (
    <main>
        <h3 className="subtitle">Daily Leaderboard</h3>
        <table>
            <thead>
                <th className="table-placement">#</th>
                <th className="table-player">Player</th>
                <th className="table-tries">Tries</th>
            </thead>
            <tbody>
                <tr>
                    <td className="table-placement">1</td>
                    <td className="table-player">John</td>
                    <td className="table-tries">2</td>
                </tr>
                <tr>
                    <td className="table-placement">2</td>
                    <td className="table-player">Jane</td>
                    <td className="table-tries">3</td>
                </tr>
                <tr>
                    <td className="table-placement">3</td>
                    <td className="table-player">You</td>
                    <td className="table-tries">4</td>
                </tr>
            </tbody>
        </table>

        <table id="your-stats">
            <thead>
                <th className="table-placement">#</th>
                <th className="table-player">Player</th>
                <th className="table-tries">Tries</th>
            </thead>
            <tbody>
                <tr>
                    <td className="table-placement">3</td>
                    <td className="table-player">You</td>
                    <td className="table-tries">4</td>
                </tr>
            </tbody>
        </table>
    </main>
  );
}