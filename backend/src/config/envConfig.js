const dotenv = require('dotenv');
dotenv.config();

const config  = {
    PORT: process.env.PORT,
    DB_URI: process.env.DB_URL,
    JWT_SECRET: process.env.JWT_SECRET
}

module.exports = config;