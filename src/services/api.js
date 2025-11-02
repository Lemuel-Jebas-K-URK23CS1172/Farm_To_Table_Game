// src/api.js
import axios from "axios";

// Detect environment automatically
const isDev = import.meta.env.MODE === "development";

// ✅ The base URL switches automatically between local and Railway
export const API = axios.create({
  baseURL: isDev
    ? "http://localhost:8080/api" // local development
    : "https://farmtotablegameserver-production.up.railway.app/api", // production
});

// ✅ Automatically attach token for authenticated requests
API.interceptors.request.use((config) => {
  const user = localStorage.getItem("user");
  if (user) {
    const token = JSON.parse(user)?.token;
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
