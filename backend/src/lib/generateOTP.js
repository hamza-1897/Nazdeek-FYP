const sendEmail = require('../lib/sendEmail');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const config = require('../config/envConfig');



const requestOTP = async (req, res) => {
    const { email } = req.body;
    
    const otp = crypto.randomInt(100000, 999999).toString();
    console.log(`Generated OTP for ${email}: ${otp}`);


    try {
        await sendEmail({
            email: email,
            subject: 'Nazdeek App - OTP Verification',
            message: `Your verification code is: ${otp}. This code will expire in 3 minutes.`
        });

        
        res.status(200).json({ message: "Email sent successfully!" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Email send nahi ho saka" });
    }
};