const Joi = require('joi');
const mongoose = require('mongoose');
const { required } = require('joi');

const Order = mongoose.model('Order', new mongoose.Schema({
        customer_id: {    //this will hold the customer email for future reference purpose
            type: String,
            required: true,
        },
        farmer_id: {
            type: String,
            required: true,
        },
        order_date: {
            type: Date,
            default: Date.now,
            required: true,
        },
        status: {
            type: String,
            required: true,
            default: 'pending'
        },
        total_price: {
            type: Number,
            required: true
        },
        products: [
            {
                product_name: {
                    type: String,
                    required: true
                },
                unit:{
                    type: String,
                    required: true
                },
                unit_price: {
                    type: Number,
                    required: true
                }
            }
        ],
        pickup_date_time: {
            type: Date
        }
}));

/* 
function validateOrder(order) {
   const schema = Joi.object({
        username: Joi.string()
            .alphanum()
            .min(3)
            .max(30)
            .required(),
    
        password: Joi.string()
            .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
            .required(),
    
        repeat_password: Joi.ref('password'),
    
        birth_year: Joi.number()
            .integer()
            .min(1900)
            .max(2013),
    
        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    })
        .with('username', 'birth_year')
        .with('password', 'repeat_password');
    
    return schema.validate(user);
}
 */
exports.Order = Order; 
//exports.validate = validateCustomer;