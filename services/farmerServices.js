const {Farmer} = require('../models/farmer');

class farmerService{
      constructor() { }

      async registerFarmer(newFarmer){
        try{
            let newfarmer = new Farmer(newFarmer);
            newfarmer = await newfarmer.save();
        
            return ({data: newfarmer});
        }catch(e){ return ({error:e})}
      }

}

module.exports = new farmerService();