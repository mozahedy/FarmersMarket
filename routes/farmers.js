const express = require('express');
const router = express.Router();
const farmerController = require('../controllers/farmerController');
const { Farmer } = require('../models/farmer');
const { Customer } = require('../models/customer');
const { Order } = require('../models/order');

router.post('/signup',farmerController.farmerRegistration);
 

module.exports = router;