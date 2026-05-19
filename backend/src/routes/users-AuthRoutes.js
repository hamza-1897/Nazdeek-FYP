
const express = require('express');
const router = express.Router();
const {registerUser,verifySignUPOTP ,userLogin ,resetPassword,forgotOTP,verifyForgotOTP,userLogout,updateRole, refreshAccessToken} = require('../controllers/mutual/user-authController');

router.post('/register', registerUser);
router.post('/verify-otp', verifySignUPOTP);
router.post('/login', userLogin);
router.post('/logout', userLogout);
router.post('/forgot-password', forgotOTP);
router.post('/verify-forgot-otp', verifyForgotOTP);
router.post('/reset-password', resetPassword);
router.post('/update-role/:id', updateRole);

router.get('/refresh-token', refreshAccessToken);

module.exports = router;