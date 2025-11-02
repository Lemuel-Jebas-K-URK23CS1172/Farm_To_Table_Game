// src/pages/GamePage.jsx
import React from "react";
import GameCanvas from "../components/GameCanvas";

export default function GamePage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#111",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1 style={{ color: "#00cc66", marginBottom: "20px" }}>🌾 Farm To Table Game</h1>
      <GameCanvas />
    </div>
  );
}

