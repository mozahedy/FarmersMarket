const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');
const password = require('../middlewares/password')

/* create a customer */
router.post('/signup',password.encrypt,customerController.addCustomer);
router.post('/signin', customerController.signIn);









module.exports = router;