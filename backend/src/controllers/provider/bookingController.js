const userModel = require('../../models/usersModel');
const providerModel = require('../../models/providerModel');
const bookingModel = require('../../models/bookingModel');


const getBookingsByProvider = async (req, res) => {
    try {
        const { providerId } = req.params;
        const bookings = await bookingModel.find({ providerId })
            .populate('userId', 'name profileImage email')
            .populate('serviceId', 'serviceName price');
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const updateBookingStatus = async (req, res) => {
    try {
        const { bookingId } = req.params;
        const { status } = req.body;
        const booking = await bookingModel.findByIdAndUpdate(bookingId, { status }, { new: true });
       
        res.status(200).json(booking);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


module.exports = {
    getBookingsByProvider,
    updateBookingStatus
};
