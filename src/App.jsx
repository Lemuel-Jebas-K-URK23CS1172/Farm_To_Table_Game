// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import GamePage from "./pages/GamePage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/game" element={<GamePage />} />
      <Route path="*" element={<h1 style={{ color: "white" }}>404 - Not Found</h1>} />
    </Routes>
  );
}
