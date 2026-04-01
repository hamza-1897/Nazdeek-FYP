const express = require('express');
const router = express.Router();
const {getUserProfile, updateUserProfile} = require('../controllers/userController');
const upload = require('../config/cloudinary');

router.post('/update-profile/:id', upload.single('profileImage'), updateUserProfile);



router.get('/myprofile/:id', getUserProfile);



module.exports = router;