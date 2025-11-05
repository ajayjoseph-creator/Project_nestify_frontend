import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = "https://project-nestify-backend.onrender.com/api";

// 🚀 Fetch Profile
export const fetchUserProfile = createAsyncThunk("user/fetchProfile", async (_, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.get(`${API}/users/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || "Profile fetch failed");
  }
});

// 🚀 Fetch Properties of User
export const fetchUserProperties = createAsyncThunk("user/fetchProperties", async (userId, { rejectWithValue }) => {
  try {
    const res = await axios.get(`${API}/property/owner/${userId}`);
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || "Property fetch failed");
  }
});

// 🚀 Update Profile
export const updateUserProfile = createAsyncThunk("user/updateProfile", async (formData, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.put(`${API}/users/profile`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || "Profile update failed");
  }
});

// 🚀 Delete Property
export const deleteProperty = createAsyncThunk("user/deleteProperty", async (id, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("token");
    await axios.delete(`${API}/property/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return id; // Return deleted property ID
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || "Property delete failed");
  }
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    profile: null,
    properties: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearUserData: (state) => {
      state.profile = null;
      state.properties = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Profile
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
        state.loading = false;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })

      // Fetch Properties
      .addCase(fetchUserProperties.fulfilled, (state, action) => {
        state.properties = action.payload;
      })

      // Update Profile
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
      })

      // Delete Property
      .addCase(deleteProperty.fulfilled, (state, action) => {
        state.properties = state.properties.filter((prop) => prop._id !== action.payload);
      });
  },
});

export const { clearUserData } = userSlice.actions;
export default userSlice.reducer;
