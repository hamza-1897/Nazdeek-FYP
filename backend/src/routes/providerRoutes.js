const express = require('express');
const router = express.Router();
const upload = require('../config/cloudinary');
const { registerProvider } = require('../controllers/providerController');


router.post('/register',
    upload.fields([
    { name: 'cnicImages', maxCount: 2 },    
    { name: 'providerImage', maxCount: 10 } 
  ]),
    registerProvider);




module.exports = router;