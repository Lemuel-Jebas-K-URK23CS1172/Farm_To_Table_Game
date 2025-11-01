// client/src/pages/Login.jsx
// redeploy test
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await API.post("/auth/login", form); // ✅ POST method
      console.log("✅ Logged in user:", res.data);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      navigate("/game", { replace: true });
 // redirect to game page
    } catch (err) {
      console.error("❌ Login error:", err.response?.data || err.message);
      setError(err.response?.data?.msg || "Login failed. Please try again.");
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
        <h1 style={{ textAlign: "center", marginBottom: 12 }}>Login</h1>
        <form onSubmit={handleSubmit}>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
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

            <div style={{ textAlign: "center", marginTop: 8 }}>
              Don’t have an account?{" "}
              <Link
                to="/register"
                style={{ color: "#7dd3fc", fontWeight: 700 }}
              >
                Register
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}


