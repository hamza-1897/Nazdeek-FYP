const nodemailer = require('nodemailer');
const config = require('../config/envConfig');

const sendEmail = async (options) => {
    
    const transporter = nodemailer.createTransport({
        host: 'smtp-relay.brevo.com',
        port: 587,
        secure: false, 
        auth: {
            user: process.env.BREVO_USER, 
            pass: process.env.BREVO_PASS, 
        },
    });

   
    const mailOptions = {
        from: `Nazdeek App <${config.Email_User}>`,
        to: options.email,
        subject: options.subject,
        text: options.message,
        
    };

   
    await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;