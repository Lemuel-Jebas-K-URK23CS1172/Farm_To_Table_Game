// client/src/contexts/AuthContext.jsx
import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem("token") || null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // If a token exists, optionally fetch user profile from API here.
    // For now we decode minimal info from localStorage if stored, or just keep token.
    if (token) {
      // Example: fetch('/api/auth/me') to get user details
      // axios.get('/api/auth/me', { headers: { Authorization: `Bearer ${token}` } }).then(...)
      const raw = localStorage.getItem("user");
      if (raw) setUser(JSON.parse(raw));
    }
    setReady(true);
  }, [token]);

  const login = ({ token, user }) => {
    setToken(token);
    setUser(user || null);
    localStorage.setItem("token", token);
    if (user) localStorage.setItem("user", JSON.stringify(user));
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, token, ready, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
