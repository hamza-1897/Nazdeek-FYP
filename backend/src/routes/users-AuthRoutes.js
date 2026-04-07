
const express = require('express');
const router = express.Router();
const {registerUser,verifySignUPOTP ,userLogin ,resetPassword,forgotOTP,verifyForgotOTP,userLogout, refreshAccessToken} = require('../controllers/mutual/user-authController');

router.post('/register', registerUser);
router.post('/verify-otp', verifySignUPOTP);
router.post('/login', userLogin);
router.post('/logout', userLogout);
router.post('/forgot-password', forgotOTP);
router.post('/verify-forgot-otp', verifyForgotOTP);
router.post('/reset-password', resetPassword);

router.get('/refresh-token', refreshAccessToken);

module.exports = router;