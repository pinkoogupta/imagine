import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

const EXAMPLES = [
  "A lone samurai standing in a neon-lit cyberpunk alley at midnight",
  "Golden hour over a vast Saharan dune, hyper-realistic",
  "An ancient library floating in the clouds, soft mist",
  "A wolf made entirely of northern lights, dark forest background",
];

export default function HomePage() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError("Please enter a prompt first.");
      return;
    }
    setError("");
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE_URL}/api/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: prompt.trim() }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong.");
      }

      navigate("/result", { state: { image: data.image, prompt: data.prompt } });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleGenerate();
    }
  };

  return (
    <div style={styles.page}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.logo}>IMAGINE</div>
        <div style={styles.badge}>SD3 Medium</div>
      </header>

      {/* Hero */}
      <main style={styles.main}>
        <div style={styles.heroText}>
          <h1 style={styles.title}>
            TURN WORDS<br />
            <span style={styles.titleAccent}>INTO VISUALS</span>
          </h1>
          <p style={styles.subtitle}>
            Describe anything. Stable Diffusion 3 brings it to life.
          </p>
        </div>

        {/* Input Area */}
        <div style={styles.inputCard}>
          <label style={styles.inputLabel}>YOUR PROMPT</label>
          <textarea
            style={styles.textarea}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Describe the image you want to create..."
            rows={4}
            disabled={loading}
          />

          {error && <p style={styles.error}>{error}</p>}

          <button
            style={{
              ...styles.generateBtn,
              ...(loading ? styles.generateBtnLoading : {}),
            }}
            onClick={handleGenerate}
            disabled={loading}
          >
            {loading ? (
              <span style={styles.loadingRow}>
                <span style={styles.spinner} />
                Generating... this may take ~20s
              </span>
            ) : (
              "Generate Image →"
            )}
          </button>
        </div>

        {/* Example prompts */}
        <div style={styles.examplesSection}>
          <p style={styles.examplesLabel}>TRY AN EXAMPLE</p>
          <div style={styles.examplesGrid}>
            {EXAMPLES.map((ex, i) => (
              <button
                key={i}
                style={styles.exampleChip}
                onClick={() => setPrompt(ex)}
                disabled={loading}
              >
                {ex}
              </button>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer style={styles.footer}>
        Powered by Stability AI · Stable Diffusion 3 Medium
      </footer>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    background: "#0a0a0a",
    backgroundImage:
      "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(232,201,122,0.08) 0%, transparent 70%)",
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "24px 40px",
    borderBottom: "1px solid #1e1e1e",
  },
  logo: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: "28px",
    letterSpacing: "6px",
    color: "#e8c97a",
  },
  badge: {
    fontSize: "11px",
    fontWeight: 500,
    letterSpacing: "2px",
    color: "#888880",
    border: "1px solid #2a2a2a",
    padding: "5px 12px",
    borderRadius: "20px",
    textTransform: "uppercase",
  },
  main: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "60px 24px 40px",
    gap: "48px",
  },
  heroText: {
    textAlign: "center",
  },
  title: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: "clamp(52px, 10vw, 96px)",
    lineHeight: 0.95,
    letterSpacing: "4px",
    color: "#f0ede8",
    marginBottom: "16px",
  },
  titleAccent: {
    color: "#e8c97a",
  },
  subtitle: {
    fontSize: "17px",
    color: "#888880",
    fontWeight: 300,
    letterSpacing: "0.5px",
  },
  inputCard: {
    width: "100%",
    maxWidth: "680px",
    background: "#111111",
    border: "1px solid #2a2a2a",
    borderRadius: "8px",
    padding: "28px",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  inputLabel: {
    fontSize: "10px",
    fontWeight: 600,
    letterSpacing: "3px",
    color: "#888880",
  },
  textarea: {
    width: "100%",
    background: "#0a0a0a",
    border: "1px solid #2a2a2a",
    borderRadius: "4px",
    color: "#f0ede8",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "15px",
    fontWeight: 300,
    lineHeight: 1.6,
    padding: "14px 16px",
    resize: "vertical",
    outline: "none",
    transition: "border-color 0.2s",
  },
  error: {
    fontSize: "13px",
    color: "#e07070",
    letterSpacing: "0.3px",
  },
  generateBtn: {
    width: "100%",
    padding: "16px",
    background: "#e8c97a",
    color: "#0a0a0a",
    border: "none",
    borderRadius: "4px",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "15px",
    fontWeight: 600,
    letterSpacing: "1px",
    transition: "background 0.2s, opacity 0.2s",
  },
  generateBtnLoading: {
    background: "#b89a4a",
    opacity: 0.8,
    cursor: "not-allowed",
  },
  loadingRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
  },
  spinner: {
    width: "16px",
    height: "16px",
    border: "2px solid rgba(0,0,0,0.3)",
    borderTop: "2px solid #0a0a0a",
    borderRadius: "50%",
    animation: "spin 0.8s linear infinite",
    display: "inline-block",
  },
  examplesSection: {
    width: "100%",
    maxWidth: "680px",
  },
  examplesLabel: {
    fontSize: "10px",
    fontWeight: 600,
    letterSpacing: "3px",
    color: "#888880",
    marginBottom: "14px",
  },
  examplesGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "10px",
  },
  exampleChip: {
    background: "#111111",
    border: "1px solid #2a2a2a",
    borderRadius: "4px",
    color: "#888880",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "12px",
    fontWeight: 300,
    padding: "12px 14px",
    textAlign: "left",
    lineHeight: 1.4,
    transition: "border-color 0.2s, color 0.2s",
    cursor: "pointer",
  },
  footer: {
    textAlign: "center",
    padding: "20px",
    fontSize: "12px",
    color: "#3a3a3a",
    borderTop: "1px solid #1a1a1a",
    letterSpacing: "0.5px",
  },
};
