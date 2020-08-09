const { Farmer } = require('../models/farmer');

class farmerService {
    constructor() { }

    async registerFarmer(newFarmer) {
        try {
            let newfarmer = new Farmer(newFarmer);
            result = await newfarmer.save();

            return ({ data: result });
        } catch (e) { return ({ error: e }) }
    }

    async farmerSignIn(email, password) {
        try {
            // console.log(email,password);
            

            let user = await Farmer.findOne({ email: email });
    
            if (!user) {
                return {error: 'Farmer not found'}
            }

            if (user) {
                return {data:user}
            }

        } catch (e) { return ({ error: e }) }
    }

}

module.exports = new farmerService();