const express = require('express');
const router = express.Router();
const farmerController = require('../controllers/farmerController');
const { Farmer } = require('../models/farmer');
const { Customer } = require('../models/customer');
const { Order } = require('../models/order');

router.post('/signup',farmerController.farmerRegistration);


//router for the farmer to be signed in 
router.post('/signin',farmerController.farmerSignIn);
 
//router for adding new Products 
router.post('/:id/addproduct',farmerController.addProducts);

//router to fetch products from farmer product list 
router.get('/:id/fetch',farmerController.getProducts);

//router to fetch products from farmer product list 
router.patch('/:id/delete',farmerController.deleteProducts);

//router to update products from farmer product list
router.patch('/:id/update', farmerController.updateProducts);


module.exports = router;