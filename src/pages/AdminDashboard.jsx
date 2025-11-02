// src/pages/AdminDashboard.jsx
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { API } from "../services/api";

export default function AdminDashboard() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [scores, setScores] = useState([]);

  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/");
      return;
    }

    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = { Authorization: `Bearer ${token}` };

        const [userRes, scoreRes] = await Promise.all([
          API.get("/admin/users", { headers }),
          API.get("/admin/scores", { headers }),
        ]);

        setUsers(userRes.data);
        setScores(scoreRes.data);
      } catch (err) {
        console.error("❌ Error loading admin data:", err.message);
      }
    };

    fetchData();
  }, [user, navigate]);

  return (
    <div style={{ padding: "30px", backgroundColor: "#111", color: "white", minHeight: "100vh" }}>
      <h1 style={{ color: "#00ff88", textAlign: "center" }}>🛠️ Admin Dashboard</h1>

      <section style={{ marginTop: "30px" }}>
        <h2>👥 Users</h2>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ borderBottom: "1px solid gray", padding: "8px" }}>Name</th>
              <th style={{ borderBottom: "1px solid gray", padding: "8px" }}>Email</th>
              <th style={{ borderBottom: "1px solid gray", padding: "8px" }}>Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id}>
                <td style={{ borderBottom: "1px solid #333", padding: "6px" }}>{u.name}</td>
                <td style={{ borderBottom: "1px solid #333", padding: "6px" }}>{u.email}</td>
                <td style={{ borderBottom: "1px solid #333", padding: "6px" }}>{u.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section style={{ marginTop: "40px" }}>
        <h2>🏆 Scores</h2>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ borderBottom: "1px solid gray", padding: "8px" }}>Player</th>
              <th style={{ borderBottom: "1px solid gray", padding: "8px" }}>Score</th>
              <th style={{ borderBottom: "1px solid gray", padding: "8px" }}>Level</th>
            </tr>
          </thead>
          <tbody>
            {scores.map((s) => (
              <tr key={s._id}>
                <td style={{ borderBottom: "1px solid #333", padding: "6px" }}>
                  {s.user?.name || "Unknown"}
                </td>
                <td style={{ borderBottom: "1px solid #333", padding: "6px" }}>{s.score}</td>
                <td style={{ borderBottom: "1px solid #333", padding: "6px" }}>{s.level}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
