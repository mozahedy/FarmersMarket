const jwt = require('jsonwebtoken');
const { private_key } = require('../config/config.json');

module.exports.authRequest = (req,res,next)=>{
    try{
        const token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, private_key);
        next();
    }catch(err){
       next({message:"Authentication Failed", details: err});
    }
}