import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import GamePage from "./pages/GamePage.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import NotFound from "./pages/NotFound.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import AdminPage from "./pages/AdminPage";

// ...
<Route path="/admin" element={<AdminPage />} />
<Route path="/admin" element={<AdminDashboard />} />

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/game"
          element={
            <ProtectedRoute>
              <GamePage />
            </ProtectedRoute>
          }
        />
        {user?.role === "admin" && (
  <Link to="/admin" style={{ color: "#00ff88", fontWeight: "bold", textDecoration: "none" }}>
    🛠️ Admin Dashboard
  </Link>
)}

        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  );
}
