const farmerService = require('../services/farmerServices');
const farmerMOdel = require ('../models/farmer');
const upload = require('../services/uploadImage');
const getImage = require('../services/readImage');


//This Module is to upload image to AWS S3
module.exports.uploadImage = async(req,res,next) => {
            
            // Uploading file to AWS S3 server
            const productImage = upload.single('image'); 
             productImage(req, res, async function(err) {
             if (err) 
                return res.status(422).send({errors: [{title: 'File Upload Error', detail: err.message}] });
            let imageName = req.file.location.split('/');
            const imgFullSignedUrl = getImage(imageName[3]);
            res.json({"status":"ok", "image": imgFullSignedUrl});
                       
        });
}


        