

import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://project-nestify-backend.onrender.com/api",
  withCredentials: true, 
  headers: {
    "Content-Type": "application/json",
  },
});


export default axiosInstance;
