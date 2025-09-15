// src/components/ProductCard.jsx
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../features/cart/cartSlice";
import formatPrice from "../utils/formatPrice";

export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (!product) return null;

  const handleAddToCart = (e) => {
    e.stopPropagation();
    dispatch(addToCart({ ...product, quantity: 1 }));
  };

  return (
    <div
      className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
      onClick={() => navigate(`/products/${product._id}`)}
    >
      {/* Product Image */}
      <div className="relative">
        <img
          src={product.image || "/placeholder.png"}
          alt={product.name}
          className="w-full h-64 object-cover"
        />
        {product.isNew && (
          <span className="absolute top-2 left-2 bg-pink-500 text-white text-xs px-2 py-1 rounded-md">
            New
          </span>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 truncate">
          {product.name}
        </h3>
        <p className="text-gray-500 text-sm mt-1 line-clamp-2">
          {product.description}
        </p>

        {/* Price & Button */}
        <div className="mt-4 flex items-center justify-between">
          <span className="text-pink-600 font-bold text-lg">
            {formatPrice(product.price)}
          </span>
          <button
            onClick={handleAddToCart}
            className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-md text-sm transition-colors"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
