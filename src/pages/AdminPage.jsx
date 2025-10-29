import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminPage() {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    axios.get("/api/scores")
      .then((res) => setScores(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h2>🏆 Leaderboard</h2>
      <ul>
        {scores.map((s) => (
          <li key={s._id}>
            {s.user?.name} - {s.score} pts (Level {s.level})
          </li>
        ))}
      </ul>
    </div>
  );
}
