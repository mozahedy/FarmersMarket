const { Farmer } = require('../models/farmer');
const { Customer } = require('../models/customer');
const { Order } = require('../models/order');
const bcrypt = require('bcrypt');

class CustomerService {
  constructor() {}
  async saveCustomer(cust) {
    try {
      let customer = new Customer(cust);
      customer = await customer.save();
      return { data: customer };
    } catch (e) {
      return { error: e };
    }
  }
  async getCustomer(email, password) {
    let account;

    return await Customer.findOne({ email: email })
      .then((acc) => {
        if (!acc) {
          return { error: 'Authentication Failed' };
        }
        account = acc;
        console.log(account);
        return { data: bcrypt.compare(password, account.password) };
      })
      .catch((err) => {
        return { error: err };
      });
  }
  getCustomers() {}
  updateCustomer() {}
  deleteCustomer() {}
  getOrderHistory() {}
  rateFarmer() {}
}

module.exports = new CustomerService();
