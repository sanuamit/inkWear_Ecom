//src/pages/OrderSummary.jsx
import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOrderById } from "../features/orders/orderSlice";
import Loader from "../components/Loader";
import formatPrice from "../utils/formatPrice";

const OrderSummary = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { order, isLoading, isError, message } = useSelector(
    (state) => state.orders
  );

  useEffect(() => {
    if (id) {
      dispatch(getOrderById(id));
    }
  }, [dispatch, id]);

  if (isLoading) return <Loader />;
  if (isError) return <p className="text-red-500 text-center mt-4">{message}</p>;

  if (!order) {
    return (
      <div className="text-center mt-10">
        <p className="text-gray-600">No order details found.</p>
        <Link
          to="/"
          className="mt-4 inline-block bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-lg"
        >
          Go to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Order Summary</h1>

      {/* Order Info */}
      <div className="bg-white rounded-xl shadow p-6 mb-6">
        <p className="text-sm text-gray-500">Order ID:</p>
        <p className="font-mono font-medium text-gray-800 mb-3">{order._id}</p>

        <p className="text-sm text-gray-500">Status:</p>
        <p className="font-medium text-green-600 mb-3">{order.orderStatus}</p>

        <p className="text-sm text-gray-500">Placed On:</p>
        <p className="font-medium text-gray-800">
          {new Date(order.createdAt).toLocaleDateString()}
        </p>
      </div>

      {/* Shipping Info */}
      <div className="bg-white rounded-xl shadow p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">Shipping Information</h2>
        <p className="text-gray-800">{order.shippingAddress?.fullName}</p>
        <p className="text-gray-600">
          {order.shippingAddress?.address},{" "}
          {order.shippingAddress?.city},{" "}
          {order.shippingAddress?.postalCode},{" "}
          {order.shippingAddress?.country}
        </p>
      </div>

      {/* Items */}
      <div className="bg-white rounded-xl shadow p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">Items</h2>
        <div className="divide-y divide-gray-200">
          {order.orderItems?.map((item) => (
            <div
              key={item._id}
              className="flex items-center justify-between py-4"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div>
                  <p className="font-medium text-gray-800">{item.name}</p>
                  <p className="text-sm text-gray-500">Qty: {item.qty}</p>
                </div>
              </div>
              <p className="font-medium text-gray-800">
                {formatPrice(item.price * item.qty)}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Payment & Total */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Payment Summary</h2>
        <div className="flex justify-between mb-2">
          <span>Items Total</span>
          <span>{formatPrice(order.itemsPrice)}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Shipping</span>
          <span>{formatPrice(order.shippingPrice)}</span>
        </div>
        <div className="flex justify-between font-bold text-lg">
          <span>Total</span>
          <span>{formatPrice(order.totalPrice)}</span>
        </div>
      </div>

      <div className="mt-6">
        <Link
          to="/"
          className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-lg"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default OrderSummary;
