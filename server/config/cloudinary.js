// 📁 server/utils/cloudinaryUpload.js
const cloudinary = require("../config/cloudinary");
const path = require("path");
const fs = require("fs");

// Upload image to Cloudinary
const uploadToCloudinary = async (filePath, folder = "inkwear_uploads") => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder,
      resource_type: "auto",
    });

    // Remove local file after upload
    fs.unlinkSync(filePath);

    return {
      url: result.secure_url,
      public_id: result.public_id,
    };
  } catch (error) {
    console.error("Cloudinary Upload Error:", error);
    throw new Error("Image upload failed");
  }
};

module.exports = uploadToCloudinary;
