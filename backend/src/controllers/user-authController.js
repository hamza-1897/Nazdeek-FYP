const userModel = require('../models/usersModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/envConfig');
const {generateToken, generateNewAccessToken} = require('../lib/generateToken');
const checkPassword = require('../lib/checkPass');


const registerUser = async (req,res) => {
    const {name , email , password} = req.body;
    const user = await userModel.findOne({email})

    if(user){
        res.status(400).json({message : "user already exists"})
    } else {

          const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password,salt)


        const newUser = new userModel({name , email , password: hashPassword});
        await newUser.save();
        res.status(201).json({message : "user registered successfully"})
    }

}


const userLogin = async (req,res) => {

const {email , password} = req.body;
const user = await userModel.findOne({email})

if(!user || !(await checkPassword(password, user.password))){
    res.status(400).json({message : "invalid credentials"})
} else {
        const accessToken = generateToken(user._id, user.role, res);
        res.status(200).json({_id: user._id, name: user.name, lastLogin: user.lastLogin, message : "user logged in successfully", accessToken})
    }
}

const userLogout = async (req,res) => {
    res.clearCookie('jwt', { httpOnly: true, secure: false, sameSite: 'strict',path: "/" });
    res.status(200).json({message : "user logged out successfully"})
}

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

module.exports = {registerUser, userLogin, userLogout, refreshAccessToken};