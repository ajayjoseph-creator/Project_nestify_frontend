import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";

// 🔄 Load from localStorage
const userFromStorage = JSON.parse(localStorage.getItem("user"));
const tokenFromStorage = localStorage.getItem("token");
const subscriptionFromStorage = JSON.parse(localStorage.getItem("subscription")); // true / false

// 🎯 Initial State
const initialState = {
  loading: false,
  otp: null,
  error: null,
  success: false,
  user: userFromStorage || null,
  token: tokenFromStorage || null,
  subscription: subscriptionFromStorage ?? false, // ✅ boolean, not object
};

// ✅ Thunk: Send OTP
export const sendOtp = createAsyncThunk(
  "auth/sendOtp",
  async (email, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("users/send-otp", { email });
      return res.data.otp;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to send OTP");
    }
  }
);

// ✅ Thunk: Register
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      await axiosInstance.post("users/register", userData);
      return true;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Registration failed");
    }
  }
);

// ✅ Thunk: Login
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("users/login", { email, password });

      const { user, token } = res.data;
      const isSubscribed = !!res.data.user?.subscription?.active;

      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
      localStorage.setItem("subscription", JSON.stringify(isSubscribed)); // ✅ store as true/false

      return {
        user,
        token,
        subscription: isSubscribed,
      };
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Login failed");
    }
  }
);

// ✅ Thunk: Google Login
export const googleLogin = createAsyncThunk(
  "auth/googleLogin",
  async (token, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("users/google", { token });

      const { user, token: accessToken } = res.data;
      const isSubscribed = !!res.data.user?.subscription?.active;

      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", accessToken);
      localStorage.setItem("subscription", JSON.stringify(isSubscribed)); // ✅

      return {
        user,
        token: accessToken,
        subscription: isSubscribed,
      };
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Google login failed");
    }
  }
);

// 🧩 Slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.subscription = false;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      localStorage.removeItem("subscription");
    },
    resetAuth: (state) => {
      state.loading = false;
      state.otp = null;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.otp = action.payload;
      })
      .addCase(sendOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.subscription = action.payload.subscription; // ✅ boolean
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(googleLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(googleLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.subscription = action.payload.subscription; // ✅ boolean
      })
      .addCase(googleLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// 🚀 Exports
export const { logout, resetAuth } = authSlice.actions;
export default authSlice.reducer;
