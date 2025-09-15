// server/models/Product.js
const mongoose = require("mongoose");

/**
 * Small slugify helper to avoid external dependency.
 * Produces URL-friendly slugs from product names.
 */
const makeSlug = (str) => {
  if (!str) return "";
  return str
    .toString()
    .trim()
    .toLowerCase()
    .replace(/&/g, "-and-")
    .replace(/[\s\W-]+/g, "-") // collapse spaces, non-word chars, dashes
    .replace(/^-+|-+$/g, ""); // trim starting/ending dashes
};

// Review schema (embedded)
const reviewSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true },
  },
  { timestamps: true }
);

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, unique: true, index: true },
    description: { type: String },
    price: { type: Number, required: true, default: 0 },

    image: { type: String }, // primary image
    images: [{ type: String }], // gallery

    // flexible variants structure
    variants: [
      {
        name: { type: String }, // "Size", "Color"
        options: [{ type: String }], // ["S","M","L"]
      },
    ],

    brand: { type: String },
    category: { type: String },

    countInStock: { type: Number, default: 0 },

    reviews: [reviewSchema],
    rating: { type: Number, default: 0 },
    numReviews: { type: Number, default: 0 },

    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

// Auto-generate a slug if name changed or slug missing
productSchema.pre("save", async function (next) {
  if (this.isModified("name") || !this.slug) {
    let base = makeSlug(this.name || "");
    let slug = base || `product-${Date.now()}`;
    // Ensure uniqueness by appending number if needed
    let i = 0;
    while (true) {
      const test = i === 0 ? slug : `${slug}-${i}`;
      // only query if slug changed from current (avoid false positive)
      // mongoose model is available as this.constructor
      // Note: if new doc, this.slug might be undefined
      const existing = await this.constructor.findOne({ slug: test });
      // If no existing OR it's the same doc (update), we can use it
      if (!existing || existing._id.equals(this._id)) {
        this.slug = test;
        break;
      }
      i += 1;
    }
  }
  next();
});

module.exports = mongoose.model("Product", productSchema);
