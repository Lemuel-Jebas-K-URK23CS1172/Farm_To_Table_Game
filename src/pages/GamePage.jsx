// src/pages/GamePage.jsx
import React, { useState } from "react";
import GameCanvas from "../components/GameCanvas.jsx";
import { useNavigate } from "react-router-dom";

export default function GamePage() {
  const navigate = useNavigate();
  const [restartKey, setRestartKey] = useState(0); // trigger re-render

  const handleRestart = () => {
    // re-render canvas by changing key
    setRestartKey((prev) => prev + 1);
  };

  const handleBackHome = () => {
    navigate("/login");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom right, #042b2a, #0ea5a3)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        padding: "1rem",
      }}
    >
      {/* Game container */}
      <div
        style={{
          position: "relative",
          width: "90vw",
          height: "80vh",
          maxWidth: "1000px",
          maxHeight: "700px",
          background: "rgba(255,255,255,0.1)",
          borderRadius: "16px",
          boxShadow: "0 0 20px rgba(0,0,0,0.3)",
          overflow: "hidden",
        }}
      >
        <GameCanvas key={restartKey} />

        {/* Overlay buttons */}
        <div
          style={{
            position: "absolute",
            bottom: "10px",
            right: "10px",
            display: "flex",
            gap: "10px",
          }}
        >
          <button
            onClick={handleRestart}
            style={{
              background: "#7dd3fc",
              color: "#042b2a",
              border: "none",
              padding: "10px 18px",
              borderRadius: "8px",
              fontWeight: 600,
              cursor: "pointer",
              transition: "0.2s",
            }}
            onMouseOver={(e) => (e.currentTarget.style.background = "#bae6fd")}
            onMouseOut={(e) => (e.currentTarget.style.background = "#7dd3fc")}
          >
            Restart
          </button>

          <button
            onClick={handleBackHome}
            style={{
              background: "#fca5a5",
              color: "#042b2a",
              border: "none",
              padding: "10px 18px",
              borderRadius: "8px",
              fontWeight: 600,
              cursor: "pointer",
              transition: "0.2s",
            }}
            onMouseOver={(e) => (e.currentTarget.style.background = "#fecaca")}
            onMouseOut={(e) => (e.currentTarget.style.background = "#fca5a5")}
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
