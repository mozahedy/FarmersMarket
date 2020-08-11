const { Farmer } = require('../models/farmer');
const jwt = require('jsonwebtoken');
const { private_key } = require('../config/config.json');
const { addProducts } = require('../controllers/farmerController');
let tokenString;

class farmerService {
    constructor() { }


//Start Farmer registration service 
    async registerFarmer(newFarmer) {
        
        try {          
            let farmer = new Farmer(newFarmer);
            let lastResult = await farmer.save();

                 return { data: lastResult };
            }
         catch (e) { 
            return { error: e};
         } 
    }




// Start of signin service
    async farmerSignIn(email) {       
        try {           
            let user = await Farmer.findOne({ email: email });      
            if (!user) {
                return {error: 'Farmer not found'}
            }
            if (user) {
                tokenString = jwt.sign({ email: email }, private_key, {
                expiresIn: '2h',
                  });
                return {account:user, token: tokenString};
            }
        } catch (e) { return ({ error: e }) }


        
    }
//end of signin service


//Start of Fetch Farmers in farmers list service
async fetchFarmers(){
    try{
     let fetch= await Farmer.find().sort({rating:-1});
       if(fetch){
           return {data:fetch};
       }
    }catch(e) { return e}
 }




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

//End of addProduct service 


//Start of Fetch products in farmers product list 
    async fetchProducts(farmerId){
       try{
        let fetch= await Farmer.findOne({
            _id: farmerId,
          });

          if(fetch){
              return {data:fetch}
          }
       }catch(e) { return e}
    }


//Start of deleting products in farmers product list service
    async deleteProducts(farmerId,productId){
       try{
        
        let deleteproducts = await Farmer.update({
            _id: farmerId},
            {$pull: { provided_products: 
               {_id:productId } }},
                {multi: true});

            if(deleteproducts){
                return {data:deleteproducts}
            }
         }catch(e) { return e}

       }catch(e) { return e}
    
//start of updating products from farmers product list service 
   async updateProducts(farmerId,productId,name,category,unit,unit_price,inventory,image)
   {
       console.log(farmerId,productId)
      try{
            let updateProduct = await Farmer.findOneAndUpdate({
                _id:farmerId,
             provided_products : { $elemMatch : { _id :productId}}},
            {  $set: {
                "provided_products.$.name": name,
                "provided_products.$.category": category,
                "provided_products.$.unit": unit,
                "provided_products.$.unit_price": unit_price,
                "provided_products.$.inventory": inventory,
                "provided_products.$.image": image,
              },}
            );
            if(updateProduct){
                return {data:updateProduct}
            }
      }catch(e) { return e}

   }

}
module.exports = new farmerService();
