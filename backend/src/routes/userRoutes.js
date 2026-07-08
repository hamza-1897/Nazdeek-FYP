const express = require('express');
const router = express.Router();
const {getUserProfile, updateUserProfile} = require('../controllers/users/userController');
const upload = require('../config/cloudinary');

router.post('/update-profile/:id', upload.single('profileImage'), updateUserProfile);

router.get('/myprofile/:id', getUserProfile);
// service routes
const { getAllServices } = require('../controllers/users/userServiceController');
router.get('/services', getAllServices);

// booking routes
const { createBooking, getBookingsbyUserId, cancelBooking, rebook } = require('../controllers/users/serviceBookController');
router.post('/book-service', createBooking);
router.get('/my-bookings/:userId', getBookingsbyUserId);
router.put('/cancel-booking/:bookingId', cancelBooking);
router.put('/rebook/:bookingId', rebook);



module.exports = router;