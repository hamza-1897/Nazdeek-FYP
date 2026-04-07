const express = require('express');
const router = express.Router();
const {addCategory} = require('../controllers/adminController');

router.post('/add-category', addCategory);


module.exports = router;