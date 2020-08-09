const orderService = require('../services/orderService');
const emailGennerator = require('../services/emailGeneratorService');

// this middleware extracts the order sent from client side to be saved
// and returns confirmation message to client side
module.exports.save = async (req, res, next) => {
    const anOrder = req.body;
    try {
        const persistResult = await orderService.save(anOrder)

        if (persistResult.data) {
            persistResult.status = 200;
            res.status(200).json(persistResult)
        }
        if (persistResult.error) {
            next(persistResult.error);
        }
    } catch (e) { }

}

// this middleware extracts the order status and farmer id to 
// get history of all orders that are of a specified status
module.exports.getAllOrdersOfFarmer = async (req, res, next) => {

    const id = req.params.farmerId;
    const status = req.params.status;
    try {
        const findResult = await orderService.findAllOrdersOfFarmer(id, status)
        console.log(findResult)
        if (findResult.data) {
            findResult.status = 200;
            res.status(200).json(findResult)
        } else if (persistResult.error) {
            next(persistResult.error);
        } else {
            res.status(204);

        }

    } catch (e) { next(e) }

}

// this middleware extracts the order status, date range and customer id to 
// get history of all orders that satisfy the criteria
module.exports.getAllOrdersOfCustomer = async (req, res, next) => {

    const id = req.params.customerId;
    const status = req.params.status;
    const dateLower = req.body.dateLower;
    const dateUpper = req.body.dateUpper;
    console.log(id, status, dateLower, dateUpper)

    try {
        const findResult = await orderService.findAllOrdersOfCustomer(id, status, dateLower, dateUpper)

        if (findResult.data) {
            findResult.status = 200;
            res.status(200).json(findResult)
        } else if (persistResult.error) {
            next(persistResult.error);
        } else {
            res.status(204);

        }

    } catch (e) { next(e) }

}

// this middleware extracts the order sent from client side to be saved
// and returns confirmation message to client side
module.exports.updateStatus = async (req, res, next) => {
    const orderId = req.params.orderId;
    console.log(orderId);
    try {
        const persistResult = await orderService.updateStatus(orderId, req.body)

        if (persistResult.data) {
            persistResult.status = 200;
            if (req.body.status === 'ready') {
                const dateInMilli = new Date(req.body.pickupDateTime);
                const pickupDate = dateInMilli.toLocaleString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
                const pickupTime = dateInMilli.toLocaleTimeString('en-US');

                let respMsg = {status:200, data: `Dear Customer, \n\n Your order is ready! We are pleased to inform you that your order is ready for pick-up on ${pickupDate} at ${pickupTime}`};
                // respMsg = await emailGennerator('Customer', 'Your order is ready!', `We are pleased to inform you that your order is ready for pick-up on ${pickupDate} at ${pickupDate}`);
                // respMsg.status = 200;
                // respMsg.data = {};
                res.status(200).json(respMsg);
            } else if (req.body.status === 'completed') {
                res.status(200).json({ status: 200, data: 'successfully updated status to completed' });
            }
        }
        if (persistResult.error) {
            next(persistResult.error);
        }
    } catch (e) { }


}

