// src/pages/GamePage.jsx
import React, { useEffect, useState } from "react";
import GameCanvas from "../components/GameCanvas.jsx";

export default function GamePage() {
  const [viewportSize, setViewportSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  // Dynamically update on window resize
  useEffect(() => {
    const handleResize = () => {
      setViewportSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const gameWidth = Math.min(viewportSize.width * 0.9, 1280);
  const gameHeight = (gameWidth * 9) / 16;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        background: "radial-gradient(circle at center, #001818 0%, #000000 100%)",
      }}
    >
      <div
        style={{
          width: gameWidth,
          height: gameHeight,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          border: "3px solid #00ffcc",
          borderRadius: "12px",
          backgroundColor: "#000",
          boxShadow: "0 0 25px rgba(0,255,200,0.3)",
        }}
      >
        <GameCanvas width={gameWidth} height={gameHeight} />
      </div>
    </div>
  );
}
