import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api", // or import.meta.env.VITE_API_URL
  withCredentials: true, // only if cookies/sessions used
  headers: {
    "Content-Type": "application/json",
  },
});


export default axiosInstance;
