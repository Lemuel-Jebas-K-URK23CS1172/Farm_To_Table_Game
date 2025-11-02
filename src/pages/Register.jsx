import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API } from "../services/api";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "user" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await API.post("/auth/register", form);
      console.log("✅ Registered user:", res.data);
      navigate("/login");
    } catch (err) {
      console.error("❌ Register error:", err);
      setError("Registration failed. Please check your inputs and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #042b2a, #0ea5a3)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
      }}
    >
      <div
        style={{
          background: "rgba(0,0,0,0.5)",
          borderRadius: 12,
          padding: "40px",
          width: "min(90%, 400px)",
          boxShadow: "0 8px 30px rgba(0,0,0,0.3)",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: 24,
            color: "#7dd3fc",
            fontSize: "1.8rem",
          }}
        >
          Create Your Account
        </h2>

        <form onSubmit={handleSubmit}>
          {/* Name Field */}
          <label style={{ display: "block", marginBottom: 12 }}>
            Name
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: 6,
                border: "1px solid #ccc",
                marginTop: 4,
                background: "#f8f8f8",
              }}
            />
          </label>

          {/* Email Field */}
          <label style={{ display: "block", marginBottom: 12 }}>
            Email
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: 6,
                border: "1px solid #ccc",
                marginTop: 4,
                background: "#f8f8f8",
              }}
            />
          </label>

          {/* Password Field */}
          <label style={{ display: "block", marginBottom: 12 }}>
            Password
            <input
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: 6,
                border: "1px solid #ccc",
                marginTop: 4,
                background: "#f8f8f8",
              }}
            />
          </label>

          {/* Role Selection */}
          <label style={{ display: "block", marginBottom: 12 }}>
            Select Role
            <select
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: 6,
                border: "1px solid #ccc",
                marginTop: 4,
                background: "#f8f8f8",
                cursor: "pointer",
              }}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </label>

          {/* Error Message */}
          {error && (
            <div
              role="alert"
              style={{
                color: "#ffb4b4",
                background: "rgba(255, 50, 50, 0.06)",
                padding: "10px 12px",
                borderRadius: 8,
                border: "1px solid rgba(255,50,50,0.08)",
                marginTop: 12,
                textAlign: "center",
              }}
            >
              {error}
            </div>
          )}

          {/* Buttons */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 12,
              marginTop: 20,
            }}
          >
            <button
              type="submit"
              disabled={loading}
              style={{
                padding: "10px 18px",
                background: "#0ea5a3",
                color: "#042b2a",
                border: "none",
                borderRadius: 10,
                fontWeight: 700,
                cursor: loading ? "not-allowed" : "pointer",
                fontSize: "1rem",
              }}
            >
              {loading ? "Creating account..." : "Register"}
            </button>

            <div style={{ textAlign: "center", color: "rgba(255,255,255,0.8)" }}>
              Already have an account?{" "}
              <Link to="/login" style={{ color: "#7dd3fc", fontWeight: 700 }}>
                Login
              </Link>
            </div>
          </div>
        </form>

        <div
          style={{
            marginTop: 18,
            color: "rgba(255,255,255,0.3)",
            fontSize: 12,
            textAlign: "center",
          }}
        >
          By registering you agree to our placeholder terms.
        </div>
      </div>
    </div>
  );
}
