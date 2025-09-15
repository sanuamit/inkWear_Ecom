// src/features/cart/cartSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import cartService from "./cartService";

const initialState = {
  cartItems: [],
  totalQuantity: 0,
  totalPrice: 0,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

// ------------------ Async Thunks ------------------

// Get cart
export const getCart = createAsyncThunk(
  "cart/getCart",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user?.token;
      return await cartService.getCart(token);
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Add to cart
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (cartItem, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user?.token;
      return await cartService.addToCart(cartItem, token);
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Update quantity
export const updateCartItem = createAsyncThunk(
  "cart/updateCartItem",
  async ({ itemId, quantity }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user?.token;
      return await cartService.updateCartItem(itemId, quantity, token);
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Remove from cart
export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (itemId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user?.token;
      return await cartService.removeFromCart(itemId, token);
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Clear cart
export const clearCart = createAsyncThunk(
  "cart/clearCart",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user?.token;
      return await cartService.clearCart(token);
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// ------------------ Slice ------------------

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    resetCartState: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
    calculateTotals: (state) => {
      state.totalQuantity = state.cartItems.reduce(
        (total, item) => total + item.quantity,
        0
      );
      state.totalPrice = state.cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    },
  },
  extraReducers: (builder) => {
    builder
      // Get cart
      .addCase(getCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.cartItems = action.payload;
      })
      .addCase(getCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Add to cart
      .addCase(addToCart.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.cartItems = action.payload;
      })

      // Update item
      .addCase(updateCartItem.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.cartItems = action.payload;
      })

      // Remove item
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.cartItems = action.payload;
      })

      // Clear cart
      .addCase(clearCart.fulfilled, (state) => {
        state.isSuccess = true;
        state.cartItems = [];
        state.totalQuantity = 0;
        state.totalPrice = 0;
      });
  },
});

export const { resetCartState, calculateTotals } = cartSlice.actions;
export default cartSlice.reducer;
