const orderController = require('../controllers/orderController')

const express = require('express');
const router = express.Router();

//this route will be accessed at the time of checkout
router.get('/',orderController.save);

//this route will be accessed at the time of checkout
router.post('/',orderController.save);

module.exports = router;