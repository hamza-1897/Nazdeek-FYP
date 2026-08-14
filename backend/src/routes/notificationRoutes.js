const express = require('express');
const router = express.Router();
const {
  getNotifications,
  markAllAsRead,
    clearAllNotifications,
} = require('../controllers/mutual/notificationController');

router.get('/:recipientId', getNotifications);
router.put('/read/:recipientId', markAllAsRead);
router.delete('/clear/:recipientId', clearAllNotifications);

module.exports = router;