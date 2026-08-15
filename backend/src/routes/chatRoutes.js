const express = require('express');
const router = express.Router();
const { accessChat, fetchChats, getMessages , sendMessage,markChatAsRead} = require('../controllers/mutual/chatController');

// Routes
router.post('/access', accessChat);
router.get('/user-chats/:id/:role', fetchChats);
router.get('/messages/:chatId', getMessages);
router.post('/sendMessage', sendMessage);
router.put('/markRead/:chatId',markChatAsRead)
module.exports = router;