const { Farmer } = require('../models/farmer');
const { Customer } = require('../models/customer');
const { Order } = require('../models/order');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { private_key } = require('../config/config.json');
let tokenString;

class CustomerService {
  constructor() {}
  /* persists a customer entity into the database */
  async saveCustomer(cust) {
    try {
      let customer = new Customer(cust);
      customer = await customer.save();
      return { data: customer };
    } catch (e) {
      return { error: e };
    }
  }
  /* gets a customer from the database during sign in and verifies credentials */
  async getCustomer(email, password) {
    return await Customer.findOne({ email: email })
      .then((acc) => {
        if (!acc) {
          console.log('im here');
          return false;
        }
        return {bcrypt:bcrypt.compare(password, acc.password), account:acc}
      })
      .then((data) => {
        if (!data.bcrypt) {
          console.log(data);
          console.log('im here');
          return data;
        }
        tokenString = jwt.sign({ email: email }, private_key, {
          expiresIn: '2h',
        });
        return {account:data.account, token: tokenString};
      })
      .catch((err) => {
        return { error: err };
      });
  }
  /* adds selected items into the shopping cart of the customer */
  async addToCart(userId, item) {
    return await Customer.updateOne(
      { _id: userId },
      { $addToSet: { shopping_cart: { $each: item } } },
      function (err, data) {
        if (err) {
          return err;
        } else {
          data.data = 'Updated Your Cart';
          return data;
        }
      }
    );
  }
  /* removes items from the shopping cart */
  async removeFromCart(userId, item) {
    return await Customer.updateOne(
      { _id: userId },
      { $pullAll: { shopping_cart: item } },
      function (err, data) {
        if (err) {
          return err;
        } else {
          data.data = 'Removed Items from cart';
          return data;
        }
      }
    );
  }
  /* returns items stored in shopping cart(if any) from a previous session */
  async getCartItems(userId) {
    let account;

    return await Customer.findOne({ _id: userId })
      .then((acc) => {
        if (!acc) {
          return { error: 'Account not found' };
        }
        account = acc;
        console.log(account.shopping_cart);
        return { cart: acc.shopping_cart };
      })
      .catch((err) => {
        return { error: err };
      });
  }
}

module.exports = new CustomerService();
