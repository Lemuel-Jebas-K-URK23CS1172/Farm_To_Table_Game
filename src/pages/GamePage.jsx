import React from "react";
import GameCanvas from "../components/GameCanvas.jsx";

export default function GamePage() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
        background: "radial-gradient(circle at center, #031d1c 0%, #000000 100%)",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          width: "90vw",
          maxWidth: "1280px",
          aspectRatio: "16/9",
          borderRadius: "12px",
          overflow: "hidden",
          border: "3px solid #00ffcc",
          boxShadow: "0 0 25px rgba(0,255,200,0.2)",
          backgroundColor: "#000",
        }}
      >
        <GameCanvas />
      </div>
    </div>
  );
}
