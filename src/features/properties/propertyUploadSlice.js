// src/features/properties/propertyUploadSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// 🔥 Thunk to upload property
export const uploadProperty = createAsyncThunk(
  "propertyUpload/uploadProperty",
  async ({ formData, token }, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/property/add-property",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// 🧠 Initial State
const initialState = {
  loading: false,
  success: false,
  error: null,
};

// 🚀 Slice
const propertyUploadSlice = createSlice({
  name: "propertyUpload",
  initialState,
  reducers: {
    resetPropertyUpload: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadProperty.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(uploadProperty.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(uploadProperty.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      });
  },
});

export const { resetPropertyUpload } = propertyUploadSlice.actions;
export default propertyUploadSlice.reducer;
