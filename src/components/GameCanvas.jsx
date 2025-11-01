// client/src/game/GameCanvas.jsx
import { useRef, useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import axios from "axios";
import backgroundImg from "./game/assets/background.png";
import farmerImg from "./game/assets/farmer.png";
import fruitImg from "./game/assets/apple.png";
import monsterImg from "./game/assets/monster.png";

export default function GameCanvas() {
  const canvasRef = useRef(null);
  const restartBtnRef = useRef(null);
  const backBtnRef = useRef(null);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // UI states
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameOver, setGameOver] = useState(false);

  // Game state
  const farmer = useRef({ x: 380, y: 180, width: 32, height: 32, speed: 200 });
  const fruits = useRef([]);
  const monsters = useRef([]);
  const keys = useRef({});
  const timerRef = useRef(30);
  const lastTime = useRef(0);
  const frameId = useRef(null);
  const gameActive = useRef(false);

  // Logical base resolution
  const baseWidth = 800;
  const baseHeight = 400;

  // Sprites
  const background = new Image();
  background.src = backgroundImg;
  const farmerSprite = new Image();
  farmerSprite.src = farmerImg;
  const fruitSprite = new Image();
  fruitSprite.src = fruitImg;
  const monsterSprite = new Image();
  monsterSprite.src = monsterImg;

  // Resize + retina scaling
  const resizeCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const containerWidth = window.innerWidth * 0.8; // larger on 100% zoom
    const containerHeight = window.innerHeight * 0.7;
    const scale = Math.min(containerWidth / baseWidth, containerHeight / baseHeight);
    const pixelRatio = window.devicePixelRatio || 1;

    // set high-res backing store
    canvas.width = Math.round(baseWidth * scale * pixelRatio);
    canvas.height = Math.round(baseHeight * scale * pixelRatio);

    // CSS size for layout
    canvas.style.width = `${Math.round(baseWidth * scale)}px`;
    canvas.style.height = `${Math.round(baseHeight * scale)}px`;
    canvas.style.maxWidth = "1400px";

    // normalize to base coordinate system
    ctx.setTransform(pixelRatio * scale, 0, 0, pixelRatio * scale, 0, 0);
  };

  useEffect(() => {
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();
    return () => window.removeEventListener("resize", resizeCanvas);
  }, []);

  // Keyboard
  useEffect(() => {
    const handleDown = (e) => {
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) e.preventDefault();
      keys.current[e.key] = true;
    };
    const handleUp = (e) => (keys.current[e.key] = false);
    window.addEventListener("keydown", handleDown);
    window.addEventListener("keyup", handleUp);
    return () => {
      window.removeEventListener("keydown", handleDown);
      window.removeEventListener("keyup", handleUp);
    };
  }, []);

  // Game loop start
  const startGameLoop = () => {
    const ctx = canvasRef.current.getContext("2d");
    const loop = (timestamp) => {
      if (!lastTime.current) lastTime.current = timestamp;
      const dt = (timestamp - lastTime.current) / 1000;
      lastTime.current = timestamp;
      if (gameActive.current) {
        update(dt);
        render(ctx);
        frameId.current = requestAnimationFrame(loop);
      }
    };
    gameActive.current = true;
    frameId.current = requestAnimationFrame(loop);
  };

  useEffect(() => {
    startGameLoop();
    return () => cancelAnimationFrame(frameId.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [level]);

  const update = (dt) => {
    if (!gameActive.current) return;

    // Movement
    if (keys.current["ArrowRight"]) farmer.current.x += farmer.current.speed * dt;
    if (keys.current["ArrowLeft"]) farmer.current.x -= farmer.current.speed * dt;
    if (keys.current["ArrowUp"]) farmer.current.y -= farmer.current.speed * dt;
    if (keys.current["ArrowDown"]) farmer.current.y += farmer.current.speed * dt;

    // Bounds
    farmer.current.x = Math.max(0, Math.min(farmer.current.x, baseWidth - farmer.current.width));
    farmer.current.y = Math.max(0, Math.min(farmer.current.y, baseHeight - farmer.current.height));

    // Timer
    timerRef.current -= dt;
    if (timerRef.current <= 0) nextLevel();

    // Spawn fruits (avoid top & bottom edges)
    if (Math.random() < 0.02 * dt * 60 * level) {
      fruits.current.push({
        x: Math.random() * (baseWidth - 30),
        y: Math.random() * (baseHeight - 50) + 20,
        rotten: false,
        lifetime: 5 - level * 0.3,
        age: 0,
      });
    }

    // Spawn monsters
    if (Math.random() < 0.004 * dt * 60 * level && monsters.current.length < 5 + level) {
      monsters.current.push({
        x: Math.random() * (baseWidth - 40),
        y: Math.random() * (baseHeight - 40) + 10,
        width: 28,
        height: 28,
        dirX: Math.random() > 0.5 ? 1 : -1,
        dirY: Math.random() > 0.5 ? 1 : -1,
        speed: 60 + level * 10,
      });
    }

    // Fruit logic
    fruits.current.forEach((f, i) => {
      f.age += dt;
      if (f.age > f.lifetime) f.rotten = true;
      if (
        farmer.current.x < f.x + 20 &&
        farmer.current.x + farmer.current.width > f.x &&
        farmer.current.y < f.y + 20 &&
        farmer.current.y + farmer.current.height > f.y
      ) {
        if (!f.rotten) setScore((s) => s + 10);
        fruits.current.splice(i, 1);
      }
    });

    // Monster logic
    monsters.current.forEach((m) => {
      m.x += m.dirX * m.speed * dt;
      m.y += m.dirY * m.speed * dt;
      if (m.x <= 0 || m.x >= baseWidth - m.width) m.dirX *= -1;
      if (m.y <= 0 || m.y >= baseHeight - m.height) m.dirY *= -1;

      if (
        farmer.current.x < m.x + m.width &&
        farmer.current.x + farmer.current.width > m.x &&
        farmer.current.y < m.y + m.height &&
        farmer.current.y + farmer.current.height > m.y
      ) {
        triggerGameOver();
      }
    });

    setTimeLeft(Math.ceil(timerRef.current));
  };

  const render = (ctx) => {
    ctx.clearRect(0, 0, baseWidth, baseHeight);
    ctx.drawImage(background, 0, 0, baseWidth, baseHeight);

    fruits.current.forEach((f) => {
      ctx.drawImage(fruitSprite, f.x, f.y, 20, 20);
      if (f.rotten) {
        ctx.globalAlpha = 0.6;
        ctx.fillStyle = "brown";
        ctx.fillRect(f.x, f.y, 20, 20);
        ctx.globalAlpha = 1;
      }
    });

    monsters.current.forEach((m) => {
      ctx.drawImage(monsterSprite, m.x, m.y, 30, 30);
    });

    ctx.drawImage(farmerSprite, farmer.current.x, farmer.current.y, farmer.current.width, farmer.current.height);
  };

  // Helpers
  const triggerGameOver = () => {
    if (!gameActive.current) return;
    gameActive.current = false;
    cancelAnimationFrame(frameId.current);
    setGameOver(true);
    saveScore();

    // focus restart button shortly after modal opens
    setTimeout(() => {
      if (restartBtnRef.current) restartBtnRef.current.focus();
    }, 80);
  };

  const nextLevel = async () => {
    try {
      await axios.post("/api/scores", { score, level });
      setLevel((l) => l + 1);
      setScore(0);
      setTimeLeft(30);
      timerRef.current = 30;
      fruits.current = [];
      monsters.current = [];
      lastTime.current = 0;
    } catch (err) {
      console.error("Score save failed:", err.message);
    }
  };

  const saveScore = async () => {
    try {
      await axios.post("/api/scores", { score, level });
    } catch (err) {
      console.error("Error saving on game over:", err.message);
    }
  };

  const restartGame = () => {
    setGameOver(false);
    setScore(0);
    setLevel(1);
    setTimeLeft(30);
    timerRef.current = 30;
    fruits.current = [];
    monsters.current = [];
    farmer.current.x = 380;
    farmer.current.y = 180;
    lastTime.current = 0;
    cancelAnimationFrame(frameId.current);
    gameActive.current = true;
    startGameLoop();
  };

  // JSX
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        minHeight: "100vh",
        width: "100vw",
        backgroundColor: "#111",
        color: "#fff",
        textAlign: "center",
        overflowX: "hidden",
        paddingTop: "20px",
        paddingBottom: "40px",
      }}
    >
      {/* Canvas */}
      <canvas
        ref={canvasRef}
        aria-label="Game canvas"
        role="img"
        style={{
          border: "2px solid #00cc00",
          borderRadius: "8px",
          backgroundColor: "#dfffd8",
          boxShadow: "0 0 25px rgba(0,0,0,0.5)",
          display: "block",
          margin: "0 auto",
        }}
      />

      {/* HUD */}
      <div
        style={{
          marginTop: "18px",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          gap: "15px",
          backgroundColor: "rgba(0,0,0,0.6)",
          borderRadius: "10px",
          padding: "10px 20px",
          boxShadow: "0 0 10px rgba(0,0,0,0.4)",
          fontSize: "clamp(14px, 1.6vw, 22px)",
        }}
      >
        <span>👤 <strong>{user?.name || "Guest"}</strong></span>
        <span>🧺 <strong>Score: {score}</strong></span>
        <span>🌾 <strong>Level: {level}</strong></span>
        <span>⏳ <strong>Time: {timeLeft}s</strong></span>
      </div>

      {/* GAME OVER MODAL (fixed overlay) */}
      {gameOver && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Game over dialog"
          style={{
            position: "fixed",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
            backgroundColor: "rgba(0,0,0,0.5)",
            padding: "20px",
          }}
        >
          <div
            style={{
              width: "min(720px, 92vw)",
              maxWidth: "720px",
              background: "#0b0b0b",
              borderRadius: "12px",
              padding: "28px",
              boxShadow: "0 10px 40px rgba(0,0,0,0.6), 0 0 40px rgba(255,0,0,0.12)",
              border: "1px solid rgba(255,0,0,0.12)",
              textAlign: "center",
            }}
          >
            <h2 style={{ color: "#ff6666", fontWeight: 800, fontSize: "clamp(20px, 2.6vw, 34px)", margin: 0 }}>
              💀 GAME OVER!
            </h2>
            <p style={{ marginTop: "14px", fontSize: "clamp(16px, 1.6vw, 20px)" }}>
              Your final score: <strong>{score}</strong>
            </p>

            <div style={{ marginTop: "20px", display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
              <button
                ref={restartBtnRef}
                onClick={restartGame}
                style={{
                  padding: "10px 22px",
                  background: "#28a745",
                  border: "none",
                  borderRadius: "8px",
                  color: "white",
                  cursor: "pointer",
                  fontSize: "clamp(14px, 1.6vw, 18px)",
                  fontWeight: 700,
                }}
              >
                🔁 Restart
              </button>

              <button
                ref={backBtnRef}
                onClick={() => navigate("/")}
                style={{
                  padding: "10px 22px",
                  background: "#007bff",
                  border: "none",
                  borderRadius: "8px",
                  color: "white",
                  cursor: "pointer",
                  fontSize: "clamp(14px, 1.6vw, 18px)",
                  fontWeight: 700,
                }}
              >
                🏠 Back to Menu
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

