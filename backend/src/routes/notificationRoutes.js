const express = require('express');
const router = express.Router();
const {
  getNotifications,
  markAsRead,
} = require('../controllers/mutual/notificationController');

router.get('/:recipientId', getNotifications);
router.put('/read/:id', markAsRead);

module.exports = router;