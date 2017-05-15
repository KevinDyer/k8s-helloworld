(() => {
  'use strict';

  const os = require('os');
  const SocketIOClient = require('socket.io-client');

  const socket = new SocketIOClient(process.env.SERVER_HOSTNAME);

  function sendHostname() {
    socket.emit('hostname', os.hostname());
  }

  let interval = null;

  socket.on('connect', () => {
    console.log('Connected');
    interval = setInterval(sendHostname, 5000);
  });

  socket.on('connect_error', (err) => {
    console.log('Connect Error', err, process.env.SERVER_HOSTNAME);
  });

  socket.on('disconnect', () => {
    console.log('Disonnected');
    clearInterval(interval);
  });
})();
