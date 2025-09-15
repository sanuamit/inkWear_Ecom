// server/routes/paymentRoutes.js
const express = require("express");
const router = express.Router();
const { createPaymentIntent } = require("../controllers/paymentController");
const { protect } = require("../middlewares/authMiddleware");

// Payment intent route
router.post("/create-payment-intent", protect, createPaymentIntent);

module.exports = router;
