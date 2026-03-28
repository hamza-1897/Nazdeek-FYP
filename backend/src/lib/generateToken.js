const jwt = require('jsonwebtoken');
const config = require('../config/envConfig');

const generateToken = (userId, res) => {

    const refreshToken = jwt.sign({userId}, config.JWT_SECRET, {expiresIn:"7d"})

    const accessToken = jwt.sign({userId}, config.JWT_SECRET, {expiresIn:"15m"})

    res.cookie("jwt",refreshToken,{
        maxAge: 7*24*60*60*100,
        httpOnly:true,
        sameSite :"strict",
        secure: false
    })

        return accessToken;
} 

module.exports = generateToken;