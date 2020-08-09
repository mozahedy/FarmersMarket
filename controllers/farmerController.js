const farmerService = require('../services/farmerServices');
const farmerMOdel = require ('../models/farmer');
const upload = require('../services/uploadImage');
const getImage = require('../services/readImage');

//Farmer Registration Controller 
module.exports.farmerRegistration = async(req, res , next) => {
    const farmer=req.body;

    try {
          const addFaremerResult = await farmerService.registerFarmer(farmer)
         
          if(addFaremerResult.data) {
            addFaremerResult.satus=200;
            res.status(200).json(addFaremerResult);
          }else{
              next(addFaremerResult.error);
          }
    }  catch (e) { }
}



// Thid Module is to sign in the farmer into his account
module.exports.farmerSignIn = async(req,res,next) => {

         const{email,password} = req.body;
        
         try {
            const result = await farmerService.farmerSignIn(email,password)
              
            if(result.data) {
              result.satus=200;
              res.status(200).json({status: "ok",
              messege: "signed in",
              name: result.data.name.firstname,});
            }else{
                next(result.error);
            }
      }  catch (e) { }

}



//This Module is to Add Products into Farmers Product List 
module.exports.addProducts = async(req,res,next) => {
           const body =req.body;


            // Uploading file to AWS S3 server
             const productImage = upload.single('image');
             productImage(req, res, async function(err) {
              if (err) 
                return res.status(422).send({errors: [{title: 'File Upload Error', detail: err.message}] });
              let imageName = req.file.location.split('/');
               body.image = getImage(imageName[3]);
               
               const farmerId = req.params.id;
               try{
                    const result= await farmerService.addProducts(farmerId,body);
                    console.log(result)
                    if(result){
                        result.satus=200;
                        res.status(200).json({status: "ok",
                        messege: "Product is Succesfully added",
                        name: result});
                        }
                       }catch(e){ }
                       
                    }); 

}
//End of Add Products into Farmers list Controller 


//Get Products from Farmers product List 
module.exports.getProducts= async (req,res,next) => {
         const farmerId = req.params.id;
        try{
            const result= await farmerService.fetchProducts(farmerId);
            if(result){
                result.satus=200;
          res.status(200).json({status: "ok",
          messege: "List of ProductsS",
          name: result.data.provided_products});
            }
        }catch(e){ res.status(400).json({error:"Error in getting projects", details: e}) }  
}

//Delete products from farmers product list 
module.exports.deleteProducts = async(req,res,next) => {
      const farmerId=req.params.id;
      const productId="5f2f6ea3df3ae64f34525037";
      try{
        const result= await farmerService.deleteProducts(farmerId,productId);
        if(result){
            result.satus=200;
      res.status(200).json({status: "ok",
      messege: "Product Deleted",
      });
        }
    }catch(e){ res.status(400).json({error:"Error in getting projects", details: e}) } 
}
        