const express = require('express');
const router = express.Router();
const { accessChat, fetchChats, getMessages } = require('../controllers/mutual/chatController');

// Routes
router.post('/access', accessChat);
router.get('/user-chats/:id/:role', fetchChats);
router.get('/messages/:chatId', getMessages);

module.exports = router;