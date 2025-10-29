// client/src/pages/GamePage.jsx
import React from "react";
import GameCanvas from "../game/GameCanvas";

export default function GamePage() {
  return (
    <div style={{ padding: 16, minHeight: "100vh", background: "#0b0b0b" }}>
      <h1 style={{ color: "#fff", textAlign: "center", marginBottom: 12 }}>Farm to Table Rescue</h1>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <GameCanvas />
      </div>
    </div>
  );
}
