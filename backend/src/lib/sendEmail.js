const nodemailer = require('nodemailer');
const config = require('../config/envConfig');

const sendEmail = async (options) => {
    
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: config.Email_User,
            pass: config.Email_Pass,
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