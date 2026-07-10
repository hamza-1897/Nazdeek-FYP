const serviceModel = require('../../models/serviceModel');
const bookingModel = require('../../models/bookingModel');
const providerModel = require('../../models/providerModel');

const createBooking = async (req, res) => {
    try {
        const { userId, providerId, serviceId, bookingDate, bookingTime, description } = req.body;

        const alreadyBooked = await bookingModel.findOne({
            userId,
            providerId,
            serviceId,
            status : { $nin: ['cancelled', 'completed'] }
        });
        if (alreadyBooked) {
            return res.status(400).json({ message: 'You have already booked this service.' });
        }
        const booking = await bookingModel.create({
            userId,
            providerId,
            serviceId,
            bookingDate,
            bookingTime,
            description
        });
        res.status(201).json(booking);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getBookingsbyUserId = async (req, res) => {
    try {
        const { userId } = req.params;
        const bookings = await bookingModel.find({ userId }).populate('serviceId', 'serviceName serviceImages price').populate('providerId', 'businessName');


        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const cancelBooking = async (req,res) => {

    try {
        const { bookingId } = req.params;
        const booking = await bookingModel.findByIdAndUpdate(bookingId, { status: 'cancelled' }, { new: true });
       res.status(200).json(booking);
    } catch (error) {
        res.status(500).json({ message: error.message });
        
    }
}

const rebook = async (req,res) => {
    try {
        const { bookingId } = req.params;
        const { bookingDate, bookingTime } = req.body;
         await bookingModel.findByIdAndUpdate(bookingId, { bookingDate, bookingTime }, { new: true });
        const booking = await bookingModel.findByIdAndUpdate(bookingId, { status: 'rebooked' }, { new: true });
       res.status(200).json(booking);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}



module.exports = {
    createBooking,
    getBookingsbyUserId,
    cancelBooking,
    rebook
};
