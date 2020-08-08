const farmerService = require('../services/farmerServices');
const farmerMOdel = require ('../models/farmer');

module.exports.farmerRegistration = async(req, res , next) => {
    const farmer=req.body;

    try {
          const addFaremerResult = await farmerService.registerFarmer(farmer)
            console.log(addFaremerResult)
          if(addFaremerResult.data) {
            addFaremerResult.satus=200;
            res.status(200).json(addFaremerResult);
          }else{
              next(addFaremerResult.error);
          }
    }  catch (e) { }
}