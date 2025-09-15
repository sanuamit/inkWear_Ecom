// src/features/orders/orderSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import orderService from "./orderService";

// Helper to get token from state
const getToken = (thunkAPI) => thunkAPI.getState().auth.user?.token;

// Create new order
export const createOrder = createAsyncThunk(
  "orders/create",
  async (orderData, thunkAPI) => {
    try {
      return await orderService.createOrder(orderData, getToken(thunkAPI));
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get logged-in user's orders
export const getMyOrders = createAsyncThunk(
  "orders/getMyOrders",
  async (_, thunkAPI) => {
    try {
      return await orderService.getMyOrders(getToken(thunkAPI));
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get single order by ID
export const getOrderById = createAsyncThunk(
  "orders/getOrderById",
  async (orderId, thunkAPI) => {
    try {
      return await orderService.getOrderById(orderId, getToken(thunkAPI));
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const initialState = {
  orders: [],
  orderDetails: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    reset: (state) => { // ✅ renamed to match OrderHistory
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
      state.orderDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Order
      .addCase(createOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.orders.push(action.payload);
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Get My Orders
      .addCase(getMyOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMyOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.orders = action.payload;
      })
      .addCase(getMyOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Get Order by ID
      .addCase(getOrderById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrderById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.orderDetails = action.payload;
      })
      .addCase(getOrderById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = orderSlice.actions; // ✅ named export matches OrderHistory
export default orderSlice.reducer;
