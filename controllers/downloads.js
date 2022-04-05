
const nodemailer = require('nodemailer');
const downloadTemplate = require('../utils/downloadTemplate');
const DB = require('../sequelize');
const { randomUUID } = require('crypto');
const { logger } = require('express-winston');

const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    tls: true,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PW
    }
});

exports.createDownloadLink = async function (req, res) {
    const {
        name,
        email,
        company,
        country,
        interest,
        pluginsSourceCode,
        newsletter,
        release
    } = req.body;

    if (!name || !email || !company || !country || !release.tag_name) {
        return res.status(400).json({
            message: 'Missing parameters.'
        });
    }

    const hash = randomUUID();

    try {
        await DB.models.user.upsert({ name, email, company, country, interest, newsletter });

        const user = await DB.models.user.findOne({ where: { email } });

        await DB.models.download_request.create({ resource: release.tag_name, hash, downloadLink: release.downloadLink, pending: false, approved: true, userId: user.id });
    } catch (e) {
        logger.error(e);
    }


    try {
        let info = await transporter.sendMail({
            from: `Dicoogle Downloader <${process.env.MAIL_USER}>`,
            to: email,
            subject: `Dicoogle v${release.tag_name} download link`,
            html: downloadTemplate.buildTemplate(name, 'Dowload', `Dicoogle v${release.tag_name}`, `${process.env.APP_URL}/download/${hash}`)
        });

        return res.json({ mail: info });
    } catch (e) {
        logger.error(e);
        return res.status(400).json({ status: 'error', message: 'Error sending e-mail.' });
    }
};

exports.download = async (req, res) => {
    const { hash } = req.params;

    const downloadRequest = await DB.models.download_request.findOne({ where: { hash } });

    if (!downloadRequest) {
        return res.status(404).json({
            message: 'Download request not found.'
        });
    }

    if (!downloadRequest.approved) {
        return res.status(403).json({
            message: 'Download request not approved.'
        });
    }

    if (downloadRequest.pending) {
        return res.status(403).json({
            message: 'Download request is pending.'
        });
    }

    if (downloadRequest.downloadLink) {
        await DB.models.download_request.update({ count: downloadRequest.count + 1 }, { where: { hash } });
        return res.redirect(downloadRequest.downloadLink);
    }
}