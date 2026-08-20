const express = require('express');
const router = express.Router();
const {adminLogin ,
     registerAdmin,
      adminLogout,
     forgotOTP,
     verifyForgotOTP,
     resetPassword,
     refreshAccessToken} = require('../controllers/admin/admin-authController');

router.post('/register', registerAdmin);
router.post('/login', adminLogin);
router.post('/refresh-token', refreshAccessToken);
router.post('/logout', adminLogout);
router.post('/forgotOtp',forgotOTP);
router.post('/verifyOtp',verifyForgotOTP);
router.put('/update-password',resetPassword)


module.exports = router;