const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
const config = require('./envConfig');

cloudinary.config({
  cloud_name: config.Cloudinary_Cloud_Name,
  api_key: config.Cloudinary_API_Key,
  api_secret: config.Cloudinary_API_Secret,
});


const chatStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'Nazdeek_Chat_Media',
    resource_type: 'auto',
    allowed_formats: [
      'jpg', 'jpeg', 'png', 'webp',   // images
      'm4a', 'mp3', 'wav', 'aac', 'caf', '3gp', 'mp4', // voice notes
    ],
  },
});

const chatUpload = multer({
  storage: chatStorage,
  limits: { fileSize: 15 * 1024 * 1024 }, 
});

module.exports = chatUpload;
