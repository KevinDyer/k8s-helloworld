(() => {
  'use strict';
  const PORT = process.env.PORT || 80;
  const SocketIOServer = require('socket.io');
  const io = new SocketIOServer();
  io.on('connect', (socket) => {
    console.log(`Socket connected ${socket.id}.`);
    socket.on('disconnect', () => {
      console.log(`Socket disconnected ${socket.id}.`);
    });
  });
  io.listen(PORT);
})();
