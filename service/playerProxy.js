const { WebSocketServer, WebSocket } = require('ws');

function playerProxy(httpServer, setBroadcastFn) {
  const socketServer = new WebSocketServer({ server: httpServer });

  // Broadcast function for use in Express
  function broadcastToAll(msgObj) {
    const msg = JSON.stringify(msgObj);
    socketServer.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(msg);
      }
    });
  }
  if (setBroadcastFn) setBroadcastFn(broadcastToAll);

  socketServer.on('connection', (socket) => {
    socket.isAlive = true;

    socket.on('message', (data) => {
      let msg;
      try {
        msg = JSON.parse(data);
      } catch (e) {
        return;
      }
      // If a client sends a score, you could handle it here if needed
      if (msg.type === 'score') {
        broadcastToAll({ type: 'leaderboard', scores: msg.scores });
      }
    });

    socket.on('pong', () => {
      socket.isAlive = true;
    });
  });

  setInterval(() => {
    socketServer.clients.forEach(function each(client) {
      if (client.isAlive === false) return client.terminate();

      client.isAlive = false;
      client.ping();
    });
  }, 10000);
}

module.exports = { playerProxy };
