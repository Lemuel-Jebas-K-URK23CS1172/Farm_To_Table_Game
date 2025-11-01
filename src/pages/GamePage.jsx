// src/pages/GamePage.jsx
import React from "react";
import GameCanvas from "../components/GameCanvas.jsx";

export default function GamePage() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#121212",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          width: "90%",
          maxWidth: "1000px",
          aspectRatio: "16/9",
          border: "3px solid #00ff66",
          borderRadius: "12px",
          overflow: "hidden",
          boxShadow: "0 0 20px rgba(0,255,100,0.3)",
        }}
      >
        <GameCanvas />
      </div>
    </div>
  );
}
