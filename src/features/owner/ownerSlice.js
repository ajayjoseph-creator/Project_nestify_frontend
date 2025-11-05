// src/features/owner/ownerSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchOwnerById = createAsyncThunk(
  "owner/fetchOwnerById",
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`https://project-nestify-backend.onrender.com/api/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const fetchOwnerProperties = createAsyncThunk(
  "owner/fetchOwnerProperties",
  async (ownerId, { rejectWithValue }) => {
    try {
      const res = await axios.get(`https://project-nestify-backend.onrender.com/api/property/owner/${ownerId}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const ownerSlice = createSlice({
  name: "owner",
  initialState: {
    owner: null,
    properties: [],
    loading: false,
    error: null,
  },
  reducers: {
    resetOwnerState: (state) => {
      state.owner = null;
      state.properties = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOwnerById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOwnerById.fulfilled, (state, action) => {
        state.owner = action.payload;
        state.loading = false;
      })
      .addCase(fetchOwnerById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchOwnerProperties.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOwnerProperties.fulfilled, (state, action) => {
        state.properties = action.payload;
        state.loading = false;
      })
      .addCase(fetchOwnerProperties.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetOwnerState } = ownerSlice.actions;
export default ownerSlice.reducer;