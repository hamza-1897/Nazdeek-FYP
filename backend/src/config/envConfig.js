const dotenv = require('dotenv');
dotenv.config();

const config  = {
    PORT: process.env.PORT,
    DB_URI: process.env.DB_URL,
    JWT_SECRET: process.env.JWT_SECRET,
    Email_User : process.env.Email_User,
    Email_Pass : process.env.Email_Pass,
    Cloudinary_Cloud_Name : process.env.Cloudinary_Cloud_Name,
    Cloudinary_API_Key : process.env.Cloudinary_API_Key,
    Cloudinary_API_Secret : process.env.Cloudinary_API_Secret
}

module.exports = config;