const adminModel = require('../../models/adminModel')
const otpModel = require('../../models/otpModel')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../../config/envConfig');
const {generateToken, generateNewAccessToken} = require('../../lib/generateToken');
const checkPassword = require('../../lib/checkPass');
const {forgotPasswordOTP} = require('../../lib/generateOTP')

const registerAdmin = async (req,res) => {
    const {name , email , password} = req.body;

    const admin = await adminModel.findOne({email})

    if(admin){
        res.status(400).json({message : "admin already exists"})
    } else {

          const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password,salt)


        const newAdmin = new adminModel({name , email , password: hashPassword});
        await newAdmin.save();
        res.status(201).json({message : "admin registered successfully"})
    }

}

const adminLogin = async (req,res) => {

const {email , password} = req.body;

const admin = await adminModel.findOne({email})

if(!admin || !(await checkPassword(password, admin.password))){
   return res.status(400).json({message : "invalid credentials"})
} else {

        const accessToken = generateToken(admin._id, admin.role, res);
        res.status(200).json({_id: admin._id, name: admin.name, lastLogin: admin.lastLogin, message : "admin logged in successfully", accessToken})
    }

}

const adminLogout = async (req,res) => {
    res.clearCookie('jwt', { httpOnly: true, secure: false, sameSite: 'strict',path: "/" });
    res.status(200).json({message : "admin logged out successfully"})
}

const refreshAccessToken = async (req,res) => {

    const refreshToken = req.cookies.jwt;
    console.log("refresh token: ", refreshToken);
    if(!refreshToken){
        return res.status(401).json({message : "no refresh token provided"})
    }
    const decoded = jwt.verify(refreshToken, config.JWT_SECRET);
    const userId = decoded.userId;
    const newAccessToken = generateNewAccessToken(userId);
    res.status(200).json({ accessToken: newAccessToken });

}


// Forgot Password - OTP Generation
const forgotOTP = async (req, res) => {

 const {email} = req.body;
    const user = await adminModel.findOne({email})

    if(!user){
        res.status(400).json({message : "user with this email does not exist"})
    } else {
       return  await forgotPasswordOTP(email, res)       
  }
}

// Password Reset - OTP Verification
const verifyForgotOTP = async (req,res) => {
    const {email , otp} = req.body;
    const otpEntry = await otpModel.findOne({email, otp});

    if(!otpEntry){
        res.status(400).json({message : "invalid OTP"})
    } else {
        await otpModel.deleteOne({email, otp});
        res.status(200).json({message : "OTP verified successfully"})
    }
}

const resetPassword = async (req,res) => {
    const {email, password} = req.body;
    const user = await adminModel.findOne({email})
    if(!user){
        res.status(400).json({message : "user with this email does not exist"})
    } else {

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password,salt)
    
        user.password = hashPassword;
        await user.save();
        res.status(200).json({message : "password reset successfully"})
    }
}



module.exports = {
    adminLogin ,
    registerAdmin ,
    refreshAccessToken  ,
    adminLogout,
    forgotOTP,
    verifyForgotOTP,
    resetPassword
}