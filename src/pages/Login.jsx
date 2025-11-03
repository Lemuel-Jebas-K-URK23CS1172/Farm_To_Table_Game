import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { API } from "../services/api";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await API.post("/auth/login", form);
      login(res.data.user, res.data.token);

      // Redirect based on role
      if (res.data.user.role === "admin") navigate("/admin");
      else navigate("/game");
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#000",
        color: "#00ff99",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      <div
        style={{
          background: "rgba(20, 20, 20, 0.9)",
          border: "2px solid #00ff99",
          borderRadius: "12px",
          padding: "40px",
          width: "90%",
          maxWidth: "400px",
          textAlign: "center",
          boxShadow: "0 0 25px rgba(0, 255, 150, 0.4)",
        }}
      >
        <h2 style={{ marginBottom: "20px", color: "#00ff99" }}>🌾 Farm to Table Login</h2>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "15px" }}>
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
                border: "1px solid #00ff99",
                backgroundColor: "#111",
                color: "#fff",
              }}
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
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
                border: "1px solid #00ff99",
                backgroundColor: "#111",
                color: "#fff",
              }}
            />
          </div>

          {error && (
            <p style={{ color: "#ff5555", marginBottom: "10px" }}>
              ⚠️ {error}
            </p>
          )}

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "10px",
              backgroundColor: "#00ff99",
              color: "#000",
              fontWeight: "bold",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#00cc7a")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#00ff99")}
          >
            Login
          </button>
        </form>

        <p style={{ marginTop: "15px", fontSize: "14px", color: "#aaa" }}>
          Don’t have an account?{" "}
          <Link
            to="/register"
            style={{ color: "#00ff99", textDecoration: "none", fontWeight: "bold" }}
          >
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}
