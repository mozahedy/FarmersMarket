const express = require('express');
const router = express.Router();
const { Farmer } = require('../models/farmer');
const { Customer } = require('../models/customer');
const { Order } = require('../models/order');

router.post('/', async (req, res)=>{
    /*
    const { error } = validate(req.body);
    if(error)
        return res.status(400).send(error.details[0].message);
    
    let user = await User.findOne({email : req.body.email});
    if(user)
        return res.status(400).status('User already registered.');
    */
     farmerObj = {
        name:{firstname: "farmerJohn",lastname:"doe"},
        email:"test@gmail.com",
        phone:"1234567890",
        password:"123",
        address:{street: "1000 4th",city: "Fairfield",state: "IA", zip: 52557},
        provided_products:  [{name:"tomato", category:"Vegetable",unit: "kg", unit_price:2.14, inventory:19, image:"some iamge"}]        
     };

     customerObj = {
        name:{firstname: "farmerJohn",lastname:"doe"},
        email:"test@gmail.com",
        phone:"1234567890",
        password:"123",
        address:{street: "1000 4th",city: "Fairfield",state: "IA", zip: 52557},
        shopping_cart:[
            {product: {
                product_name: "banana",
                unit: "kg",
                unit_price: 3
            },
        quantity: 2
        }
        ]
     };

     orderObj = {
       customer_id: "1231231231",
       farmer_id: "234234324",
       order_date: Date.now(),
       total_price: 200, 
        products:[{
                product_name: "potato",
                unit:"kg",
                unit_price: 12,

            }]
     };
     let farmer = new Farmer(farmerObj);
     let customer = new Customer(customerObj);
     let order = new Order(orderObj);

    farmer = await farmer.save();
    customer = await customer.save();
    order = await order.save();

    res.json(farmer); 

});

module.exports = router;