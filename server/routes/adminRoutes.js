// 📁 server/routes/adminRoutes.js
const express = require("express");
const router = express.Router();

// ==============================
// Import Controllers
// ==============================
const {
  getUsers,
  updateUserRole,
  getOrders,
  updateOrderStatus,
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getDesigns,
} = require("../controllers/adminController");

// ==============================
// Import Middlewares
// ==============================
const { protect } = require("../middlewares/authMiddleware");
const { admin } = require("../middlewares/adminMiddleware");

// ==============================
// User Management
// ==============================
router.get("/users", protect, admin, getUsers);
router.put("/users/:id/role", protect, admin, updateUserRole);

// ==============================
// Order Management
// ==============================
router.get("/orders", protect, admin, getOrders);
router.put("/orders/:id/status", protect, admin, updateOrderStatus);

// ==============================
// Product Management
// ==============================
router.get("/products", protect, admin, getProducts);
router.post("/products", protect, admin, createProduct);
router.put("/products/:id", protect, admin, updateProduct);
router.delete("/products/:id", protect, admin, deleteProduct);

// ==============================
// Design Management
// ==============================
router.get("/designs", protect, admin, getDesigns);

module.exports = router;
