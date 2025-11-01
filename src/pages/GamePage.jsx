// src/pages/GamePage.jsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GameCanvas from "../components/GameCanvas.jsx";
 // adjust the path if needed

export default function GamePage() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0f766e, #042f2e)",
        color: "white",
        fontFamily: "Poppins, sans-serif",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
      }}
    >
      <h1 style={{ fontSize: "2rem", marginBottom: 20 }}>🌾 Farm to Table Rescue</h1>

      <div
        style={{
          width: "90%",
          maxWidth: 800,
          height: 450,
          border: "2px solid limegreen",
          borderRadius: 12,
          overflow: "hidden",
          backgroundColor: "black",
        }}
      >
        <GameCanvas />
      </div>

      <button
        onClick={handleLogout}
        style={{
          marginTop: 20,
          background: "#f87171",
          color: "white",
          border: "none",
          borderRadius: 8,
          padding: "10px 16px",
          cursor: "pointer",
          fontWeight: 600,
        }}
      >
        Logout
      </button>
    </div>
  );
}

