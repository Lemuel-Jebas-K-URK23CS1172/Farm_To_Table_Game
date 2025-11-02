// src/pages/Login.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { API } from "../api";

export default function LoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handle field updates
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ Make this function async to use "await"
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // Login to Railway backend
      const res = await API.post("/auth/login", form);

      // ✅ Save token and user data
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      console.log("✅ Logged in:", res.data.user);

      // ✅ Redirect directly to the game
      navigate("/game");
    } catch (err) {
      console.error("❌ Login error:", err.response?.data || err.message);
      setError("Invalid credentials. Please check your email and password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#0a0a0a",
        color: "#fff",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      <div
        style={{
          backgroundColor: "rgba(255,255,255,0.06)",
          padding: "40px",
          borderRadius: "12px",
          width: "100%",
          maxWidth: "400px",
          boxShadow: "0 0 20px rgba(0,0,0,0.5)",
        }}
      >
        <h1 style={{ textAlign: "center", marginBottom: "20px", color: "#4fd1c5" }}>
          🌾 Farm to Table Rescue
        </h1>
        <h2 style={{ textAlign: "center", marginBottom: "20px", color: "#90cdf4" }}>
          Login
        </h2>

        <form onSubmit={handleSubmit}>
          <label style={{ display: "block", marginBottom: "8px" }}>Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "15px",
              borderRadius: "8px",
              border: "1px solid #666",
              backgroundColor: "#1a1a1a",
              color: "#fff",
            }}
          />

          <label style={{ display: "block", marginBottom: "8px" }}>Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "20px",
              borderRadius: "8px",
              border: "1px solid #666",
              backgroundColor: "#1a1a1a",
              color: "#fff",
            }}
          />

          {error && (
            <div
              style={{
                color: "#ff6b6b",
                background: "rgba(255, 50, 50, 0.1)",
                padding: "10px",
                borderRadius: "8px",
                marginBottom: "15px",
                border: "1px solid rgba(255,50,50,0.2)",
                textAlign: "center",
              }}
            >
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "10px",
              backgroundColor: loading ? "#444" : "#38b2ac",
              color: "#fff",
              fontWeight: "bold",
              border: "none",
              borderRadius: "8px",
              cursor: loading ? "not-allowed" : "pointer",
              transition: "background 0.2s ease",
            }}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p
          style={{
            marginTop: "15px",
            textAlign: "center",
            color: "rgba(255,255,255,0.8)",
          }}
        >
          Don’t have an account?{" "}
          <Link to="/register" style={{ color: "#4fd1c5", fontWeight: "bold" }}>
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
