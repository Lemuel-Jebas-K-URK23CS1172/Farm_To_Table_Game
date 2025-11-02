// src/pages/Login.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { API } from "../services/api";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await API.post("/auth/login", form);
      console.log("✅ Login success:", res.data);

      // Save token and user info
      if (res.data.token) localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      // Redirect based on role
      if (res.data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/game");
      }
    } catch (err) {
      console.error("❌ Login error:", err.response?.data || err.message);
      setError("Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundColor: "#0a0a0a",
        color: "#fff",
      }}
    >
      <div
        style={{
          backgroundColor: "#111",
          borderRadius: "12px",
          padding: "40px",
          width: "90%",
          maxWidth: "400px",
          textAlign: "center",
          boxShadow: "0 0 25px rgba(0, 0, 0, 0.6)",
        }}
      >
        <h2 style={{ marginBottom: "20px" }}>🌾 Farm to Table Login</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "16px" }}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "6px",
                border: "1px solid #555",
                background: "#222",
                color: "#fff",
              }}
            />
          </div>
          <div style={{ marginBottom: "16px" }}>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "6px",
                border: "1px solid #555",
                background: "#222",
                color: "#fff",
              }}
            />
          </div>

          {error && (
            <div style={{ color: "#ff6666", marginBottom: "12px" }}>{error}</div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              backgroundColor: "#00cc66",
              color: "#111",
              border: "none",
              borderRadius: "8px",
              padding: "10px 18px",
              cursor: "pointer",
              fontWeight: "700",
              width: "100%",
            }}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p style={{ marginTop: "16px" }}>
          Don't have an account?{" "}
          <Link to="/register" style={{ color: "#00ccff", fontWeight: "700" }}>
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
