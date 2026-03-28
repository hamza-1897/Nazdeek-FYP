const express = require('express');
const router = express.Router();
const {adminLogin , registerAdmin, refreshAccessToken} = require('../controllers/admin-authController');

router.post('/register', registerAdmin);
router.post('/login', adminLogin);
router.post('/refresh-token', refreshAccessToken);


module.exports = router;