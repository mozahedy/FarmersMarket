const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const { awss3 } = require('../config/config.json');
 
aws.config.update({
    secretAccessKey: awss3.secretAccessKey,
    accessKeyId: awss3.accessKeyId,
    region: awss3.region
});
const s3 = new aws.S3();
 
// Filter all files except jpeg and png
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true)
  } else {
      cb(new Error('Invalid Mime Type, only JPEG and PNG'), false);
  }
};

const upload = multer({
  fileFilter: fileFilter,
  storage: multerS3({
    s3: s3,
    bucket: 'miu-mwa-project',
    //acl: 'public-read',
    metadata: function (req, file, cb) {
      cb(null, {fieldName: file.fieldname});
    },
    key: function (req, file, cb) {
      // get the extension for image
      const ext = file.originalname.split('.');
      cb(null, Date.now().toString()+"."+ext[1]);
    }
  })
});

module.exports = upload;