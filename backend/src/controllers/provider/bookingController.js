const userModel = require('../../models/usersModel');
const providerModel = require('../../models/providerModel');
const bookingModel = require('../../models/bookingModel');
const notificationModel = require('../../models/notificationModel');
const sendPushNotification = require('../../lib/sendPushNotification');

const getBookingsByProvider = async (req, res) => {
  try {
    const { providerId } = req.params;

    if (!providerId) {
      return res.status(400).json({ message: 'Provider ID is required' });
    }

    const bookings = await bookingModel
      .find({ providerId })
      .populate('userId', 'name profileImage email pushToken')
      .populate('serviceId', 'serviceName price')
      .sort({ createdAt: -1 });

    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateBookingStatus = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const { status } = req.body;

    if (!bookingId || !status) {
      return res.status(400).json({ message: 'Booking ID and status are required' });
    }

    const booking = await bookingModel
      .findByIdAndUpdate(bookingId, { status }, { new: true })
      .populate('serviceId', 'serviceName');

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    const user = await userModel.findById(booking.userId).select('name email pushToken');

    if (user) {
      const serviceTitle = booking.serviceId?.serviceName || 'Service';
      const title = 'Booking Status Updated';
      const body = `Your booking for "${serviceTitle}" is  ${status.toLowerCase()}.`;
      const extraData = { bookingId: booking._id, type: 'BOOKING' };

      await notificationModel.create({
        recipientId: user._id,
        recipientModel: 'User',
        title,
        body,
        type: 'BOOKING',
        data: extraData,
      });

      if (user.pushToken) {
        await sendPushNotification(user.pushToken, title, body, extraData);
      }
    }

    res.status(200).json({
      success: true,
      message: `Booking status updated to ${status}`,
      booking,
    });
  } catch (error) {
    console.error('Error in updateBookingStatus:', error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getBookingsByProvider,
  updateBookingStatus,
};