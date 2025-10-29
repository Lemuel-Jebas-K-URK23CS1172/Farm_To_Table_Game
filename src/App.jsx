// src/App.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/Login";         // ensure paths / filenames match
import RegisterPage from "./pages/Register";   // <- your new file
import Home from "./pages/Home";               // optional landing page
import NotFound from "./pages/NotFound";
import GamePage from "./pages/GamePage";

// OPTIONAL: simple protected route using localStorage token
function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* protected dashboard */}
      <Route
        path="/Dashboard"
        element={
          <ProtectedRoute>
            <GamePage />
          </ProtectedRoute>
        }
      />

      {/* catch-all 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
