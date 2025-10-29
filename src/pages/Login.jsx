// client/src/pages/Login.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export default function LoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onChange = (e) => {
    setError("");
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));
  };

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.email || !form.password) {
      setError("Please fill both email and password.");
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post("/api/auth/login", {
        email: form.email,
        password: form.password,
      });
      // store token (or integrate with your AuthContext)
      const { token, user } = res.data;
      if (token) localStorage.setItem("token", token);
      // example: navigate to dashboard
      navigate("/dashboard");
    } catch (err) {
      setError(
        err?.response?.data?.msg ||
          err?.response?.data?.message ||
          "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#0f0f10",
        color: "#fff",
        padding: "24px",
      }}
    >
      <div
        style={{
          width: "min(920px, 96vw)",
          background: "linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))",
          borderRadius: 12,
          padding: "28px 28px",
          boxShadow: "0 10px 40px rgba(0,0,0,0.6)",
          border: "1px solid rgba(255,255,255,0.03)",
        }}
      >
        <div style={{ display: "flex", gap: 24, alignItems: "center", marginBottom: 18 }}>
          <div style={{
            width: 64, height: 64, borderRadius: 10, background: "linear-gradient(135deg,#34d399,#059669)",
            display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 6px 18px rgba(0,0,0,0.5)"
          }}>
            <span style={{ fontWeight: 800, color: "#062e1a", fontSize: 24 }}>F</span>
          </div>
          <div>
            <h1 style={{ margin: 0, fontSize: "clamp(20px, 3.2vw, 36px)" }}>Welcome back</h1>
            <div style={{ color: "rgba(255,255,255,0.6)", fontSize: "clamp(12px, 1.6vw, 14px)" }}>
              Log in to continue to Farm to Table Rescue
            </div>
          </div>
        </div>

        <form onSubmit={submit} style={{ marginTop: 8 }}>
          <div style={{ display: "grid", gap: 12 }}>
            <label style={{ fontSize: "0.95rem", color: "rgba(255,255,255,0.9)" }}>
              Email
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={onChange}
                placeholder="you@example.com"
                autoComplete="email"
                style={{
                  width: "100%",
                  marginTop: 6,
                  padding: "12px 14px",
                  borderRadius: 8,
                  border: "1px solid rgba(255,255,255,0.08)",
                  background: "rgba(255,255,255,0.02)",
                  color: "#fff",
                  fontSize: "1rem",
                  outline: "none",
                }}
                required
              />
            </label>

            <label style={{ fontSize: "0.95rem", color: "rgba(255,255,255,0.9)" }}>
              Password
              <input
                name="password"
                type="password"
                value={form.password}
                onChange={onChange}
                placeholder="••••••••"
                autoComplete="current-password"
                style={{
                  width: "100%",
                  marginTop: 6,
                  padding: "12px 14px",
                  borderRadius: 8,
                  border: "1px solid rgba(255,255,255,0.08)",
                  background: "rgba(255,255,255,0.02)",
                  color: "#fff",
                  fontSize: "1rem",
                  outline: "none",
                }}
                required
              />
            </label>

            {error && (
              <div
                role="alert"
                style={{
                  color: "#ffb4b4",
                  background: "rgba(255, 50, 50, 0.06)",
                  padding: "10px 12px",
                  borderRadius: 8,
                  border: "1px solid rgba(255,50,50,0.08)",
                }}
              >
                {error}
              </div>
            )}

            <div style={{ display: "flex", gap: 12, alignItems: "center", marginTop: 4 }}>
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
                {loading ? "Logging in..." : "Login"}
              </button>

              <div style={{ marginLeft: 6, color: "rgba(255,255,255,0.8)" }}>
                Need an account?{" "}
                <Link to="/register" style={{ color: "#7dd3fc", fontWeight: 700 }}>
                  Register
                </Link>
              </div>
            </div>
          </div>
        </form>

        <div style={{ marginTop: 18, color: "rgba(255,255,255,0.06)", fontSize: 12 }}>
          Tip: use a test account or register a new user
        </div>
      </div>
    </div>
  );
}
