const jwt = require('jsonwebtoken');
const config = require('../config/envConfig');
const { generateToken, generateNewAccessToken } = require('../lib/generateToken');

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "no token provided" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, config.JWT_SECRET);
    req.user = { userId: decoded.userId, role: decoded.role };
    next();
  } catch (error) {
    return res.status(401).json({ message: "jwt expired", isExpired: true });
  }
};

const checkRole = (roles) => {
  return (req, res, next) => {
    if (roles.includes(req.user.role)) {
      next();
    } else {
      return res.status(403).json({ message: "insufficient permissions" });
    }
  };
};

const refreshAccessTokenController = async (req, res) => {
  try {
    const refreshToken = 
      req.cookies?.jwt || 
      req.body?.refreshToken || 
      req.headers['x-refresh-token'];

    if (!refreshToken) {
      return res.status(401).json({ message: "No refresh token provided" });
    }

    const decoded = jwt.verify(refreshToken, config.JWT_SECRET);

    const newAccessToken = generateNewAccessToken(decoded.userId, decoded.role);
    const newRefreshToken = jwt.sign(
      { userId: decoded.userId, role: decoded.role }, 
      config.JWT_SECRET, 
      { expiresIn: '7d' }
    );

    return res.status(200).json({
      success: true,
      accessToken: newAccessToken,
      refreshToken: newRefreshToken 
    });
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired refresh token" });
  }
};

module.exports = { authMiddleware, checkRole, refreshAccessTokenController };