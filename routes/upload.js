const express = require('express');
const router = express.Router();
const uploadController = require('../controllers/uploadController');
const { authRequest } = require('../middlewares/authRequest');

router.post('/', uploadController.uploadImage);

module.exports = router;