const express = require('express');
const router = express.Router();
const upload = require('../config/cloudinary');


const { registerProvider ,submitPaymentSlip} = require('../controllers/provider/providerController')
// Provider Register Route
router.post(
  '/registerProvider',
  upload.fields([
    { name: 'providerImage', maxCount: 1 }, 
    { name: 'cnicFront', maxCount: 1 },     
    { name: 'cnicBack', maxCount: 1 },     
    { name: 'workImages', maxCount: 5 }     
  ]),
  registerProvider
);

router.post('/submit-payment', upload.single('paymentSlip'), submitPaymentSlip);

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

//review routes
const { getProviderReviews } = require('../controllers/mutual/reviewController');
router.get('/reviews/:providerId', getProviderReviews);



//Category route
const {getCategories} = require('../controllers/mutual/categoryController')
router.get('/getAllCategory',getCategories)

module.exports = router;