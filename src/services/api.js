// src/api.js
import axios from "axios";

const API = axios.create({
  baseURL: "https://farmtotablegameserver-production.up.railway.app/api",
});

// ✅ Attach token for all authenticated requests
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // token stored during login
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export { API };
