
const express = require('express');
const router = express.Router();
const {registerUser,verifyOTP ,userLogin, userLogout, refreshAccessToken} = require('../controllers/user-authController');

router.post('/register', registerUser);
router.post('/verify-otp', verifyOTP);
router.post('/login', userLogin);
router.post('/logout', userLogout);
router.get('/refresh-token', refreshAccessToken);

module.exports = router;