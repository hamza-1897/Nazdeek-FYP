const userModel = require('../models/usersModel');
const otpModel = require('../models/otpModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/envConfig');
const {generateToken, generateNewAccessToken} = require('../lib/generateToken');
const checkPassword = require('../lib/checkPass');
const {signUpOTP, forgotPasswordOTP} = require('../lib/generateOTP');

// User Registration 
const registerUser = async (req,res) => {
    const {email } = req.body;

    const user = await userModel.findOne({email})

    if(user){
        res.status(400).json({message : "user already exists"})
    } else {

         await signUpOTP(req, res)       
  }

}

// OTP Verification for user registration
const verifySignUPOTP = async (req,res) => {
    const {email , otp} = req.body;

    const otpEntry = await otpModel.findOne({email, otp});

    if(!otpEntry){
        res.status(400).json({message : "invalid OTP"})
    } else {
        const user = new userModel({
            name: otpEntry.name,
            email: otpEntry.email,
            password: otpEntry.password
        });
        await user.save();
        await otpModel.deleteOne({email, otp});
        res.status(200).json({message : "user registered successfully"})    
    }

    
}


// User Login
const userLogin = async (req,res) => {

const {email , password} = req.body;
const user = await userModel.findOne({email})

if(!user || !(await checkPassword(password, user.password))){
    res.status(400).json({message : "invalid credentials"})
} else {
    const isActive = user.isActive;
    if(!isActive){
        res.status(403).json({message : "user account is deactivated"})
    } else {
        const accessToken = generateToken(user._id, user.role, res);
        res.status(200).json({_id: user._id, name: user.name, lastLogin: user.lastLogin, message : "user logged in successfully", accessToken})
    }
}
}

// User Logout
const userLogout = async (req,res) => {
    res.clearCookie('jwt', { httpOnly: true, secure: false, sameSite: 'strict',path: "/" });
    res.status(200).json({message : "user logged out successfully"})
}

// Forgot Password - OTP Generation
const forgotOTP = async (req, res) => {

 const {email} = req.body;
    const user = await userModel.findOne({email})

    if(!user){
        res.status(400).json({message : "user with this email does not exist"})
    } else {
         await forgotPasswordOTP(email, res)       
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

// Password Reset - Update Password
const resetPassword = async (req,res) => {
    const {email, password} = req.body;
    const user = await userModel.findOne({email})
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


// Refresh Access Token
const refreshAccessToken = async (req,res) => {

    const refreshToken = req.cookies.jwt;
    console.log("refresh token: ", refreshToken);
    if(!refreshToken){
        return res.status(401).json({message : "no refresh token provided"})
    } else {
    const decoded = jwt.verify(refreshToken, config.JWT_SECRET);
    const userId = decoded.userId;
    const userRole = decoded.role;
    const newAccessToken = generateNewAccessToken(userId , userRole);
    res.status(200).json({accessToken: newAccessToken})
    }
}

module.exports = {registerUser,verifySignUPOTP ,userLogin, userLogout, forgotOTP,verifyForgotOTP, resetPassword,refreshAccessToken};