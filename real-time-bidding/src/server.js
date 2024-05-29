const http = require('http');
const app = require('./app');
const { initialize } = require('./services/socket');
const { sequelize } = require('./models');

const server = http.createServer(app);
const io = initialize(server);

const PORT = process.env.PORT || 3000;

server.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  try {
    await sequelize.authenticate();
    console.log('Database connected');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
});
