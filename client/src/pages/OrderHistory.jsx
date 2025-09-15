// src/pages/OrderHistory.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getMyOrders, reset } from "../features/orders/orderSlice"; // ✅ now matches the slice
import formatPrice from "../utils/formatPrice";
import Loader from "../components/Loader";

const OrderHistory = () => {
  const dispatch = useDispatch();

  const { orders, isLoading, isError, message } = useSelector(
    (state) => state.orders
  );

  useEffect(() => {
    dispatch(getMyOrders());

    return () => {
      dispatch(reset()); // ✅ now calls the matching reducer
    };
  }, [dispatch]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Order History</h1>

      {isLoading && <Loader />}

      {isError && (
        <div className="mb-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded p-2">
          {message}
        </div>
      )}

      {!isLoading && orders && orders.length === 0 && (
        <p className="text-gray-600">
          You have no orders yet.{" "}
          <Link to="/" className="text-pink-500 hover:text-pink-600 font-medium">
            Start shopping
          </Link>
          .
        </p>
      )}

      {!isLoading && orders && orders.length > 0 && (
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full text-sm text-left text-gray-700">
            <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
              <tr>
                <th className="px-4 py-3">Order ID</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Total</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr
                  key={order._id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="px-4 py-3 font-mono text-xs">
                    {order._id.slice(-8).toUpperCase()}
                  </td>
                  <td className="px-4 py-3">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">{formatPrice(order.totalPrice)}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        order.isDelivered
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {order.isDelivered ? "Delivered" : "Processing"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <Link
                      to={`/order/${order._id}`}
                      className="text-pink-500 hover:text-pink-600 text-sm font-medium"
                    >
                      View Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
