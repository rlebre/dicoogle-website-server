
const { logger } = require('express-winston');
const nodemailer = require('nodemailer');
const { models: DB } = require('../sequelize');


const admins = process.env.ADMIN_EMAILS.split(' ');
const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    tls: true,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PW
    }
});

exports.forwardContact = async function (req, res) {
    const {
        name,
        email,
        subject,
        message,
    } = req.body;


    if (!name || !email || !message) {
        return res.status(400).json({
            status: 'error',
            message: 'Missing parameters.'
        });
    }

    if (!admins || admins.length === 0) {
        return res.json({
            status: 'error',
            message: 'No emails to forward the message.'
        });
    }

    const html = `
        <p>Dear Administrator,</p>
        ${name} sent you a message:<br />
        Sender: ${name} <br />
        Email: ${email} <br />
        Subject: ${subject} <br />
        Message:  <br /> ${message.replace('\n', '<br />')} <br />
    `;

    try {
        let info = await transporter.sendMail({
            from: `Dicoogle <${process.env.MAIL_USER}>`, // sender address
            to: admins,
            replyTo: email,
            subject: `[Contact] ${subject || 'No subject'}`,
            html
        });

        res.json({ status: 'success', mail: info });
    } catch (e) {
        res.status(400).json({ status: 'error', message: 'Error sending e-mail.' });
    } finally {
        try {
            await DB.contact_request.create({ name, email, subject, message });
        } catch (e) {
            logger.error(e);
        }
    }
};