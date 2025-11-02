// src/pages/AdminDashboard.jsx
import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { API } from "../services/api";

export default function AdminDashboard() {
  const { user } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [scores, setScores] = useState([]);
  const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  navigate("/");
};


  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersRes = await API.get("/admin/users");
        const scoresRes = await API.get("/admin/scores");
        setUsers(usersRes.data);
        setScores(scoresRes.data);
      } catch (err) {
        console.error("Error loading admin data:", err.message);
      }
    };
    fetchData();
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "radial-gradient(circle at top, #001b1b 0%, #000 100%)",
        padding: "60px 0",
        color: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "90%",
          maxWidth: "1200px",
          backgroundColor: "#0d0d0d",
          border: "2px solid #00ffcc",
          borderRadius: "15px",
          padding: "30px 40px",
          boxShadow: "0 0 25px rgba(0,255,255,0.3)",
        }}
      >
        <h1 style={{ textAlign: "center", color: "#00ffcc", marginBottom: "30px" }}>
          🛠️ Admin Dashboard
        </h1>

        {/* USERS TABLE */}
        <section style={{ marginBottom: "40px" }}>
          <h2 style={{ color: "#00ffaa", marginBottom: "10px" }}>👥 Users</h2>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              backgroundColor: "#1a1a1a",
              borderRadius: "8px",
              overflow: "hidden",
            }}
          >
            <thead>
              <tr style={{ backgroundColor: "#222" }}>
                <th style={thStyle}>Name</th>
                <th style={thStyle}>Email</th>
                <th style={thStyle}>Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id}>
                  <td style={tdStyle}>{u.name}</td>
                  <td style={tdStyle}>{u.email}</td>
                  <td style={tdStyle}>{u.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* SCORES TABLE */}
        <section>
          <h2 style={{ color: "#ffcc00", marginBottom: "10px" }}>🏆 Scores</h2>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              backgroundColor: "#1a1a1a",
              borderRadius: "8px",
              overflow: "hidden",
            }}
          >
            <thead>
              <tr style={{ backgroundColor: "#222" }}>
                <th style={thStyle}>Player</th>
                <th style={thStyle}>Score</th>
                <th style={thStyle}>Level</th>
                <th style={thStyle}>Created</th>
              </tr>
            </thead>
            <tbody>
              {scores.map((s) => (
                <tr key={s._id}>
                  <td style={tdStyle}>{s.user?.name || "Unknown"}</td>
                  <td style={tdStyle}>{s.score}</td>
                  <td style={tdStyle}>{s.level}</td>
                  <td style={tdStyle}>
                    {new Date(s.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </div>
  );
}

const thStyle = {
  padding: "12px 10px",
  borderBottom: "1px solid #333",
  textAlign: "left",
  color: "#00ffcc",
  fontWeight: "600",
};

const tdStyle = {
  padding: "10px",
  borderBottom: "1px solid #333",
  color: "#ddd",
};
