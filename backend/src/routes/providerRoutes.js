const express = require('express');
const router = express.Router();
const upload = require('../config/cloudinary');
const { registerProvider } = require('../controllers/provider/providerController');


router.post('/register',
    upload.fields([
    { name: 'cnicImages', maxCount: 2 },    
    { name: 'providerImage', maxCount: 1 } 
  ]),
    registerProvider);




module.exports = router;