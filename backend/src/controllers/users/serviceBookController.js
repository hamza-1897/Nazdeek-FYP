const serviceModel = require('../../models/serviceModel');
const bookingModel = require('../../models/bookingModel');
const providerModel = require('../../models/providerModel');

const createBooking = async (req, res) => {
    try {
        const { 
            userId,
            providerId, 
            serviceId, 
            customerName, 
            customerPhone, 
            bookingDate, 
            bookingTime, 
            bookingAddress, 
            bookingPrice,
            description 
        } = req.body;

//        const userId = req.user?._id ;

        if (!userId || !providerId || !serviceId || !bookingDate || !bookingTime || !bookingAddress || !customerPhone) {
            return res.status(400).json({ 
                success: false, 
                message: 'All required fields must be provided.' 
            });
        }

        const activeBooking = await bookingModel.findOne({
            userId,
            serviceId,
            status: { $nin: ['cancelled', 'completed'] }
        });

        if (activeBooking) {
            return res.status(400).json({ 
                success: false, 
                message: 'You already have an active booking for this service.' 
            });
        }

        const newBooking = await bookingModel.create({
            userId,
            providerId,
            serviceId,
            bookingDate,
            bookingTime,
            customerName,
            customerPhone,
            bookingAddress,
            bookingPrice,
            description
        });

        return res.status(201).json({
            success: true,
            message: 'Booking created successfully!',
            booking: newBooking
        });

    } catch (error) {
        console.error('Error in createBooking:', error);
        return res.status(500).json({ 
            success: false, 
            message: error.message || 'Server Error while creating booking.' 
        });
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
