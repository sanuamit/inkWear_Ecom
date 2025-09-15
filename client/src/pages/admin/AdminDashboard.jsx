// src/pages/admin/AdminDashboard.jsx
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAdminStats } from "../../features/admin/adminSlice";
import Loader from "../../components/Loader";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { stats, isLoading, isError, message } = useSelector(
    (state) => state.admin
  );

  useEffect(() => {
    dispatch(getAdminStats());
  }, [dispatch]);

  if (isLoading) return <Loader />;
  if (isError) return <p className="text-red-500 text-center mt-4">{message}</p>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-lg font-semibold">Total Orders</h2>
          <p className="text-3xl font-bold text-indigo-600">
            {stats?.totalOrders || 0}
          </p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-lg font-semibold">Total Products</h2>
          <p className="text-3xl font-bold text-green-600">
            {stats?.totalProducts || 0}
          </p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-lg font-semibold">Total Users</h2>
          <p className="text-3xl font-bold text-pink-600">
            {stats?.totalUsers || 0}
          </p>
        </div>
      </div>

      {/* Management Links */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          to="/admin/orders"
          className="bg-indigo-500 hover:bg-indigo-600 text-white text-center py-4 rounded-xl shadow transition"
        >
          Manage Orders
        </Link>
        <Link
          to="/admin/products"
          className="bg-green-500 hover:bg-green-600 text-white text-center py-4 rounded-xl shadow transition"
        >
          Manage Products
        </Link>
        <Link
          to="/admin/users"
          className="bg-pink-500 hover:bg-pink-600 text-white text-center py-4 rounded-xl shadow transition"
        >
          Manage Users
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
