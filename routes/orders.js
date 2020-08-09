const orderController = require('../controllers/orderController')

const express = require('express');
const router = express.Router();

//this route will be accessed by farmer to get all order history of specific 
//status
router.get('/:status/:farmerId',orderController.getAllOrdersOfFarmer);

//this route will be accessed at the time of checkout
router.post('/',orderController.save);

module.exports = router;