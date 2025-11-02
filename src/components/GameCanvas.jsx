import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { API } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function AdminPage() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/"); // redirect non-admins
      return;
    }

    const fetchData = async () => {
      try {
        const [userRes, scoreRes] = await Promise.all([
          API.get("/admin/users"),
          API.get("/admin/scores"),
        ]);
        setUsers(userRes.data);
        setScores(scoreRes.data);
      } catch (err) {
        console.error("Error loading admin data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user, navigate]);

  if (loading) return <p style={{ color: "white", textAlign: "center" }}>Loading...</p>;

  return (
    <div style={{ backgroundColor: "#111", color: "white", minHeight: "100vh", padding: "20px" }}>
      <h1 style={{ color: "#00ff99", textAlign: "center" }}>Admin Dashboard</h1>

      <section style={{ marginTop: "30px" }}>
        <h2>👥 Users</h2>
        <table style={{ width: "100%", borderCollapse: "collapse", background: "#222" }}>
          <thead>
            <tr style={{ background: "#333" }}>
              <th style={{ padding: "10px" }}>Name</th>
              <th style={{ padding: "10px" }}>Email</th>
              <th style={{ padding: "10px" }}>Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id}>
                <td style={{ padding: "8px" }}>{u.name}</td>
                <td style={{ padding: "8px" }}>{u.email}</td>
                <td style={{ padding: "8px" }}>{u.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section style={{ marginTop: "40px" }}>
        <h2>🏆 Scores</h2>
        <table style={{ width: "100%", borderCollapse: "collapse", background: "#222" }}>
          <thead>
            <tr style={{ background: "#333" }}>
              <th style={{ padding: "10px" }}>Player</th>
              <th style={{ padding: "10px" }}>Score</th>
              <th style={{ padding: "10px" }}>Level</th>
              <th style={{ padding: "10px" }}>Created</th>
              <th style={{ padding: "10px" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {scores.map((s) => (
              <tr key={s._id}>
                <td style={{ padding: "8px" }}>{s.user?.name}</td>
                <td style={{ padding: "8px" }}>{s.score}</td>
                <td style={{ padding: "8px" }}>{s.level}</td>
                <td style={{ padding: "8px" }}>{new Date(s.createdAt).toLocaleString()}</td>
                <td style={{ padding: "8px" }}>
                  <button
                    onClick={async () => {
                      if (window.confirm("Delete this score?")) {
                        await API.delete(`/admin/scores/${s._id}`);
                        setScores((prev) => prev.filter((x) => x._id !== s._id));
                      }
                    }}
                    style={{
                      background: "#ff4444",
                      border: "none",
                      padding: "6px 12px",
                      color: "white",
                      borderRadius: "6px",
                      cursor: "pointer",
                    }}
                  >
                    🗑️ Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
