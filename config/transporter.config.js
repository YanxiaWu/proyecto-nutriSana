const nodemailer = require('nodemailer')

let transporter = nodemailer.createTransport({
    service: 'OUTLOOK',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PWD
    }
});

module.exports = transporter