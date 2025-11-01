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
        height: "100vh",
        width: "100vw",
        backgroundColor: "#101010",
        margin: 0,
        padding: 0,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "min(90vw, 1280px)", // dynamic width: 90% of viewport, max 1280px
          height: "calc(min(90vw, 1280px) * 9 / 16)", // maintains 16:9 ratio
          border: "3px solid #00ff88",
          borderRadius: "12px",
          overflow: "hidden",
          boxShadow: "0 0 25px rgba(0,255,100,0.3)",
          backgroundColor: "#000",
        }}
      >
        <GameCanvas />
      </div>
    </div>
  );
}
