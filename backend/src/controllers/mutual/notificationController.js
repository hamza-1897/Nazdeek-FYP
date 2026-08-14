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


const markAsRead = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedNotification = await notificationModel.findByIdAndUpdate(
      id,
      { isRead: true },
      { new: true }
    );

    return res.status(200).json(updatedNotification);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getNotifications,
  markAsRead,
};