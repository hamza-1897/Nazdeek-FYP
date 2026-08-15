const express = require('express');
const router = express.Router();
const {
  getNotifications,
  markAsRead,
    clearAllNotifications,
} = require('../controllers/mutual/notificationController');

router.get('/:recipientId', getNotifications);
router.put('/read/:id', markAsRead);
router.delete('/clear/:recipientId', clearAllNotifications);

module.exports = router;