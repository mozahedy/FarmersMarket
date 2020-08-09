const orderService = require('../services/orderService')

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
        }else if (persistResult.error) {
            next(persistResult.error);
        }else {
            res.status(204);

        }
        
    } catch (e) { next(e)}

}