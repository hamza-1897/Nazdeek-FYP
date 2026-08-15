const notificationModel = require('../../models/notificationModel');


const getNotifications = async (req, res) => {
  try {
    const { recipientId } = req.params;

    const notifications = await notificationModel.find({ recipientId })
      .sort({ createdAt: -1 })
      .limit(50);

    return res.status(200).json(notifications);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


const markAllAsRead = async (req, res) => {
  try {
    const { recipientId } = req.params;

    const result = await notificationModel.updateMany(
      { recipientId, isRead: false }, 
      { $set: { isRead: true } }     
    );

    return res.status(200).json({
      success: true,
      message: "All notifications marked as read",
      modifiedCount: result.modifiedCount,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const clearAllNotifications = async (req, res) => {
  try {
    const { recipientId } = req.params;
    await notificationModel.deleteMany({ recipientId });

    return res.status(200).json({ message: 'All notifications cleared' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getNotifications,
  markAllAsRead,
  clearAllNotifications,
};