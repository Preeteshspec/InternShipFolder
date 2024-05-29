const { io } = require('../services/socket');

io.on('connection', (socket) => {
  socket.on('bid', (data) => {
    io.emit('update', data);
  });
});
