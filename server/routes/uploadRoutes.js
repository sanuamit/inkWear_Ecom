// server/routes/uploadRoutes.js
const express = require("express");
const multer = require("multer");
const { uploadImage, deleteImage } = require("../controllers/uploadController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

// Multer setup (stores temporarily before Cloudinary)
const storage = multer.diskStorage({});
const upload = multer({ storage });

// Upload image
router.post("/", protect, upload.single("image"), uploadImage);

// Delete image
router.delete("/", protect, deleteImage);

module.exports = router;
