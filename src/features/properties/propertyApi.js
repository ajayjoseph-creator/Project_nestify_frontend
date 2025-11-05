import axios from "axios";

const API_BASE = "https://project-nestify-backend.onrender.com/api/property";

// 🔄 GET: All Properties (with optional filters)
export const getAllProperties = async (filters = {}) => {
  const query = new URLSearchParams(filters).toString();
  const res = await axios.get(`${API_BASE}/all-properties?${query}`);
  return res.data;
};

// 🌟 GET: Featured Properties (₹5L+)
export const getFeaturedProperties = async () => {
  const res = await axios.get(`${API_BASE}/all-properties`);
  return res.data.filter((p) => parseInt(p.price) >= 5000000);
};

// ➕ POST: Add New Property
export const addProperty = async (propertyData) => {
  const res = await axios.post(`${API_BASE}/create`, propertyData);
  return res.data;
};

// ✏️ PUT: Update Property by ID
export const updateProperty = async (id, updatedData) => {
  const res = await axios.put(`${API_BASE}/update/${id}`, updatedData);
  return res.data;
};

// ❌ DELETE: Remove Property by ID
export const deleteProperty = async (id) => {
  const res = await axios.delete(`${API_BASE}/delete/${id}`);
  return res.data;
};

// 🔍 GET: Single Property by ID
export const getPropertyById = async (id) => {
  const token = localStorage.getItem("token");
  const res = await axios.get(`${API_BASE}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
