const Joi = require('joi');
const mongoose = require('mongoose');
const { required } = require('joi');

const Customer = mongoose.model('Customer', new mongoose.Schema({
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
        minlength: 6,
        maxlength: 50,
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
        street: {
            type: String,
            required: true
        },
        city: {
            type: String
        },
        state: {
            type: String,
            maxlength: 2,
            minlength: 2
        },
        zip: {
            type: Number,
            required: true,
            minlength: 5
        }
    },
    /*     role: {
            type: String,
            required: true
        }, */
    shopping_cart: {
        items: [{
            product: {
                name: {
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
        farmer_id: {
            type: String,
            required: false,
            default: 'John Doe'
        }
    }
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
exports.Customer = Customer;
//exports.validate = validateCustomer;