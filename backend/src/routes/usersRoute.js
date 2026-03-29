
const express = require('express');
const router = express.Router();
const {registerUser, userLogin, userLogout, refreshAccessToken} = require('../controllers/user-authController');

router.post('/register', registerUser);
router.post('/login', userLogin);
router.post('/logout', userLogout);
router.get('/refresh-token', refreshAccessToken);

module.exports = router;