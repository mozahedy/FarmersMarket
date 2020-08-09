const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');
const password = require('../middlewares/password');
const {authRequest} = require('../middlewares/authRequest');

/* create a customer */
router.post('/signup', password.encrypt, customerController.addCustomer);
router.post('/signin', customerController.signIn);
router.patch('/:id/addtocart', authRequest, customerController.addToCart);
router.patch('/:id/removefromcart', authRequest, customerController.removeFromCart);
router.patch('/:id/getcart', authRequest, customerController.getCartItems);

module.exports = router;
