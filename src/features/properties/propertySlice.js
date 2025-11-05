// src/features/property/propertySlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = "https://project-nestify-backend.onrender.com/api/property/all-properties";

// 🔄 Fetch all properties with optional filters
export const fetchAllProperties = createAsyncThunk(
  "property/fetchAll",
  async (filters = {}) => {
    const query = new URLSearchParams(filters).toString();
    const res = await axios.get(`${API}?${query}`);
    return res.data;
  }
);

// 🔥 Fetch featured properties (price >= 5000000)
export const fetchFeaturedProperties = createAsyncThunk(
  "property/fetchFeatured",
  async () => {
    const res = await axios.get(API);
    return res.data.filter((p) => parseInt(p.price) >= 5000000);
  }
);

const propertySlice = createSlice({
  name: "property",
  initialState: {
    allProperties: [],
    featuredProperties: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      // 🔄 All properties
      .addCase(fetchAllProperties.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllProperties.fulfilled, (state, action) => {
        state.loading = false;
        state.allProperties = action.payload;
      })
      .addCase(fetchAllProperties.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // ⭐ Featured properties
      .addCase(fetchFeaturedProperties.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFeaturedProperties.fulfilled, (state, action) => {
        state.loading = false;
        state.featuredProperties = action.payload;
      })
      .addCase(fetchFeaturedProperties.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default propertySlice.reducer;
