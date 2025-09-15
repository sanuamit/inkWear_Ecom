// server/scripts/seedProducts.js
// Run with: node server/scripts/seedProducts.js

require("dotenv").config();
const connectDB = require("../config/db");
const Product = require("../models/Product");

// ==============================
// Sample products data
// ==============================
const products = [
  {
    name: "Custom Printed T-Shirt",
    description: "High-quality cotton t-shirt with your custom design.",
    price: 499,
    category: "T-Shirts",
    countInStock: 50,
    image: "/images/tshirt1.jpg",
  },
  {
    name: "Graphic Hoodie",
    description: "Warm hoodie with personalized graphic print.",
    price: 999,
    category: "Hoodies",
    countInStock: 30,
    image: "/images/hoodie1.jpg",
  },
  {
    name: "Canvas Tote Bag",
    description: "Durable tote bag with printed design of your choice.",
    price: 299,
    category: "Accessories",
    countInStock: 100,
    image: "/images/totebag1.jpg",
  },
  {
    name: "Custom Mug",
    description: "Ceramic mug with your custom artwork or photo.",
    price: 199,
    category: "Accessories",
    countInStock: 200,
    image: "/images/mug1.jpg",
  },
  {
    name: "Phone Case",
    description: "Durable phone case with personalized design.",
    price: 349,
    category: "Accessories",
    countInStock: 150,
    image: "/images/phonecase1.jpg",
  },
];

// ==============================
// Seed Products
// ==============================
const seedProducts = async () => {
  try {
    await connectDB();

    // Clear existing products
    await Product.deleteMany();
    console.log("🗑️  Existing products removed");

    // Insert sample products
    const created = await Product.insertMany(products);
    console.log(`✅ ${created.length} products added to the database`);

    process.exit(0);
  } catch (error) {
    console.error(`❌ Error seeding products: ${error.message}`);
    process.exit(1);
  }
};

seedProducts();
