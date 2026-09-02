const jwt = require('jsonwebtoken');
const config = require('../config/envConfig');

const JWT_SECRET = config.JWT_SECRET || process.env.JWT_SECRET;

// Sign Access Token (15m)
const generateAccessToken = (userId, role) => {
  return jwt.sign(
    { userId, role }, 
    JWT_SECRET, 
    { expiresIn: '15m' }
  );
};

// Sign Refresh Token (7d)
const generateRefreshToken = (userId, role) => {
  return jwt.sign(
    { userId, role }, 
    JWT_SECRET, 
    { expiresIn: '7d' }
  );
};

module.exports = { generateAccessToken, generateRefreshToken };