// server/controllers/paymentController.js
const stripe = require("../utils/stripe");

/**
 * @desc    Get Stripe publishable key (used by frontend)
 * @route   GET /api/payments/config
 * @access  Public
 */
const getStripeConfig = (req, res) => {
  res.json({ publishableKey: process.env.STRIPE_PUBLISHABLE_KEY });
};

/**
 * @desc    Create a Payment Intent
 * @route   POST /api/payments/create-intent
 * @access  Private
 */
const createPaymentIntent = async (req, res) => {
  try {
    const { amount, currency } = req.body;

    if (!amount || !currency) {
      return res.status(400).json({ message: "Amount and currency are required" });
    }

    // Create Stripe Payment Intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount, // amount in smallest currency unit (e.g., cents/paise)
      currency,
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        userId: req.user ? req.user._id.toString() : "guest",
      },
    });

    res.status(201).json({
      clientSecret: paymentIntent.client_secret,
      id: paymentIntent.id,
    });
  } catch (error) {
    console.error("Stripe Payment Error:", error);
    res.status(500).json({ message: "Payment failed", error: error.message });
  }
};

module.exports = {
  getStripeConfig,
  createPaymentIntent,
};
