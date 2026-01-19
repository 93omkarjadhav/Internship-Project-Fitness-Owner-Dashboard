// src/api/adminApi.ts
import axios from "axios";

// 🌐 Base URL for Admin Server (Port 5000)
const adminApi = axios.create({
  baseURL: "http://localhost:5000/api/admin",
});

// 🧩 Interceptor to add Token
adminApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["x-auth-token"] = token; // Admin backend expects this header
  }
  return config;
});

export default adminApi;