//src/pages/OrderTracking.jsx
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrderById } from "../features/orders/orderSlice";
import Loader from "../components/Loader";
import { Link } from "react-router-dom";

const steps = ["Placed", "Processing", "Shipped", "Delivered"];

const OrderTracking = () => {
  const [orderId, setOrderId] = useState("");
  const dispatch = useDispatch();
  const { order, isLoading, isError, message } = useSelector(
    (state) => state.orders
  );

  const handleTrack = (e) => {
    e.preventDefault();
    if (orderId.trim()) {
      dispatch(getOrderById(orderId.trim()));
    }
  };

  const getStepStatus = (status) => {
    switch (status?.toLowerCase()) {
      case "placed":
        return 0;
      case "processing":
        return 1;
      case "shipped":
        return 2;
      case "delivered":
        return 3;
      default:
        return -1;
    }
  };

  const currentStep = getStepStatus(order?.orderStatus);

  return (
    <div className="max-w-3xl mx-auto p-6 min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold mb-6 text-center">Track Your Order</h1>

      {/* Search Form */}
      <form
        onSubmit={handleTrack}
        className="flex flex-col sm:flex-row gap-4 mb-8"
      >
        <input
          type="text"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          placeholder="Enter your Order ID"
          className="flex-1 border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-pink-400"
        />
        <button
          type="submit"
          className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-lg"
        >
          Track
        </button>
      </form>

      {/* Loading/Error */}
      {isLoading && <Loader />}
      {isError && <p className="text-red-500 mb-4">{message}</p>}

      {/* Order Info */}
      {order && (
        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-sm text-gray-500">Order ID:</p>
          <p className="font-mono font-medium mb-3">{order._id}</p>
          <p className="text-sm text-gray-500">Current Status:</p>
          <p className="font-semibold text-pink-600 mb-6">
            {order.orderStatus}
          </p>

          {/* Timeline */}
          <div className="flex items-center justify-between relative">
            {steps.map((step, index) => (
              <div key={step} className="flex-1 flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                    index <= currentStep
                      ? "bg-pink-500"
                      : "bg-gray-300 text-gray-500"
                  }`}
                >
                  {index + 1}
                </div>
                <p
                  className={`mt-2 text-sm ${
                    index <= currentStep ? "text-pink-600" : "text-gray-500"
                  }`}
                >
                  {step}
                </p>
              </div>
            ))}

            {/* Progress Line */}
            <div className="absolute top-4 left-4 right-4 h-1 bg-gray-300 -z-10">
              <div
                className="h-1 bg-pink-500 transition-all duration-500"
                style={{
                  width: `${(currentStep / (steps.length - 1)) * 100}%`,
                }}
              />
            </div>
          </div>

          {/* Back to Home */}
          <div className="mt-8 text-center">
            <Link
              to="/"
              className="bg-gray-800 hover:bg-gray-900 text-white px-6 py-2 rounded-lg"
            >
              Back to Home
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderTracking;
