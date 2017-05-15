(() => {
  'use strict';

  const PORT = process.env.PORT || 80;

  const http = require('http');
  const express = require('express');
  const SocketIOServer = require('socket.io');

  const app = express();
  const server = http.createServer(app);
  const io = new SocketIOServer(server);

  io.on('connect', (socket) => {
    console.log(`Socket connected ${socket.id}.`);
    socket.on('disconnect', () => {
      console.log(`Socket disconnected ${socket.id}.`);
    });
  });

  app.get('/', (req, res) => {
    io.sockets.clients((err, clients) => {
      if (err) {
        res.status(500).json({error: err});
      } else {
        res.status(200).json({numSockets: clients.length});
      }
    });
  });

  server.listen(PORT, () => {
    console.log(`Started server on ${PORT}`);
  });
})();
