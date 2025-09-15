// src/features/products/productService.js
import axios from "axios";

const API_URL = "/api/products"; // Backend proxy will map /api → server

// Fetch all products
const getProducts = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Fetch single product by ID
const getProductById = async (productId) => {
  const response = await axios.get(`${API_URL}/${productId}`);
  return response.data;
};

// Create new product (Admin only)
const createProduct = async (productData, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await axios.post(API_URL, productData, config);
  return response.data;
};

// Update product (Admin only)
const updateProduct = async (productId, productData, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await axios.put(`${API_URL}/${productId}`, productData, config);
  return response.data;
};

// Delete product (Admin only)
const deleteProduct = async (productId, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await axios.delete(`${API_URL}/${productId}`, config);
  return response.data;
};

const productService = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};

export default productService;
