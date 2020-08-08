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