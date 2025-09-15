// server/middlewares/adminMiddleware.js

/**
 * Check if user is admin
 */
const admin = (req, res, next) => {
  if (req.user && (req.user.role === "admin" || req.user.isAdmin)) {
    return next();
  }
  return res.status(401).json({ message: "Not authorized as admin" });
};

module.exports = { admin };
