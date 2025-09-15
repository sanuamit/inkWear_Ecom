// src/features/admin/adminService.js
import api from "../../utils/api";

// ========== USER MANAGEMENT ==========
const getAllUsers = async () => {
  const response = await api.get("/admin/users");
  return response.data;
};

const deleteUser = async (userId) => {
  const response = await api.delete(`/admin/users/${userId}`);
  return response.data;
};

const updateUserRole = async (userId, role) => {
  const response = await api.put(`/admin/users/${userId}`, { role });
  return response.data;
};

// ========== PRODUCT MANAGEMENT ==========
const createProduct = async (productData) => {
  const response = await api.post("/admin/products", productData);
  return response.data;
};

const updateProduct = async (productId, productData) => {
  const response = await api.put(`/admin/products/${productId}`, productData);
  return response.data;
};

const deleteProduct = async (productId) => {
  const response = await api.delete(`/admin/products/${productId}`);
  return response.data;
};

// ========== ORDER MANAGEMENT ==========
const getAllOrders = async () => {
  const response = await api.get("/admin/orders");
  return response.data;
};

const updateOrderStatus = async (orderId, status) => {
  const response = await api.put(`/admin/orders/${orderId}`, { status });
  return response.data;
};

// ========== EXPORT SERVICE ==========
const adminService = {
  getAllUsers,
  deleteUser,
  updateUserRole,
  createProduct,
  updateProduct,
  deleteProduct,
  getAllOrders,
  updateOrderStatus,
};

export default adminService;
