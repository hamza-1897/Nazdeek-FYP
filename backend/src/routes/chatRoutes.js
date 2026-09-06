const express = require('express');
const router = express.Router();
const { accessChat, fetchChats, getMessages , sendMessage, sendMediaMessage, markChatAsRead} = require('../controllers/mutual/chatController');
const chatUpload = require('../config/chatMediaUpload');

// Routes
router.post('/access', accessChat);
router.get('/user-chats/:id/:role', fetchChats);
router.get('/messages/:chatId', getMessages);
router.post('/sendMessage', sendMessage);
router.post('/send-media', chatUpload.single('media'), sendMediaMessage);
router.put('/markRead/:chatId',markChatAsRead)
module.exports = router;
