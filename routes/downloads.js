const express = require('express');
const router = express.Router();
const Download = require('../controllers/downloads');
const RecaptchaMiddleware = require('../middlewares/recaptchaMiddleware');

router.post('', RecaptchaMiddleware.verify, Download.createDownloadLink);

module.exports = router;
