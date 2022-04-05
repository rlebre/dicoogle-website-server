const { verifyRecaptcha } = require('../utils/recaptcha');

exports.verify = async (req, res, next) => {
    const { token } = req.body;

    if (!token) {
        return res.status(400).json({
            message: 'Missing parameters.'
        });
    }

    const recaptchaValid = await verifyRecaptcha(token);

    const elapsedTime = new Date().getTime() - Date.parse(recaptchaValid.challenge_ts);

    if (!recaptchaValid.success || recaptchaValid.score < 0.5 || (recaptchaValid.action !== 'contact' && recaptchaValid.action !== 'download')) {
        return res.status(401).json({
            message: 'Recaptcha verification failed.'
        });
    }

    next();
}