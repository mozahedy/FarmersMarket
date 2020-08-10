const { Order } = require('../models/order')

//this function persists a new order
module.exports.save = async (order) => {
    const newOrder = new Order(order);
    try {
        const result = await newOrder.save();
        return { data: result };
    } catch (e) {
        return { error: e }
    }
}

//this function is used when searching for all orders of a farmer 

module.exports.findAllOrdersOfFarmer = async (id) => {

    try {
        const result = await Order.aggregate([
            {
                $match: {
                    $and: [
                        { farmer_id: id }
                    ]
                }
            }
        ]);
        return { data: result };
    } catch (e) {
        return { error: e }
    }
}

//this function is used when searching for all orders of a farmer 
//filtered by status
module.exports.findByStatusAllOrdersOfFarmer = async (id, status) => {

    try {
        const result = await Order.aggregate([
            {
                $match: {
                    $and: [
                        { farmer_id: id }, { status: status }
                    ]
                }
            }
        ]);
        return { data: result };
    } catch (e) {
        return { error: e }
    }
}

//this function is used when searching for all orders history of a customer

module.exports.findAllOrdersOfCustomer = async (email) => {

    try {
        const result = await Order.find({customer_email: email})

        return { data: result };
    } catch (e) {
        return { error: e }
    }
}

//this function is used when searching for all orders history of a customer
//filtered by status and a lower and upper boundry for order date in YYYY-MM-DD string format
module.exports.findByStatusAllOrdersOfCustomer = async (email, status, dateLower, dateUpper) => {

    try {
        const result = await Order.find({customer_email: email,  status: status, order_date: {$gte:new Date(dateLower),$lte: new Date(dateUpper)}})

        return { data: result };
    } catch (e) {
        return { error: e }
    }
}

//this function updates the status of an order
//based on it's state: ready/complete. if ready it will persist the pickupDateTime
module.exports.updateStatus = async (orderId, { status, pickupDateTime }) => {
    if (status === 'ready') {
        try {
            const result = await Order.findOneAndUpdate({ _id: orderId }, { $set: { status: status, pickup_date_time: pickupDateTime } });
            return { data: result };
        } catch (e) {
            return { error: e }
        }
    } else if (status === 'completed') {
        try {
            const result = await Order.findOneAndUpdate({ _id: orderId }, { $set: { status: status}});
            return { data: result };
        } catch (e) {
            return { error: e }
        }
    }

    
}