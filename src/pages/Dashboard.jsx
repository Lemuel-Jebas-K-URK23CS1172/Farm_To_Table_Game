// src/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      const token = localStorage.getItem("token");

      if (!storedUser || !token) {
        console.warn("⚠️ No user or token found, redirecting to login");
        navigate("/login");
        return;
      }

      setUser(JSON.parse(storedUser));
    } catch (err) {
      console.error("Error loading user:", err);
      navigate("/login");
    }
  }, [navigate]);

  if (!user) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "linear-gradient(135deg, #0f766e, #042f2e)",
          color: "white",
          fontFamily: "Poppins, sans-serif",
        }}
      >
        <h2>Loading dashboard...</h2>
      </div>
    );
  }

  // ✅ Load your game here
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "black",
        color: "white",
        fontFamily: "Poppins, sans-serif",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <header
        style={{
          fontSize: "2rem",
          fontWeight: 700,
          marginBottom: "10px",
          textAlign: "center",
        }}
      >
        🌾 Farm to Table Rescue
      </header>

      <p style={{ marginBottom: "20px" }}>Welcome, {user.name}!</p>

      <div
        id="game-container"
        style={{
          width: "90%",
          maxWidth: "800px",
          height: "450px",
          border: "2px solid limegreen",
          borderRadius: "12px",
          backgroundImage: "url('https://wallpapercave.com/wp/wp5128415.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
          overflow: "hidden",
          boxShadow: "0 0 15px rgba(0,255,0,0.4)",
        }}
      >
        {/* You can insert your <GameCanvas /> or other component here */}
        <p
          style={{
            position: "absolute",
            bottom: "20px",
            left: "20px",
            background: "rgba(0,0,0,0.6)",
            padding: "10px 14px",
            borderRadius: "8px",
          }}
        >
          🧑‍🌾 Player: {user.name} <br />
          🧮 Score: 0 <br />
          🕒 Time: 0s
        </p>
      </div>

      <div style={{ marginTop: "20px" }}>
        <button
          onClick={() => {
            localStorage.clear();
            navigate("/login");
          }}
          style={{
            background: "#f87171",
            color: "white",
            border: "none",
            borderRadius: "8px",
            padding: "10px 16px",
            cursor: "pointer",
            fontWeight: 600,
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}
