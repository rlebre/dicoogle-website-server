const express = require('express');
const router = express.Router();
const Contact = require('../controllers/contacts');
const RecaptchaMiddleware = require('../middlewares/recaptchaMiddleware');

router.post('/sendEmail', RecaptchaMiddleware.verify, Contact.forwardContact);

module.exports = router;
