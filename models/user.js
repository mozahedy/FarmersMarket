/* const Joi = require('joi');
const mongoose = require('mongoose');
const { required } = require('joi');

const User = mongoose.model('User', new mongoose.Schema({
  name: {
      firstname: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50
      },
      lastname: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50
      }
  },
  email: {
    type: String,
    required: true,
    minlength:6,
    maxlength:50,
    email: true,
    unique: true
    },
  phone: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 15
  },
  password: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 1024,
    },
    address: {
        street:{
            type: String,
            required: true
        },
        city: {
            type: String
        },
        state:{
            type: String,
            maxlength:2,
            minlength:2
        },
        zip:{
            type: Number,
            required: true,
            minlength:5
        }
    },
    role: {
        type: String,
        required: true
    },
    rating: {
        type: Number
    },
    provided_products:[{
        name: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        unit: {
            type: String,
            required: true,
        },
        unit_price: {
            type: Number,
            required: true,
        },
        inventory: {
            type: Number,
            required: true,
        },
        image: {
            type: String
        }
    }
    ],
    received_orders:[{
        order_id:{
            type: mongoose.Schema.ObjectId
        },
        customer_id: {
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
    }],
    placed_orders:[{
        order_id:{
            type: mongoose.Schema.ObjectId
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

    }],
    shopping_cart: [{
        product:{
            product_name: {
                type: String,
                required: true
            },
            unit: {
                type: String,
                required: true
            },
            unit_price: {
                type: Number,
                required: true
            },
        },
        quantity: {
            type: Number,
            required: true 
        }
        
    }],
}));

/* 
function validateCustomer(customer) {
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
exports.User = User; 
//exports.validate = validateCustomer; */