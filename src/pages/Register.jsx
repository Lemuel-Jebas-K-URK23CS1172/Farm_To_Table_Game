// client/src/pages/Register.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

export default function Register() {
  const navigate = useNavigate();

  // Form state
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const DEBUG = false; // set to true if you want to see debug info

  // Handle form input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await API.post("/auth/register", form); // ✅ POST method
      console.log("✅ Registered user:", res.data);
      alert("✅ Registration successful!");

      // Save token and user data
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      navigate("/dashboard");
    } catch (err) {
      console.error("❌ Register error:", err.response?.data || err.message);
      setError(
        err.response?.data?.msg ||
          "Registration failed. Please check your inputs and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #0f766e, #042f2e)",
        color: "white",
        fontFamily: "Poppins, sans-serif",
        padding: 20,
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 420,
          background: "rgba(255, 255, 255, 0.06)",
          borderRadius: 16,
          padding: 28,
          boxShadow: "0 4px 25px rgba(0,0,0,0.3)",
        }}
      >
        <h1 style={{ textAlign: "center", marginBottom: 12 }}>Register</h1>
        <p style={{ textAlign: "center", color: "rgba(255,255,255,0.7)" }}>
          Create your account to start playing!
        </p>

        <form onSubmit={handleSubmit}>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <label>
              Name
              <input
                name="name"
                placeholder="Enter your name"
                value={form.name}
                onChange={handleChange}
                required
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  borderRadius: 8,
                  border: "none",
                  outline: "none",
                  background: "rgba(255,255,255,0.1)",
                  color: "white",
                  marginTop: 6,
                }}
              />
            </label>

            <label>
              Email
              <input
                name="email"
                type="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={handleChange}
                required
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  borderRadius: 8,
                  border: "none",
                  outline: "none",
                  background: "rgba(255,255,255,0.1)",
                  color: "white",
                  marginTop: 6,
                }}
              />
            </label>

            <label>
              Password
              <input
                name="password"
                type="password"
                placeholder="Enter your password"
                value={form.password}
                onChange={handleChange}
                required
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  borderRadius: 8,
                  border: "none",
                  outline: "none",
                  background: "rgba(255,255,255,0.1)",
                  color: "white",
                  marginTop: 6,
                }}
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

            <div
              style={{
                display: "flex",
                gap: 12,
                alignItems: "center",
                marginTop: 4,
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
              <div
                style={{ marginLeft: 6, color: "rgba(255,255,255,0.8)" }}
              >
                Already have an account?{" "}
                <Link
                  to="/login"
                  style={{ color: "#7dd3fc", fontWeight: 700 }}
                >
                  Login
                </Link>
              </div>
            </div>
          </div>
        </form>

        <div
          style={{
            marginTop: 18,
            color: "rgba(255,255,255,0.06)",
            fontSize: 12,
          }}
        >
          By registering, you agree to the placeholder terms (you can change this).
        </div>

        {DEBUG && (
          <div
            style={{
              marginTop: 18,
              color: "rgba(255,255,255,0.2)",
              fontSize: 12,
            }}
          >
            Debug: form state:
            <pre style={{ whiteSpace: "pre-wrap" }}>
              {JSON.stringify(form, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
