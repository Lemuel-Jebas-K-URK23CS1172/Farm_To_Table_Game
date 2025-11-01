import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axios.post(
        "https://farmtotablegameserver-production.up.railway.app/api/auth/login",
        form
      );
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/game");
    } catch (err) {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(145deg, #072a2a, #041f1f)",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 400,
          padding: "40px",
          backgroundColor: "rgba(255, 255, 255, 0.08)",
          borderRadius: 16,
          boxShadow: "0 0 20px rgba(0,255,200,0.2)",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: 20, color: "#00ffc6" }}>Login</h2>
        <form onSubmit={handleSubmit}>
          <label>Email</label>
          <input name="email" type="email" onChange={handleChange} required />
          <label style={{ marginTop: 10 }}>Password</label>
          <input name="password" type="password" onChange={handleChange} required />

          {error && (
            <div style={{ color: "#ffb3b3", marginTop: 8, textAlign: "center" }}>{error}</div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              marginTop: 16,
              backgroundColor: "#00ffc3",
              border: "none",
              borderRadius: 10,
              color: "#042a29",
              padding: "10px 0",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p style={{ marginTop: 12, textAlign: "center", color: "rgba(255,255,255,0.7)" }}>
          Don’t have an account?{" "}
          <Link to="/register" style={{ color: "#00bfa6", fontWeight: 700 }}>
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
