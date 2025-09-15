// 📁 server/controllers/adminController.js
const User = require("../models/User");
const Order = require("../models/Order");
const Product = require("../models/Product");
const Design = require("../models/Design");

/**
 * @desc   Get all users (excluding password)
 * @route  GET /api/admin/users
 * @access Admin
 */
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password").sort({ createdAt: -1 });
    res.status(200).json(users);
  } catch (err) {
    console.error("❌ getUsers error:", err);
    res.status(500).json({ message: "Server error while fetching users" });
  }
};

/**
 * @desc   Update user role
 * @route  PUT /api/admin/users/:id/role
 * @access Admin
 */
exports.updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;
    if (!role) {
      return res.status(400).json({ message: "Role is required" });
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role },
      { new: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (err) {
    console.error("❌ updateUserRole error:", err);
    res.status(500).json({ message: "Server error while updating role" });
  }
};

/**
 * @desc   Get all orders
 * @route  GET /api/admin/orders
 * @access Admin
 */
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json(orders);
  } catch (err) {
    console.error("❌ getOrders error:", err);
    res.status(500).json({ message: "Server error while fetching orders" });
  }
};

/**
 * @desc   Update order status
 * @route  PUT /api/admin/orders/:id/status
 * @access Admin
 */
exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    if (!status) {
      return res.status(400).json({ message: "Status is required" });
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json(order);
  } catch (err) {
    console.error("❌ updateOrderStatus error:", err);
    res.status(500).json({ message: "Server error while updating order status" });
  }
};

/**
 * @desc   Get all products
 * @route  GET /api/admin/products
 * @access Admin
 */
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (err) {
    console.error("❌ getProducts error:", err);
    res.status(500).json({ message: "Server error while fetching products" });
  }
};

/**
 * @desc   Create a new product
 * @route  POST /api/admin/products
 * @access Admin
 */
exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, category, countInStock, image } = req.body;

    if (!name || !price || !image) {
      return res
        .status(400)
        .json({ message: "Name, price, and image are required" });
    }

    const product = new Product({
      name,
      description,
      price,
      category,
      countInStock,
      image,
    });

    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    console.error("❌ createProduct error:", err);
    res.status(500).json({ message: "Server error while creating product" });
  }
};

/**
 * @desc   Update product
 * @route  PUT /api/admin/products/:id
 * @access Admin
 */
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    Object.assign(product, req.body); // merge updates
    const updatedProduct = await product.save();

    res.status(200).json(updatedProduct);
  } catch (err) {
    console.error("❌ updateProduct error:", err);
    res.status(500).json({ message: "Server error while updating product" });
  }
};

/**
 * @desc   Delete product
 * @route  DELETE /api/admin/products/:id
 * @access Admin
 */
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product removed successfully" });
  } catch (err) {
    console.error("❌ deleteProduct error:", err);
    res.status(500).json({ message: "Server error while deleting product" });
  }
};

/**
 * @desc   Get all uploaded designs
 * @route  GET /api/admin/designs
 * @access Admin
 */
exports.getDesigns = async (req, res) => {
  try {
    const designs = await Design.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json(designs);
  } catch (err) {
    console.error("❌ getDesigns error:", err);
    res.status(500).json({ message: "Server error while fetching designs" });
  }
};
