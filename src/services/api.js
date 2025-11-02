// src/api.js
import axios from "axios";

// ✅ Use your Railway backend base URL here
export const API = axios.create({
  baseURL: "https://farmtotablegameserver-production.up.railway.app/api",
});

// ✅ Automatically attach token for authenticated routes
API.interceptors.request.use((config) => {
  const user = localStorage.getItem("user");
  if (user) {
    const token = JSON.parse(user)?.token;
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
