const axios = require('axios');

const verifyRecaptcha = (token) => {
    return axios.post(`https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET}&response=${token}`).then(response => response.data)
}

module.exports = { verifyRecaptcha }