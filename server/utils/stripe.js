// server/utils/stripe.js
const Stripe = require("stripe");

/**
 * Initialize Stripe with secret key
 * Make sure STRIPE_SECRET_KEY is set in .env
 */
if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("❌ STRIPE_SECRET_KEY is missing in environment variables");
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-11-15",
});

module.exports = stripe;
