const rateLimit = require('express-rate-limit');

const loginLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, 
  max: 5,
  message: {
    success: false,
    message: 'To many login attempts. Please try again after 10 minutes.',
  },
  standardHeaders: true, 
  legacyHeaders: false, 
});

module.exports = { loginLimiter };