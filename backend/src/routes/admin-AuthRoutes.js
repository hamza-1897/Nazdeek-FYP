const express = require('express');
const router = express.Router();
const {adminLogin , registerAdmin, adminLogout, refreshAccessToken} = require('../controllers/admin-authController');

router.post('/register', registerAdmin);
router.post('/login', adminLogin);
router.post('/refresh-token', refreshAccessToken);
router.post('/logout', adminLogout);


module.exports = router;