const sendEmail = require('../lib/sendEmail');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const config = require('../config/envConfig');
const otpModel = require('../models/otpModel');
const bcrypt = require('bcryptjs');



const signUpOTP = async (req, res) => {

    const { name, email   } = req.body;
    const alreadySent = await otpModel.findOne({email})
    if(alreadySent){
        return res.status(400).json({message : "OTP already sent to this email. Please check your inbox."})
    }
    
    const otp = crypto.randomInt(100000, 999999).toString();
    console.log(`Generated OTP for ${email}: ${otp}`);

    const otpEntry = new otpModel({
            name,
            email,
            otp
    });
    await otpEntry.save();

   try {
        await sendEmail({
            email: email,
            subject: 'Nazdeek App - OTP Verification',
            message: `Hello ${name}, Your SignUp verification code is: ${otp}. This code will expire in 2 minutes.`
        });

        console.log(`OTP sent to ${email} successfully.`);
      return  res.status(200).json({ message: "Email sent successfully!" });
        
    } catch (error) {
        console.log(error);
       return res.status(500).json({ message: "Email sending failed" });
        console.log(`Failed to send OTP to ${email}.`);
    }

};

const forgotPasswordOTP = async (email, res) => {
    

    const otp = crypto.randomInt(100000, 999999).toString();
    console.log(`Generated OTP for ${email}: ${otp}`);
     const otpEntry = new otpModel({
        email,
        otp
    });
    await otpEntry.save();

    try{
        await sendEmail({
            email: email,
            subject: 'Nazdeek App - OTP Verification',
            message: `Your verification code For Password Reset is: ${otp}. This code will expire in 2 minutes.`
        });

       console.log(`OTP sent to ${email} successfully.`);
      return  res.status(200).json({ message: "Reset OTP sent successfully!" });
        
    } catch (error) {
        console.log(error);
       return res.status(500).json({ message: "Email sending failed" });
        console.log(`Failed to send OTP to ${email}.`);
    }


}
     

module.exports = {
    signUpOTP,
    forgotPasswordOTP
};