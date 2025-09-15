import React from "react";
import { Link, useLocation } from "react-router-dom";
import formatPrice from "../utils/formatPrice";

const OrderSuccess = () => {
  const location = useLocation();
  const orderData = location.state?.order || null;

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 text-center">
      {/* Success Icon */}
      <div className="mb-6">
        <svg
          className="w-20 h-20 text-green-500 mx-auto"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>

      {/* Title & Message */}
      <h1 className="text-3xl font-bold text-gray-800 mb-2">
        Order Placed Successfully 🎉
      </h1>
      <p className="text-gray-600 mb-6 max-w-md">
        Thank you for shopping with InkWear! Your order has been confirmed and
        will be processed shortly.
      </p>

      {/* Order Summary Card */}
      {orderData && (
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md mb-6 text-left">
          <p className="text-sm text-gray-500">Order ID:</p>
          <p className="font-mono font-medium text-gray-800 mb-3">
            {orderData._id}
          </p>

          <p className="text-sm text-gray-500">Total Amount:</p>
          <p className="text-lg font-semibold text-gray-800 mb-3">
            {formatPrice(orderData.totalPrice)}
          </p>

          <p className="text-sm text-gray-500">Payment Status:</p>
          <p className="text-green-600 font-medium">Paid</p>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-4">
        {orderData && (
          <Link
            to={`/order/${orderData._id}`}
            className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-lg transition"
          >
            View Order
          </Link>
        )}
        <Link
          to="/"
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-2 rounded-lg transition"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default OrderSuccess;
