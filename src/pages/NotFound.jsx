// client/src/pages/NotFound.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
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
      <h1 style={{ fontSize: "clamp(24px, 4vw, 40px)" }}>404 — Page Not Found</h1>
      <p style={{ color: "rgba(255,255,255,0.7)" }}>
        The page you are looking for doesn’t exist.
      </p>
      <Link
        to="/"
        style={{
          padding: "10px 20px",
          borderRadius: 8,
          background: "#22c55e",
          color: "#fff",
          textDecoration: "none",
          fontWeight: 600,
        }}
      >
        🏠 Go Back Home
      </Link>
    </div>
  );
}
