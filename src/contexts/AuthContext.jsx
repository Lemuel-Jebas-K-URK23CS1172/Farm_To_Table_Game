// src/contexts/AuthContext.jsx
import React, { createContext, useState, useEffect } from "react";
import jwtDecode from "jwt-decode"; // ✅ correct import
import { API } from "../api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  // ✅ On app start — restore user from stored token
  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser({
          id: decoded.id,
          name: decoded.name,
          email: decoded.email,
          role: decoded.role,
        });
      } catch (err) {
        console.error("❌ Token decode failed:", err);
        localStorage.removeItem("token");
        setUser(null);
      }
    }
  }, [token]);

  // ✅ Login function
  const login = async (email, password) => {
    try {
      const res = await API.post("/auth/login", { email, password });

      if (res.data?.token) {
        localStorage.setItem("token", res.data.token);
        setToken(res.data.token);

        const decoded = jwtDecode(res.data.token);
        setUser({
          id: decoded.id,
          name: decoded.name,
          email: decoded.email,
          role: decoded.role,
        });
      }

      console.log("✅ Login successful:", res.data);
      return res.data;
    } catch (err) {
      console.error("❌ Login failed:", err.response?.data || err.message);
      throw err;
    }
  };

  // ✅ Logout
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
