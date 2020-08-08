const customerService = require('../services/customerService');

/* create a customer*/
module.exports.addCustomer = async function (req, res, next) {
  if (!req.body) {
    return next(new Error('No Customer found in the Request body to Save '));
  }
  const customer = req.body;
  try {
    const response = await customerService.saveCustomer(customer);
    if(response.data){
        res.status(200).json(response.data);
    } if(response.error){
        return next(response.error);
    }
  } catch (e) {
      return next(e);
  }
};

/* customer signin */
module.exports.signIn = async function (req, res, next){
    const email = req.body.email;
    const password = req.body.password;
    try{
        const response = await customerService.getCustomer(email,password);        
        if(response.data){
            res.status(200).json({message:'Authenticated'});
        }  if(!response.error){
            return next(response.error);
        } 
    }catch(e){
        next(e);
    }

}
