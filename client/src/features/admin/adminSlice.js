// src/features/admin/adminSlice.js

// src/features/admin/adminSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import adminService from "./adminService";

/*
This slice supports:
- AdminDashboard.jsx -> getAdminStats
- ProductManager.jsx -> getAllProductsAdmin, createProduct, updateProduct, deleteProduct
- OrderManager.jsx   -> getAllOrders, updateOrderStatus
- UserManager.jsx    -> getAllUsers, deleteUser, updateUserRole
*/

const initialState = {
  stats: null,

  products: [],
  orders: [],
  users: [],

  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

/* ===========================
   Async Thunks (Admin)
   =========================== */

// --- STATS ---
export const getAdminStats = createAsyncThunk(
  "admin/getAdminStats",
  async (_, thunkAPI) => {
    try {
      return await adminService.getAdminStats();
    } catch (err) {
      const message =
        err?.response?.data?.message || err?.message || err?.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// --- PRODUCTS ---
export const getAllProductsAdmin = createAsyncThunk(
  "admin/getAllProductsAdmin",
  async (_, thunkAPI) => {
    try {
      return await adminService.getAllProducts();
    } catch (err) {
      const message =
        err?.response?.data?.message || err?.message || err?.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const createProduct = createAsyncThunk(
  "admin/createProduct",
  async (productData, thunkAPI) => {
    try {
      return await adminService.createProduct(productData);
    } catch (err) {
      const message =
        err?.response?.data?.message || err?.message || err?.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateProduct = createAsyncThunk(
  "admin/updateProduct",
  async ({ id, updates }, thunkAPI) => {
    try {
      return await adminService.updateProduct(id, updates);
    } catch (err) {
      const message =
        err?.response?.data?.message || err?.message || err?.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "admin/deleteProduct",
  async (productId, thunkAPI) => {
    try {
      return await adminService.deleteProduct(productId);
    } catch (err) {
      const message =
        err?.response?.data?.message || err?.message || err?.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// --- ORDERS ---
export const getAllOrders = createAsyncThunk(
  "admin/getAllOrders",
  async (_, thunkAPI) => {
    try {
      return await adminService.getAllOrders();
    } catch (err) {
      const message =
        err?.response?.data?.message || err?.message || err?.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateOrderStatus = createAsyncThunk(
  "admin/updateOrderStatus",
  async ({ orderId, status }, thunkAPI) => {
    try {
      return await adminService.updateOrderStatus(orderId, status);
    } catch (err) {
      const message =
        err?.response?.data?.message || err?.message || err?.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// --- USERS ---
export const getAllUsers = createAsyncThunk(
  "admin/getAllUsers",
  async (_, thunkAPI) => {
    try {
      return await adminService.getAllUsers();
    } catch (err) {
      const message =
        err?.response?.data?.message || err?.message || err?.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "admin/deleteUser",
  async (userId, thunkAPI) => {
    try {
      return await adminService.deleteUser(userId);
    } catch (err) {
      const message =
        err?.response?.data?.message || err?.message || err?.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateUserRole = createAsyncThunk(
  "admin/updateUserRole",
  async ({ userId, role }, thunkAPI) => {
    try {
      return await adminService.updateUserRole(userId, role);
    } catch (err) {
      const message =
        err?.response?.data?.message || err?.message || err?.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

/* ===========================
   Slice
   =========================== */

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      /* ----- STATS ----- */
      .addCase(getAdminStats.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAdminStats.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.stats = action.payload;
      })
      .addCase(getAdminStats.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      /* ----- PRODUCTS ----- */
      .addCase(getAllProductsAdmin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllProductsAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.products = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(getAllProductsAdmin.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      .addCase(createProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        if (action.payload) state.products.unshift(action.payload);
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      .addCase(updateProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        const updated = action.payload;
        if (updated?._id) {
          const idx = state.products.findIndex((p) => p._id === updated._id);
          if (idx !== -1) state.products[idx] = updated;
        }
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      .addCase(deleteProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        const deletedId =
          action.payload?.id || action.payload?._id || action.meta.arg;
        state.products = state.products.filter((p) => p._id !== deletedId);
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      /* ----- ORDERS ----- */
      .addCase(getAllOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.orders = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(getAllOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      .addCase(updateOrderStatus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        const updated = action.payload;
        if (updated?._id) {
          const idx = state.orders.findIndex((o) => o._id === updated._id);
          if (idx !== -1) state.orders[idx] = updated;
        }
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      /* ----- USERS ----- */
      .addCase(getAllUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.users = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      .addCase(deleteUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        const deletedId =
            action.payload?.id || action.payload?._id || action.meta.arg;
        state.users = state.users.filter((u) => u._id !== deletedId);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      .addCase(updateUserRole.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUserRole.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        const updated = action.payload;
        if (updated?._id) {
          const idx = state.users.findIndex((u) => u._id === updated._id);
          if (idx !== -1) state.users[idx] = updated;
        }
      })
      .addCase(updateUserRole.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = adminSlice.actions;
export default adminSlice.reducer;
