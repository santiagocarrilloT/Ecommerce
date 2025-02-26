const cloudinary = require("cloudinary").v2;
const multer = require("multer");

cloudinary.config({
  cloud_name: "dnhnvlyfr",
  api_key: "698274396535871",
  api_secret: "eihtbm6WRcpBrP24MjSclOXzIkE",
});

const storage = new multer.memoryStorage();

async function imageUploadUtil(file) {
  const result = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
  });

  return result;
}

const upload = multer({ storage });
module.exports = { upload, imageUploadUtil };
