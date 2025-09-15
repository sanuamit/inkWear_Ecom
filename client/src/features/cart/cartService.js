//src/features/cart/cartService.js
import axios from "axios";

const API_URL = "/api/cart/";

// Get user's cart
const getCart = async (token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await axios.get(API_URL, config);
  return response.data;
};

// Add item to cart
const addToCart = async (cartItem, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await axios.post(API_URL, cartItem, config);
  return response.data;
};

// Update item quantity in cart
const updateCartItem = async (itemId, quantity, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await axios.put(
    `${API_URL}${itemId}`,
    { quantity },
    config
  );
  return response.data;
};

// Remove item from cart
const removeFromCart = async (itemId, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await axios.delete(`${API_URL}${itemId}`, config);
  return response.data;
};

// Clear entire cart
const clearCart = async (token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await axios.delete(API_URL, config);
  return response.data;
};

const cartService = {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
};

export default cartService;
