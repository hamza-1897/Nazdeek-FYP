const sendEmail = require('../lib/sendEmail');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const config = require('../config/envConfig');
const otpModel = require('../models/otpModel');
const bcrypt = require('bcryptjs');



const signUpOTP = async (req, res) => {

    const {name, email , password  } = req.body;
    
    const otp = crypto.randomInt(100000, 999999).toString();
    console.log(`Generated OTP for ${email}: ${otp}`);



    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password,salt)
    const otpEntry = new otpModel({
        name,
        email,
        password: hashPassword,
        otp
    });
    await otpEntry.save();

   try {
        await sendEmail({
            email: email,
            subject: 'Nazdeek App - OTP Verification',
            message: `Hello ${name}, Your verification code is: ${otp}. This code will expire in 2 minutes.`
        });

        
        res.status(200).json({ message: "Email sent successfully!" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Email sending failed" });
    }

};

module.exports = signUpOTP;