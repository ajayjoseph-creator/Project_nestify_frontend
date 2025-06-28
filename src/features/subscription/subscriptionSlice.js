import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

// Get token from localStorage
const token = localStorage.getItem("token");

// Thunk: Create Razorpay order
export const createOrder = createAsyncThunk(
  "subscription/createOrder",
  async (planKey, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/users/create-order",
        { plan: planKey },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data; // orderId, amount, keyId expected
    } catch (err) {
      toast.warning("Something went wrong during order creation.");
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Thunk: Verify Razorpay payment
export const verifyPayment = createAsyncThunk(
  "subscription/verifyPayment",
  async ({ response, planKey, price }, { rejectWithValue }) => {
    try {
      const verifyRes = await axios.post(
        "http://localhost:5000/api/users/verify",
        {
          ...response,
          plan: planKey,
          price,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (verifyRes.data.success) {
        toast.success("Subscription successful! ✅");
        return verifyRes.data; // backend should return { success: true, subscription: {...} }
      } else {
        toast.error("Verification failed ❌");
        return rejectWithValue("Verification failed");
      }
    } catch (err) {
      toast.error("Verification request failed ❌");
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Initial state with localStorage subscription
const initialState = {
  loading: false,
  error: null,
  orderInfo: null,
  verified: false,
  subscription: JSON.parse(localStorage.getItem("subscription")) || null, // 👈 load from storage
};

// Slice
const subscriptionSlice = createSlice({
  name: "subscription",
  initialState,
  reducers: {
    resetSubscriptionState: (state) => {
      state.loading = false;
      state.error = null;
      state.orderInfo = null;
      state.verified = false;
      state.subscription = null;
      localStorage.removeItem("subscription"); // 👈 clear from storage
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Order
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orderInfo = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Verify Payment
      .addCase(verifyPayment.pending, (state) => {
        state.loading = true;
      })
      .addCase(verifyPayment.fulfilled, (state, action) => {
        state.loading = false;
        state.verified = true;

        const subscriptionData = action.payload.subscription || true;
        state.subscription = subscriptionData;

        // Store in localStorage
        localStorage.setItem("subscription", JSON.stringify(subscriptionData));
      })
      .addCase(verifyPayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Exports
export const { resetSubscriptionState } = subscriptionSlice.actions;
export default subscriptionSlice.reducer;
