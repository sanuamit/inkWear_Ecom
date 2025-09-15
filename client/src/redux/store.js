// client/src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";

// Import all slices
import authReducer from "../features/auth/authSlice";
import productReducer from "../features/products/productSlice";
import cartReducer from "../features/cart/cartSlice";
import orderReducer from "../features/orders/orderSlice";
import adminReducer from "../features/admin/adminSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
    cart: cartReducer,
    orders: orderReducer,
    admin: adminReducer,
  },
  devTools: import.meta.env.MODE !== "production", // Enable Redux DevTools in dev mode
});

export default store;
