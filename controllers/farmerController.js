const farmerService = require('../services/farmerServices');
const { farmerMOdel } = require('../models/farmer');
const upload = require('../services/uploadImage');
const getImage = require('../services/readImage');
var createError = require('http-errors');
// const { catch } = require('../services/farmerServices');

//Farmer Registration Controller 
module.exports.farmerRegistration = async (req, res, next) => {
  const farmer = req.body;
  if(!farmer){
     return next(new Error('No Farmer is found on the body'));
  }
  try {

    const addFarmerResult = await farmerService.registerFarmer(farmer)

    if (addFarmerResult.data) {
      
      res.status(200).json(addFarmerResult);
    } if (addFarmerResult.error) {
      return next(addFarmerResult.error);
    }
  } catch (e) { 
    return next(e) }
}



// Thid Module is to sign in the farmer into his account
module.exports.farmerSignIn = async (req, res, next) => {

  const { email, password } = req.body;

  try {
    const result = await farmerService.farmerSignIn(email)

    if (result.account) {
      res
      .status(200)
      .json({ status: "ok", account: result.account, token: result.token });
    } else {
      next(createError(401, "Authorization Failed"));
    }
  } catch (e) { return next(e) }

}



//Get Farmers from Farmers List
module.exports.getFarmers = async (req, res, next) => {
  try {
    const result = await farmerService.fetchFarmers();
    if (result.data) {
      result.status = 200;
      result.msg = "List of Farmers";

      res.status(200).json(result);
    }
  } catch (e) { res.status(400).json({ error: "NO Farmer Records" }) }
}






//This Module is to Add Products into Farmers Product List 
module.exports.addProducts = async(req,res,next) => {
           const body =req.body;
           const farmerId = req.params.id;
  
           try{
                const result= await farmerService.addProducts(farmerId,body);
                if(result){
                    result.satus=200;
                    res.status(200).json({status: "ok",
                    messege: "Product is Succesfully added",
                    name: result});
                    }
                   }catch(e){ }

}
//End of Add Products into Farmers list Controller 


//Get Products from Farmers product List 
module.exports.getProducts = async (req, res, next) => {
  const farmerId = req.params.id;
  try {
    const result = await farmerService.fetchProducts(farmerId);
    if (result) {
      result.satus = 200;
      res.status(200).json({
        status: "ok",
        messege: "List of ProductsS",
        name: result.data.provided_products
      });
    }
  } catch (e) { res.status(400).json({ error: "Error in getting projects", details: e }) }
}



//Delete products from farmers product list 
module.exports.deleteProducts = async(req,res,next) => {
      const farmerId=req.params.id;
      const productId=req.body._id;
      
      try{
        const result= await farmerService.deleteProducts(farmerId,productId);
        if(result){
            result.satus=200;
      res.status(200).json({status: "ok",
      messege: "Product Deleted",
      });
    }
  } catch (e) { res.status(400).json({ error: "Error in getting projects", details: e }) }
}


//Update products from farmer product list 
module.exports.updateProducts = async (req, res, next) => {
  const farmerId = req.params.id;
  const { _id, name, category, unit, unit_price, inventory, image } = req.body;
  try {
    const result = await farmerService.updateProducts(farmerId, _id, name, category, unit, unit_price, inventory, image)
    if (result) {
      result.satus = 200;
      res.status(200).json({
        status: "ok",
        messege: "Product Updated",
        body: result,
      });
    }
  } catch (e) { return e }
}
