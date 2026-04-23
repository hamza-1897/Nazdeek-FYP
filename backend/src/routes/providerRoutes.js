const express = require('express');
const router = express.Router();
const upload = require('../config/cloudinary');

// provider routes
const { registerProvider } = require('../controllers/provider/providerController');
router.post('/register',
    upload.fields([
    { name: 'cnicImages', maxCount: 2 },    
    { name: 'providerImage', maxCount: 1 } 
  ]),
    registerProvider);

// service routes
const { createService } = require('../controllers/provider/serviceController');

router.post('/create-service', upload.array('serviceImages'), createService);

module.exports = router;