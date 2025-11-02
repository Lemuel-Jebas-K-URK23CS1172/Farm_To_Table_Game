// src/pages/Register.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { API } from "../services/api";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user", // default
  });
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
      const res = await API.post("/auth/register", form);
      console.log("✅ Registered user:", res.data);

      navigate("/login");
    } catch (err) {
      console.error("❌ Register error:", err.response?.data || err.message);
      setError("Registration failed. Please check your inputs and try again.");
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
        <h2 style={{ marginBottom: "20px" }}>🌱 Create Account</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "16px" }}>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={form.name}
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

          {/* Select role */}
          <div style={{ marginBottom: "16px" }}>
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "6px",
                border: "1px solid #555",
                background: "#222",
                color: "#fff",
              }}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
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
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p style={{ marginTop: "16px" }}>
          Already have an account?{" "}
          <Link to="/" style={{ color: "#00ccff", fontWeight: "700" }}>
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
