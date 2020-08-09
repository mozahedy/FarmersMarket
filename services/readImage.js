const AWS = require('aws-sdk');
const { awss3 } = require('../config/config.json');

function getImage(){
    const s3 = new AWS.S3()
    AWS.config.update({accessKeyId: awss3.accessKeyId, secretAccessKey: awss3.secretAccessKey})
    
    const myKey = '1596927602565.jpg';
    
    const url = s3.getSignedUrl('getObject', {
        Bucket: awss3.bucket,
        Key: myKey,
        Expires: awss3.signedUrlExpireSeconds
    });
    return url;
};

module.exports = getImage;
