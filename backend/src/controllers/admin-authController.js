const adminModel = require('../models/adminModel')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/envConfig');
const {generateToken, generateNewAccessToken} = require('../lib/generateToken');
const checkPassword = require('../lib/checkPass');



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
    res.status(400).json({message : "invalid credentials"})
} else {

        const accessToken = generateToken(admin._id, res);
        res.status(200).json({_id: admin._id, name: admin.name, lastLogin: admin.lastLogin, message : "admin logged in successfully", accessToken})
    }

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


module.exports = {
    adminLogin ,
    registerAdmin ,
    refreshAccessToken  
}