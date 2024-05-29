const express = require('express');
const { getNotifications, markAsRead } = require('../controllers/notificationController');
const authenticate = require('../middleware/authenticate');

const router = express.Router();

router.get('/', authenticate, getNotifications);
router.post('/mark-read', authenticate, markAsRead);

module.exports = router;
