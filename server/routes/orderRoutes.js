// 📁 server/routes/orderRoutes.js
const express = require("express");
const router = express.Router();

const {
  createOrder,
  getUserOrders,
  getOrderById,
  updateOrderStatus,
  getAllOrders,
} = require("../controllers/orderController");

const { protect } = require("../middlewares/authMiddleware");
const { admin } = require("../middlewares/adminMiddleware");

// ==============================
// Orders Routes
// ==============================

// Create new order (user only)
router.post("/", protect, createOrder);

// Get logged-in user's orders
router.get("/my-orders", protect, getUserOrders);

// Get single order by ID
router.get("/:id", protect, getOrderById);

// Admin: Get all orders
router.get("/", protect, admin, getAllOrders);

// Admin: Update order status
router.put("/:id/status", protect, admin, updateOrderStatus);

module.exports = router;
