// src/pages/Home.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div style={{ textAlign: "center", color: "#fff", marginTop: "100px" }}>
      <h1>Welcome to Farm to Table Rescue</h1>
      <div style={{ marginTop: "20px" }}>
        <Link to="/login" style={{ marginRight: "20px", color: "#4ade80" }}>
          Login
        </Link>
        <Link to="/register" style={{ color: "#60a5fa" }}>
          Register
        </Link>
      </div>
    </div>
  );
}
