const express = require('express');
const router = express.Router();
const farmerController = require('../controllers/farmerController');
const password = require('../middlewares/password');
const { authRequest } = require('../middlewares/authRequest');

router.post('/signup',password.encrypt, farmerController.farmerRegistration);


//router for the farmer to be signed in 
router.post('/signin',farmerController.farmerSignIn);
 
//router for adding new Products 
router.post('/:id/addproduct' ,farmerController.addProducts);

//router to fetch products from farmer product list 
router.get('/:id/fetch',farmerController.getProducts);

//router to fetch products from farmer product list 
router.patch('/:id/delete',farmerController.deleteProducts);

//router to update products from farmer product list
router.patch('/:id/update', farmerController.updateProducts);

//router to fetch products from farmer product list 
router.patch('/:id/delete',farmerController.deleteProducts);

module.exports = router;