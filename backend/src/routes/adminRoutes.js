const express = require('express');
const router = express.Router();

// user routes
const {getAllUsers} = require('../controllers/admin/admin-providerController');
router.get('/getallusers', getAllUsers);

// category routes
const {addCategory,getAllCategories} = require('../controllers/admin/categoryController');
router.get('/getallcategories', getAllCategories);
router.post('/add-category', addCategory);

// provider routes
const {getAllProviders ,getProviderById, updateProvider, getAllReports, resolveReport, deleteReport } = require('../controllers/admin/admin-providerController');
router.get('/getAllProviders', getAllProviders);
router.get('/getProviderById/:id', getProviderById);
router.put('/updateProvider/:id', updateProvider);
router.get('/getAllReports', getAllReports);
router.put('/resolveReport/:id', resolveReport);
router.delete('/deleteReport/:id', deleteReport);



module.exports = router;