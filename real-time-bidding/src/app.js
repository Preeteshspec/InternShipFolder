const express = require('express');
const rateLimit = require('./middleware/rateLimit');
const userRoutes = require('./routes/userRoutes');
const itemRoutes = require('./routes/itemRoutes');
const bidRoutes = require('./routes/bidRoutes');
const notificationRoutes = require('./routes/notificationRoutes');

const app = express();

app.use(express.json());
app.use(rateLimit);
app.use('/uploads', express.static('uploads'));
app.use('/users', userRoutes);
app.use('/items', itemRoutes);
app.use('/bids', bidRoutes);
app.use('/notifications', notificationRoutes);

app.get('/', (req, res) => {
  res.send('Real-time Bidding API');
});

module.exports = app;
