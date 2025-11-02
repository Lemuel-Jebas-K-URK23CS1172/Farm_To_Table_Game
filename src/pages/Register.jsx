// src/pages/Register.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { API } from "../api"; // ✅ same path as Login.jsx

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user", // ✅ default role
  });
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
      const res = await API.post("/auth/register", form);
      console.log("✅ Registered user:", res.data);

      navigate("/"); // redirect to login after register
    } catch (err) {
      console.error("❌ Register failed:", err);
      setError("Registration failed. Try again.");
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
          maxWidth: "420px",
          boxShadow: "0 0 25px rgba(0,0,0,0.6)",
          textAlign: "center",
        }}
      >
        <h2 style={{ marginBottom: "20px" }}>🌾 Register Account</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
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
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "14px",
              borderRadius: "6px",
              border: "1px solid #555",
              background: "#222",
              color: "#fff",
            }}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
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
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
        <p style={{ marginTop: "14px" }}>
          Already have an account?{" "}
          <Link to="/" style={{ color: "#00ccff" }}>
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
