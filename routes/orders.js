const orderController = require('../controllers/orderController')
const {authRequest} = require('../middlewares/authRequest');

const express = require('express');
const router = express.Router();

//this route will be accessed by farmer to get all order history 
router.get('/farmers/:farmerId',orderController.getAllOrdersOfFarmer);

//this route will be accessed by farmer to get all order history of specific 
//status
router.get('/:status/farmers/:farmerId',authRequest,orderController.getByStatusAllOrdersOfFarmer);

//this route will be accessed by customer to get all order history 
router.get('/customers/:customerEmail',orderController.getAllOrdersOfCustomer);

//this route will be accessed by customer to get all order history of specific 
//status in time a time range. request body will hold time range
router.post('/:status/customers/:customerEmail',orderController.getByStatusAllOrdersOfCustomer);

//this route will be accessed at the time of checkout
router.post('/',orderController.save);

//this route will be accessed by farmer to update status
//the order id will be sent as a url parameter and the status and pickup date-time
//through the body
router.patch('/:orderId',orderController.updateStatus);

module.exports = router;