const jwt = require('jsonwebtoken');
const config = require('../config/envConfig');
const { generateAccessToken, generateRefreshToken } = require('../lib/generateToken');

const JWT_SECRET = config.JWT_SECRET || process.env.JWT_SECRET;

// Access Token Verification Middleware
const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided", isExpired: false });
  }

  const token = authHeader.split(" ")[1];
  
  try {
    // Exact same secret key se verify karein
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = { userId: decoded.userId, role: decoded.role };
    next();
  } catch (error) {
    // Token Expired par isExpired: true, Signature Mismatch par isExpired: false
    const isTokenExpired = error.name === 'TokenExpiredError';
    return res.status(401).json({ 
      message: isTokenExpired ? "jwt expired" : "Invalid token", 
      isExpired: isTokenExpired 
    });
  }
};

// Role Checking Middleware
const checkRole = (roles) => {
  return (req, res, next) => {
    if (req.user && roles.includes(req.user.role)) {
      next();
    } else {
      return res.status(403).json({ message: "insufficient permissions" });
    }
  };
};

// Refresh Token Controller
const refreshAccessTokenController = async (req, res) => {
  try {
    const refreshToken = 
      req.cookies?.jwt || 
      req.body?.refreshToken || 
      req.headers['x-refresh-token'];

    if (!refreshToken) {
      return res.status(401).json({ success: false, message: "No refresh token provided", isExpired: false });
    }

    // Verify Refresh Token using same secret
    const decoded = jwt.verify(refreshToken, JWT_SECRET);

    // Generate fresh access and refresh tokens
    const newAccessToken = generateAccessToken(decoded.userId, decoded.role);
    const newRefreshToken = generateRefreshToken(decoded.userId, decoded.role);

    return res.status(200).json({
      success: true,
      accessToken: newAccessToken,
      refreshToken: newRefreshToken 
    });
  } catch (error) {
    return res.status(401).json({ 
      success: false, 
      message: "Invalid or expired refresh token",
      isExpired: true 
    });
  }
};

module.exports = { authMiddleware, checkRole, refreshAccessTokenController };