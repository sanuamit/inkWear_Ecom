// server/scripts/seedAdmin.js
// Run with: node server/scripts/seedAdmin.js

require("dotenv").config();
const bcrypt = require("bcryptjs");
const connectDB = require("../config/db");
const User = require("../models/User");

const seedAdmin = async () => {
  await connectDB();

  try {
    const email = process.env.SEED_ADMIN_EMAIL || "admin@inkwear.local";
    const password = process.env.SEED_ADMIN_PASS || "AdminPass123!";

    // Check if admin already exists
    let admin = await User.findOne({ email });
    if (admin) {
      console.log("⚠️  Admin already exists:", admin.email);
      process.exit(0);
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create admin user
    admin = await User.create({
      name: "Admin",
      email,
      password: hashedPassword,
      role: "admin",
    });

    console.log("✅ Admin account created successfully!");
    console.log("   Email:", email);
    console.log("   Password:", password);
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding admin:", error.message);
    process.exit(1);
  }
};

seedAdmin();
