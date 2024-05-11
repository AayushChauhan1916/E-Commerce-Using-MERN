const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET 
  });
 
  const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'Project 2',
      allowed_formats: ['png', 'jpg', 'jpeg', 'gif'] // Add any other formats you want to accept
    }
  });
module.exports = storage;