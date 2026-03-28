const adminModel = require('../models/adminModel')
const bycrypt = require('bcrypt');
const generateToken = require('../lib/generateToken');
const checkPassword = require('../lib/checkPass');



const registerAdmin = async (req,res) => {
    const {name , email , password} = req.body;

    const admin = await adminModel.findOne({email})

    if(admin){
        res.status(400).json({message : "admin already exists"})
    } else {

          const salt = await bycrypt.genSalt(10)
    const hashPassword = await bycrypt.hash(password,salt)


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

exports.modules = {
    adminLogin 
}