const serviceModel = require('../../models/serviceModel');
const bookingModel = require('../../models/bookingModel');

const createBooking = async (req, res) => {
    try {
        const { userId, providerId, serviceId, bookingDate, bookingTime, description } = req.body;
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



module.exports = {
    createBooking
};
