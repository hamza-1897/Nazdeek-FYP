const express = require('express');
const router = express.Router();
const upload = require('../config/cloudinary');

// provider routes
const { registerProvider } = require('../controllers/provider/providerController');
router.post('/register',
    upload.fields([
    { name: 'cnicImages', maxCount: 2 },    
    { name: 'providerImage', maxCount: 1 } 
  ]),
    registerProvider);

// service routes
const { createService,editService,deleteService, getServicesByProvider } = require('../controllers/provider/serviceController');

router.post('/create-service', upload.array('serviceImages'), createService);
router.get('/services/:providerId', getServicesByProvider);
router.put('/edit-service/:serviceId', upload.array('serviceImages'), editService);
router.delete('/delete-service/:serviceId', deleteService);


// booking routes
const { getBookingsByProvider, updateBookingStatus } = require('../controllers/provider/bookingController');
router.get('/bookings/:providerId', getBookingsByProvider);
router.put('/update-booking-status/:bookingId', updateBookingStatus);



module.exports = router;