const express = require('express');
const router = express.Router();
const {getUserProfile,getCustomerDashboard, updateUserProfile,getAllProviders, deleteAccount} = require('../controllers/users/userController');
const upload = require('../config/cloudinary');

router.post('/update-profile/:id', upload.single('profileImage'), updateUserProfile);
router.get('/getDashboard',getCustomerDashboard);
router.get('/myprofile/:id', getUserProfile);
router.get('/providers', getAllProviders);
router.delete('/delete-account', deleteAccount);
const {getMe} = require('../controllers/mutual/user-authController')
router.get('/getMe',getMe)
// service routes
const { getAllServices, getServiceById, getAvailableFilters, getProviderbyId } = require('../controllers/users/userServiceController');
router.get('/services', getAllServices);
router.get('/services/:id', getServiceById);  
router.get('/provider/:providerId',getProviderbyId)  
router.get('/available-filters', getAvailableFilters);
// booking routes
const { createBooking, getBookingsbyUserId, cancelBooking, rebook } = require('../controllers/users/serviceBookController');
router.post('/book-service', createBooking);
router.get('/my-bookings/:userId', getBookingsbyUserId);
router.put('/cancel-booking/:bookingId', cancelBooking);
router.put('/rebook/:bookingId', rebook);

//report routes
const { createReport } = require('../controllers/mutual/userReportsController');
router.post('/create-report', createReport);

//review routes
const { createReview } = require('../controllers/mutual/reviewController');
router.post('/create-review', createReview);

const {getPublicSettings} = require('../controllers/mutual/supportController')
router.get('/getSupportDetails',getPublicSettings)

const {updateFcmToken} = require('../controllers/mutual/user-authController');
router.post('/update-fcmToken',updateFcmToken)

module.exports = router;