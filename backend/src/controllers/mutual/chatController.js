const chatModel = require('../../models/chatModel');
const messageModel = require('../../models/messageModel');

const accessChat = async (req, res) => {
  try {
    const { userId, providerId } = req.body;

    if (!userId || !providerId) {
      return res.status(400).json({ message: 'UserId and ProviderId are required' });
    }

    let chat = await chatModel.findOne({ customerId: userId, providerId })
      .populate('customerId', 'name profileImage ')
      .populate('providerId', 'name profileImage ');

    if (chat) {
      return res.status(200).json(chat);
    }

    const newChat = await chatModel.create({
      customerId: userId,
      providerId,
    });

    const fullChat = await chatModel.findById(newChat._id)
      .populate('customerId', 'name profileImage ')
      .populate('providerId', 'name profileImage ');

    res.status(201).json(fullChat);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const fetchChats = async (req, res) => {
  try {
    const { id, role } = req.params; 

    const chats = await chatModel.find({
      $or: [{ customerId: id }, { providerId: id }]
    })
      .populate('customerId', 'name profileImage')
      .populate('providerId', 'businessName providerImage')
      .populate('lastMessage')
      .sort({ updatedAt: -1 });

   return res.status(200).json(chats);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getMessages = async (req, res) => {
  try {
    const { chatId } = req.params;

    const messages = await messageModel.find({ chatId })
      .populate({
        path: 'senderId',
        refPath: 'senderModel',
        select: 'name profileImage',
      })
      .sort({ createdAt: 1 });

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const sendMessage = async (req, res) => {
  try {
    const { chatId, senderId, senderModel, receiverId, receiverModel , text } = req.body;

    if (!chatId || !senderId || !senderModel || !receiverId || !receiverModel || !text) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const message = await messageModel.create({
      chatId,
      senderId,
      senderModel,
      receiverId,
      receiverModel,
      text
    });

   const updatedChat = await chatModel.findByIdAndUpdate(
  chatId,
  { 
    $set: { 
      lastMessage: message._id,
    } 
  },
  { returnDocument: 'after' }
);
    

    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const markChatAsRead = async (req, res) => {
  try {
    const { chatId } = req.params;
    const { userId } = req.body; 

    await messageModel.updateMany(
      { chatId, receiverId: userId, isRead: false },
      { $set: { isRead: true } }
    );

    res.status(200).json({ message: 'Messages marked as read successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  accessChat,
  fetchChats,
  getMessages,
  sendMessage,
markChatAsRead
};