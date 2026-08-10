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

    const query = role === 'customer' ? { customerId: id } : { providerId: id };

    const chats = await chatModel.find(query)
      .populate('customerId', 'name profileImage')
      .populate('providerId', 'name profileImage')
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

module.exports = {
  accessChat,
  fetchChats,
  getMessages,
};