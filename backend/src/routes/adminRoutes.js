const express = require('express');
const router = express.Router();
const {adminLogin , registerAdmin} = require('../controllers/admin-authController');

router.post('/register', registerAdmin);
router.post('/login', adminLogin);



module.exports = router;