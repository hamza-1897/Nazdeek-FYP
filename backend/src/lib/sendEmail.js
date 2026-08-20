const nodemailer = require('nodemailer');
const config = require('../config/envConfig');

const sendEmail = async (options) => {
    const emailUser = config.Email_User || config.EMAIL_USER || process.env.EMAIL_USER;
    const emailPass = config.Email_Pass || config.EMAIL_PASS || process.env.EMAIL_PASS;

    if (!emailUser || !emailPass) {
        throw new Error("Email credentials missing in environment variables!");
    }

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: emailUser,
            pass: emailPass,
        },
        tls: {
            rejectUnauthorized: false 
        }
    });

    const mailOptions = {
        from: `Nazdeek App <${emailUser}>`,
        to: options.email,
        subject: options.subject,
        text: options.message,
    };

    await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;