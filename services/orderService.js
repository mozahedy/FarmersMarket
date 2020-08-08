const {Order} = require('../models/order')

//this function persists a new order
module.exports.save = async (order) => {
    const newOrder = new Order(order);
    try{
    const result = await newOrder.save();
    return {data: result};
    }catch(e){
        return {error: e}
    } 
}