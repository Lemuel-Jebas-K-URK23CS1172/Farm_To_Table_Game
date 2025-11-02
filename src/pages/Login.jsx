// src/pages/Login.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { API } from "../api"; // ✅ make sure this path is correct (../api or ../services/api)

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await API.post("/auth/login", form);
      const { token, user } = res.data;

      if (!user) throw new Error("Invalid user data");

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      console.log("✅ Login successful:", user);

      // ✅ Redirect based on role
      if (user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/game");
      }
    } catch (err) {
      console.error("❌ Login failed:", err);
      setError("Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#000",
        color: "#fff",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "#111",
          padding: "40px",
          borderRadius: "12px",
          width: "90%",
          maxWidth: "400px",
          boxShadow: "0 0 25px rgba(0,0,0,0.6)",
          textAlign: "center",
        }}
      >
        <h2 style={{ marginBottom: "20px" }}>🌾 Farm to Table Login</h2>
        <form onSubmit={handleSubmit}>
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
              marginBottom: "14px",
              borderRadius: "6px",
              border: "1px solid #555",
              background: "#222",
              color: "#fff",
            }}
          />
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
              marginBottom: "14px",
              borderRadius: "6px",
              border: "1px solid #555",
              background: "#222",
              color: "#fff",
            }}
          />
          {error && (
            <p style={{ color: "#ff5555", marginBottom: "10px" }}>{error}</p>
          )}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              backgroundColor: "#00cc66",
              color: "#111",
              fontWeight: "700",
              border: "none",
              borderRadius: "6px",
              padding: "10px",
              cursor: "pointer",
            }}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p style={{ marginTop: "14px" }}>
          Don’t have an account?{" "}
          <Link to="/register" style={{ color: "#00ccff" }}>
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
