// client/src/pages/Register.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [initError, setInitError] = useState(""); // if render fails
  // small debug flag so we can show stack traces
  const DEBUG = true;

  useEffect(() => {
    // Helpful startup log
    try {
      console.log("[RegisterPage] mounted");
    } catch (err) {
      console.error("[RegisterPage] mount error", err);
      setInitError(String(err));
    }
  }, []);

  const onChange = (e) => {
    setError("");
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));
  };

  const validate = () => {
    if (!form.name || !form.email || !form.password || !form.confirm) {
      return "Please fill all fields.";
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(form.email)) return "Please enter a valid email address.";
    if (form.password.length < 6) return "Password must be at least 6 characters.";
    if (form.password !== form.confirm) return "Passwords do not match.";
    return null;
  };

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const v = validate();
      if (v) {
        setError(v);
        return;
      }
      setLoading(true);

      // Try/catch around axios so we don't throw and blank the page
      let res;
      try {
        res = await axios.post("/api/auth/register", {
          name: form.name,
          email: form.email,
          password: form.password,
        });
      } catch (axiosErr) {
        // show server response error if available
        const serverMsg =
          axiosErr?.response?.data?.msg ||
          axiosErr?.response?.data?.error ||
          axiosErr?.response?.data?.message;
        const message = serverMsg || axiosErr.message || "Network / server error";
        console.error("[Register] server error:", axiosErr);
        setError(message);
        return;
      }

      // success path
      const token = res?.data?.token;
      if (token) {
        localStorage.setItem("token", token);
      }
      // you may want to set auth context here
      navigate("/dashboard");
    } catch (err) {
      console.error("[Register] unexpected error", err);
      setError("Unexpected error. See console for details.");
      if (DEBUG) setInitError(String(err.stack || err));
    } finally {
      setLoading(false);
    }
  };

  // If the component's initial render had a throw, show it
  if (initError) {
    return (
      <div style={{ padding: 24, color: "#fff", background: "#111", minHeight: "100vh" }}>
        <h2 style={{ color: "#ff6666" }}>Register component failed to render</h2>
        <pre style={{ whiteSpace: "pre-wrap", color: "#f0f0f0" }}>{initError}</pre>
        <p>Check the browser console and the terminal running the dev server for more.</p>
      </div>
    );
  }

  // Normal form UI
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
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))",
          borderRadius: 12,
          padding: "28px 28px",
          boxShadow: "0 10px 40px rgba(0,0,0,0.6)",
          border: "1px solid rgba(255,255,255,0.03)",
        }}
      >
        <div style={{ display: "flex", gap: 24, alignItems: "center", marginBottom: 18 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 10,
              background: "linear-gradient(135deg,#34d399,#059669)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 6px 18px rgba(0,0,0,0.5)",
            }}
          >
            <span style={{ fontWeight: 800, color: "#062e1a", fontSize: 24 }}>F</span>
          </div>
          <div>
            <h1 style={{ margin: 0, fontSize: "clamp(20px, 3.2vw, 36px)" }}>Create an account</h1>
            <div style={{ color: "rgba(255,255,255,0.6)", fontSize: "clamp(12px, 1.6vw, 14px)" }}>
              Register and join Farm to Table Rescue.
            </div>
          </div>
        </div>

        <form onSubmit={submit} style={{ marginTop: 8 }}>
          <div style={{ display: "grid", gap: 12 }}>
            <label style={{ fontSize: "0.95rem", color: "rgba(255,255,255,0.9)" }}>
              Full name
              <input
                name="name"
                type="text"
                value={form.name}
                onChange={onChange}
                placeholder="Your full name"
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
                placeholder="At least 6 characters"
                autoComplete="new-password"
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
              Confirm password
              <input
                name="confirm"
                type="password"
                value={form.confirm}
                onChange={onChange}
                placeholder="Re-enter password"
                autoComplete="new-password"
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
                {loading ? "Creating account..." : "Register"}
              </button>

              <div style={{ marginLeft: 6, color: "rgba(255,255,255,0.8)" }}>
                Already have an account?{" "}
                <Link to="/login" style={{ color: "#7dd3fc", fontWeight: 700 }}>
                  Login
                </Link>
              </div>
            </div>
          </div>
        </form>

        <div style={{ marginTop: 18, color: "rgba(255,255,255,0.06)", fontSize: 12 }}>
          By registering you agree to the placeholder terms (you can change this).
        </div>

        {DEBUG && (
          <div style={{ marginTop: 18, color: "rgba(255,255,255,0.2)", fontSize: 12 }}>
            Debug: form state: <pre style={{ whiteSpace: "pre-wrap" }}>{JSON.stringify(form, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
}
