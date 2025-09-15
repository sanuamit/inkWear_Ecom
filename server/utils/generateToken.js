// server/utils/generateToken.js
const jwt = require("jsonwebtoken");

/**
 * Generate JWT Token for a user
 * @param {string} id - MongoDB User ID
 * @returns {string} - Signed JWT
 */
const generateToken = (id) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }

  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "7d", // token validity (7 days)
  });
};

module.exports = generateToken;
