const jwt = require('jsonwebtoken');
const config = require('../config/envConfig');

const generateToken = (userId, role, res) => {
  const refreshToken = jwt.sign({ userId, role }, config.JWT_SECRET, { expiresIn: '7d' });
  const accessToken = jwt.sign({ userId, role }, config.JWT_SECRET, { expiresIn: '15m' });

  if (res && res.cookie) {
    res.cookie('jwt', refreshToken, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: 'none',
      secure: true,
      path: '/'
    });
  }

  return { accessToken, refreshToken };
};

const generateNewAccessToken = (userId, role) => {
  return jwt.sign({ userId, role }, config.JWT_SECRET, { expiresIn: '15m' });
};

module.exports = { generateToken, generateNewAccessToken };