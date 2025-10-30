import { Link } from "react-router-dom";


// client/src/pages/Home.jsx
export default function Home() {
  return (
    <Link to="/login">Login</Link>
<Link to="/register">Register</Link>
    <div
      style={{
        minHeight: "100vh",
        background: "#0f0f10",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "1rem",
      }}
    >
      <h1 style={{ fontSize: "clamp(24px, 4vw, 40px)" }}>Welcome to Farm to Table Rescue!</h1>
      <p>Choose an option below to get started:</p>
      <div style={{ display: "flex", gap: "12px" }}>
        <a
          href="/login"
          style={{
            padding: "10px 20px",
            borderRadius: 8,
            background: "#3b82f6",
            color: "#fff",
            textDecoration: "none",
            fontWeight: 600,
          }}
        >
          🔑 Login
        </a>
        <a
          href="/register"
          style={{
            padding: "10px 20px",
            borderRadius: 8,
            background: "#22c55e",
            color: "#fff",
            textDecoration: "none",
            fontWeight: 600,
          }}
        >
          🧾 Register
        </a>
      </div>
    </div>
  );
}


