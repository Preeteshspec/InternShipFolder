const express = require('express');
const { getBids, placeBid } = require('../controllers/bidController');
const authenticate = require('../middleware/authenticate');

const router = express.Router();

router.get('/items/:itemId/bids', getBids);
router.post('/items/:itemId/bids', authenticate, placeBid);

module.exports = router;
