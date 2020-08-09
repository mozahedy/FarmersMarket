const { Farmer } = require('../models/farmer');
const { addProducts } = require('../controllers/farmerController');

class farmerService {
    constructor() { }

    async registerFarmer(newFarmer) {
        try {
            let newfarmer = new Farmer(newFarmer);
            result = await newfarmer.save();

            return ({ data: result });
        } catch (e) { return ({ error: e }) }
    }
// Start of signin service
    async farmerSignIn(email, password) {
        try {           
            let user = await Farmer.findOne({ email: email });
    
            if (!user) {
                return {error: 'Farmer not found'}
            }

            if (user) {
                return {data:user}
            }

        } catch (e) { return ({ error: e }) }
    }
//end of signin service



//start of addProdct service for the farmer 
    async addProducts(farmerId,prod){
    try {
            
     
     let product = await Farmer.updateOne(
        { _id: farmerId },
        {$addToSet:{"provided_products":prod}},
        function (err, data) {
            if (err) {
              return { error: err };
            } else {
                return {data: data};
            }
          }
        );  
          
     if (product) {
        return {data:product}
    }
    }catch(e) { return e}
    }
}


module.exports = new farmerService();
