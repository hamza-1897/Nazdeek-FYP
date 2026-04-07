const express = require('express');
const router = express.Router();
const {addCategory,getAllCategories} = require('../controllers/admin/categoryController');

// category routes
router.get('/getallcategories', getAllCategories);
router.post('/add-category', addCategory);


module.exports = router;