const customerService = require('../services/customerService');
const { response } = require('express');
var createError = require('http-errors');

/* passes along the necessary information to the service to create a customer*/
module.exports.addCustomer = async function (req, res, next) {
  if (!req.body) {
    return next(new Error('No Customer found in the Request body to Save '));
  }
  const customer = req.body;
  try {
    const response = await customerService.saveCustomer(customer);
    if (response.data) {
      res.status(200).json(response);
    }
    if (response.error) {
      return next(response.error);
    }
  } catch (e) {
    return next(e);
  }
};

/* extracts credentials from request and passes it to service layer for authentication */
module.exports.signIn = async function (req, res, next) {
  const email = req.body.email;
  const password = req.body.password;
  try {
    const response = await customerService.getCustomer(email, password);
    if (!response) {
      return next(createError(401,'Authorization Failed'));
    }
    else {
      const token = response.token;
      const account = response.account;
      res
        .status(200)
        .json({ message: 'Authenticated', account: account, token: token });
    }
  } catch (e) {
    return next(e);
  }
};

/* passes along information of items in the shopping cart to be persisted in the DB */
module.exports.addToCart = async function(req, res,next){
    const item = req.body;
    const customerId = req.params.id;
    try{
        const response = await customerService.addToCart(customerId, item);
        if(!response){
            return next(response);
        }else{
            res.status(200).json({data: 'Item successfully saved to cart'});
        }
    }catch(e){
        return next(e);
    }
}

/* passes along information of items to be removed from the shopping cart */
module.exports.removeFromCart = async function(req,res,next){
    const item = req.body;
    const customerId = req.params.id;

    try{
        const response = await customerService.removeFromCart(customerId,item);
        if(!response){
            return next(response);
        }else{
            res.status(200).json({data: 'Item successfully removed from cart'});
        }
    }catch(e){
        return next(e);
    }
}

/* gets a list of items stored in a cart */
module.exports.getCartItems = async function(req,res,next){
    const customerId = req.params.id;
    try {
        const response = await customerService.getCartItems(customerId);
        if (response.cart) {
          res
            .status(200)
            .json({cart: response.cart});
        }
        if (response.error) {
            
          return next(response.error);
        }
      } catch (e) {
        return next(e);
      }
}