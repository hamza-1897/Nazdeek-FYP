const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
const config = require('./envConfig');


cloudinary.config({
  cloud_name: config.Cloudinary_Cloud_Name,
  api_key: config.Cloudinary_API_Key,
  api_secret: config.Cloudinary_API_Secret
});


const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'Nazdeek_Uploads', 
    allowed_formats: ['jpg', 'png', 'jpeg'],
  },
});

const upload = multer({ storage: storage });

module.exports = upload;