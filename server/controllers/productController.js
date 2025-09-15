// 📁 server/controllers/productController.js
const Product = require("../models/Product");

/**
 * Create product (Admin)
 * POST /api/products
 */
const createProduct = async (req, res, next) => {
  try {
    const {
      name,
      slug, // optional, will be generated if missing
      description,
      price,
      image,
      images,
      variants,
      brand,
      category,
      countInStock,
    } = req.body;

    // minimal validation
    if (!name || price == null) {
      res.status(400);
      throw new Error("Name and price are required");
    }

    // If slug provided, check uniqueness
    if (slug) {
      const exists = await Product.findOne({ slug });
      if (exists) {
        res.status(400);
        throw new Error("Slug already in use");
      }
    }

    const product = new Product({
      name,
      slug,
      description,
      price,
      image,
      images: images || [],
      variants: variants || [],
      brand,
      category,
      countInStock: countInStock || 0,
      createdBy: req.user ? req.user._id : undefined,
    });

    const created = await product.save();
    res.status(201).json(created);
  } catch (err) {
    next(err);
  }
};

/**
 * Get all products (public)
 * GET /api/products
 */
const getProducts = async (req, res, next) => {
  try {
    // TODO: later add pagination, search, filters
    const products = await Product.find({}).sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    next(err);
  }
};

/**
 * Get product by ID or slug
 * GET /api/products/:idOrSlug
 * Accept both Mongo ID and slug
 */
const getProductById = async (req, res, next) => {
  try {
    const idOrSlug = req.params.id;
    let product = null;

    // Try by ObjectId first
    if (/^[0-9a-fA-F]{24}$/.test(idOrSlug)) {
      product = await Product.findById(idOrSlug);
    }

    // If not found by id, try slug
    if (!product) {
      product = await Product.findOne({ slug: idOrSlug });
    }

    if (!product) {
      res.status(404);
      throw new Error("Product not found");
    }

    res.json(product);
  } catch (err) {
    next(err);
  }
};

/**
 * Update product (Admin)
 * PUT /api/products/:id
 */
const updateProduct = async (req, res, next) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (!product) {
      res.status(404);
      throw new Error("Product not found");
    }

    const updates = req.body || {};

    // If slug changing, ensure not colliding
    if (updates.slug && updates.slug !== product.slug) {
      const exists = await Product.findOne({ slug: updates.slug });
      if (exists && !exists._id.equals(product._id)) {
        res.status(400);
        throw new Error("Another product already uses that slug");
      }
    }

    // Merge updates
    Object.keys(updates).forEach((key) => {
      product[key] = updates[key];
    });

    const updated = await product.save();
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

/**
 * Delete product (Admin)
 * DELETE /api/products/:id
 */
const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      res.status(404);
      throw new Error("Product not found");
    }

    await product.deleteOne();
    res.json({ message: "Product removed" });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
