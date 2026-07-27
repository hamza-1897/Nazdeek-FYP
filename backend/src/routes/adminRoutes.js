const express = require('express');
const router = express.Router();




// user routes
const {getAllUsers} = require('../controllers/admin/admin-providerController');
router.get('/getallusers', getAllUsers);


// provider routes
const {getAllProviders ,getProviderById, updateProvider, getAllReports, getProviderDetails ,resolveReport, deleteReport } = require('../controllers/admin/admin-providerController');
router.get('/getAllProviders', getAllProviders);
router.get('/getProviderById/:id', getProviderById);
router.put('/updateProvider/:id', updateProvider);
router.get('/getProviderDetails/:id', getProviderDetails);

// report routes
router.get('/getAllReports', getAllReports);
router.put('/resolveReport/:id', resolveReport);
router.delete('/deleteReport/:id', deleteReport);

// setting routes
const { getSystemSettings, updatePaymentAccounts, updateFeeConfig, updateContactDetails } = require('../controllers/admin/settingController');
router.get('/getSystemSettings', getSystemSettings);
router.put('/updatePaymentAccounts', updatePaymentAccounts);
router.put('/updateFeeConfig', updateFeeConfig);
router.put('/updateContactDetails', updateContactDetails);

// category
const {getCategories , addCategory}  = require('../controllers/mutual/categoryController')
router.get('/getAllCategory',getCategories);
router.post('/addCategory',addCategory)

module.exports = router;