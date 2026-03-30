const dotenv = require('dotenv');
dotenv.config();

const config  = {
    PORT: process.env.PORT,
    DB_URI: process.env.DB_URL,
    JWT_SECRET: process.env.JWT_SECRET,
    Email_User : process.env.Email_User,
    Email_Pass : process.env.Email_Pass
}

module.exports = config;