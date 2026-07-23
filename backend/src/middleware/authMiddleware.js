const jwt = require('jsonwebtoken');
const config = require('../config/envConfig');
const {generateNewAccessToken} = require('../lib/generateToken');


const authMiddleware = async (req,res,next) => {

    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith("Bearer ")){
        return res.status(401).json({message : "no token provided"})
    } else {
        const token = authHeader.split(" ")[1];
        try {
            const decoded = jwt.verify(token, config.JWT_SECRET);
            req.user = {userId: decoded.userId, role: decoded.role};
            next();
        } catch (error) {
            return res.status(401).json({message : "invalid token"})
        }
    }

}

const checkRole = (roles) => {
    return (req,res,next) => {
        if(roles.includes(req.user.role)){
            next();
        } else {
            return res.status(403).json({message : "insufficient permissions"})
        }
    }
}




const refreshTokenMiddleware = async (req,res,next) => {

    const refreshToken = req.cookies.jwt;
    if(!refreshToken){
        return res.status(401).json({message : "no refresh token provided"})
    } else {
        try {
            const decoded = jwt.verify(refreshToken, config.JWT_SECRET);
            const userId = decoded.userId;
            const newAccessToken = generateNewAccessToken(userId);
            req.accessToken = newAccessToken;
            next();
        } catch (error) {
            return res.status(401).json({message : "invalid refresh token"})
        }
    }

}

module.exports = { authMiddleware, checkRole, refreshTokenMiddleware };