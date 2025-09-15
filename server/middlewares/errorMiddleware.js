// server/middlewares/errorMiddleware.js

/**
 * Global Error Handling Middleware for InkWear E-Commerce
 * - Logs error details in development
 * - Ensures consistent JSON responses for frontend
 * - Defaults to 500 Internal Server Error if no status is set
 */
const errorHandler = (err, req, res, next) => {
  const statusCode =
    res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;

  // Log stack trace only in development
  if (process.env.NODE_ENV !== "production") {
    console.error("🔥 Error:", err.message);
    console.error(err.stack);
  }

  res.status(statusCode).json({
    success: false,
    message: err.message || "Server Error",
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

module.exports = errorHandler;
