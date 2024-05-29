const { Server } = require('socket.io');

let io;

exports.initialize = (server) => {
  io = new Server(server, {
    cors: {
      origin: '*',
    },
  });

  io.on('connection', (socket) => {
    console.log('New client connected', socket.id);
    
    socket.on('disconnect', () => {
      console.log('Client disconnected', socket.id);
    });
  });

  return io;
};

exports.io = () => io;
