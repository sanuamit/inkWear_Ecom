// server/utils/cloudinaryUpload.js
const cloudinary = require("../config/cloudinary");

/**
 * Upload file to Cloudinary
 * @param {string} filePath - Local path to the file
 * @param {string} folder - Optional folder name in Cloudinary (default: "inkwear")
 * @returns {Promise<{ url: string, public_id: string }>}
 */
const uploadToCloudinary = async (filePath, folder = "inkwear") => {
  try {
    if (!filePath) {
      throw new Error("No file path provided for Cloudinary upload");
    }

    const result = await cloudinary.uploader.upload(filePath, {
      folder,
      resource_type: "auto", // auto-detects image, video, raw, etc.
    });

    return {
      url: result.secure_url,
      public_id: result.public_id,
    };
  } catch (error) {
    console.error("❌ Cloudinary Upload Error:", error.message || error);
    throw new Error("Failed to upload file to Cloudinary");
  }
};

/**
 * Delete file from Cloudinary by its public_id
 * @param {string} publicId - Cloudinary public ID
 * @returns {Promise<Object>}
 */
const deleteFromCloudinary = async (publicId) => {
  try {
    if (!publicId) {
      throw new Error("No public_id provided for Cloudinary deletion");
    }

    const result = await cloudinary.uploader.destroy(publicId);

    if (result.result !== "ok") {
      throw new Error("Failed to delete file from Cloudinary");
    }

    return result;
  } catch (error) {
    console.error("❌ Cloudinary Delete Error:", error.message || error);
    throw new Error("Failed to delete file from Cloudinary");
  }
};

module.exports = { uploadToCloudinary, deleteFromCloudinary };
