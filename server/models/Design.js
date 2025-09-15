// server/models/Design.js
const mongoose = require("mongoose");

const designSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true, // every design must belong to a user
    },
    url: {
      type: String,
      required: true, // Cloudinary secure URL
    },
    public_id: {
      type: String,
      required: true, // Cloudinary public ID (needed for deletion)
    },
    filename: {
      type: String, // Original file name (optional, useful for UI display)
    },
    width: {
      type: Number, // Cloudinary width (px)
    },
    height: {
      type: Number, // Cloudinary height (px)
    },
    format: {
      type: String, // e.g., "png", "jpg", "webp"
    },
    size: {
      type: Number, // File size in bytes (optional, from Cloudinary response)
    },
    tags: [
      {
        type: String, // Optional: allow tagging designs (e.g., "t-shirt", "hoodie")
      },
    ],
  },
  {
    timestamps: true, // adds createdAt and updatedAt fields
  }
);

module.exports = mongoose.model("Design", designSchema);
