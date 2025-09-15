// src/utils/formatPrice.js
/**
 * Format a number into a currency string
 * @param {number} amount - The price in numeric form
 * @param {string} currency - ISO 4217 currency code (default: "USD")
 * @param {string} locale - Locale code for formatting (default: "en-US")
 * @returns {string} Formatted price string
 */
export default function formatPrice(amount, currency = "USD", locale = "en-US") {
  if (isNaN(amount)) return "Invalid price";

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}
