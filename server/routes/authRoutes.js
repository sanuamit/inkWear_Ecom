// server/routes/authRoutes.js
const express = require("express");
const router = express.Router();

// ==============================
// Controllers
// ==============================
const {
  registerUser,
  loginUser,
  getMe,
} = require("../controllers/authController");

// ==============================
// Middlewares
// ==============================
const { protect } = require("../middlewares/authMiddleware");

// ==============================
// Routes
// ==============================

// @route   POST /api/auth/register
// @desc    Register new user
// @access  Public
router.post("/register", registerUser);

// @route   POST /api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post("/login", loginUser);

// @route   GET /api/auth/me
// @desc    Get current logged-in user
// @access  Private
router.get("/me", protect, getMe);

module.exports = router;
