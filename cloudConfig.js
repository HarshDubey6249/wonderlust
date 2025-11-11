require('dotenv').config(); // 🔥 load .env FIRST

const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// 🔍 Debug to verify env is loaded
console.log("Cloudinary Key:", process.env.CLOUDINARY_API_KEY ? "Loaded ✅" : "Missing ❌");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'Airbnb_Project',
    allowed_formats: ['jpg', 'png', 'jpeg']
  },
});

module.exports = {
  cloudinary,
  storage
};
