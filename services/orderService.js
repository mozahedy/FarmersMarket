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

//this function is used when searching for all orders of a farmer 
//sorted in assending order by status
module.exports.findAllOrdersOfFarmer = async (id,status) => {
    console.log(id)
    try{
    const result = await Order.aggregate([
        {$match: {$and: [
            {farmer_id: id},{status: status}
        ]}}
    ]);
    return {data: result};
    }catch(e){
        return {error: e}
    } 
}