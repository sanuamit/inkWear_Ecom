// src/features/orders/orderService.js
import axios from "axios";

const API_URL = "/api/orders"; // Proxy will handle /api → backend

// Create new order
const createOrder = async (orderData, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await axios.post(API_URL, orderData, config);
  return response.data;
};

// Get all orders for logged-in user
const getMyOrders = async (token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await axios.get(`${API_URL}/myorders`, config);
  return response.data;
};

// Get single order details
const getOrderById = async (orderId, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await axios.get(`${API_URL}/${orderId}`, config);
  return response.data;
};

// Update order status (Admin)
const updateOrderStatus = async (orderId, statusData, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await axios.put(`${API_URL}/${orderId}`, statusData, config);
  return response.data;
};

const orderService = {
  createOrder,
  getMyOrders,
  getOrderById,
  updateOrderStatus,
};

export default orderService;
