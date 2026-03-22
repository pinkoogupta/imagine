import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function ResultPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { image, prompt } = location.state || {};
  const [copied, setCopied] = useState(false);

  // If user lands here directly without state, redirect home
  if (!image) {
    navigate("/");
    return null;
  }

  const handleNewImage = () => navigate("/");

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = image;
    link.download = `imagine-${Date.now()}.png`;
    link.click();
  };

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleTryAgain = () => {
    navigate("/", { state: { prefill: prompt } });
  };

  return (
    <div style={styles.page}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.logo} onClick={handleNewImage}>
          IMAGINE
        </div>
        <button style={styles.newChatBtn} onClick={handleNewImage}>
          + New Image
        </button>
      </header>

      <main style={styles.main}>
        {/* Prompt pill */}
        <div style={styles.promptRow}>
          <div style={styles.promptPill}>
            <span style={styles.promptLabel}>PROMPT</span>
            <span style={styles.promptText}>{prompt}</span>
            <button style={styles.copyBtn} onClick={handleCopyPrompt}>
              {copied ? "✓ Copied" : "Copy"}
            </button>
          </div>
        </div>

        {/* Image */}
        <div style={styles.imageWrapper}>
          <img src={image} alt={prompt} style={styles.image} />
          <div style={styles.imageOverlay}>
            <span style={styles.overlayTag}>SD3 · MEDIUM</span>
          </div>
        </div>

        {/* Action buttons */}
        <div style={styles.actions}>
          <button style={styles.downloadBtn} onClick={handleDownload}>
            ↓ Download PNG
          </button>
          <button style={styles.tryAgainBtn} onClick={handleTryAgain}>
            ↺ Refine Prompt
          </button>
          <button style={styles.newBtn} onClick={handleNewImage}>
            + New Image
          </button>
        </div>
      </main>

      <footer style={styles.footer}>
        Powered by Stability AI · Stable Diffusion 3 Medium
      </footer>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    background: "#0a0a0a",
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
    cursor: "pointer",
  },
  newChatBtn: {
    background: "transparent",
    border: "1px solid #2a2a2a",
    borderRadius: "4px",
    color: "#f0ede8",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "13px",
    fontWeight: 500,
    padding: "9px 18px",
    letterSpacing: "0.5px",
    transition: "border-color 0.2s",
  },
  main: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "40px 24px",
    gap: "28px",
    animation: "fadeUp 0.5s ease forwards",
  },
  promptRow: {
    width: "100%",
    maxWidth: "760px",
  },
  promptPill: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    background: "#111111",
    border: "1px solid #2a2a2a",
    borderRadius: "6px",
    padding: "12px 18px",
    flexWrap: "wrap",
  },
  promptLabel: {
    fontSize: "9px",
    fontWeight: 700,
    letterSpacing: "3px",
    color: "#e8c97a",
    flexShrink: 0,
  },
  promptText: {
    flex: 1,
    fontSize: "13px",
    color: "#888880",
    fontWeight: 300,
    fontStyle: "italic",
    lineHeight: 1.5,
  },
  copyBtn: {
    background: "transparent",
    border: "1px solid #2a2a2a",
    borderRadius: "3px",
    color: "#888880",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "11px",
    padding: "5px 10px",
    flexShrink: 0,
    transition: "color 0.2s",
  },
  imageWrapper: {
    position: "relative",
    width: "100%",
    maxWidth: "760px",
    borderRadius: "8px",
    overflow: "hidden",
    border: "1px solid #2a2a2a",
    boxShadow: "0 40px 80px rgba(0,0,0,0.6)",
  },
  image: {
    width: "100%",
    display: "block",
    objectFit: "contain",
  },
  imageOverlay: {
    position: "absolute",
    bottom: "14px",
    right: "14px",
  },
  overlayTag: {
    background: "rgba(10,10,10,0.75)",
    backdropFilter: "blur(6px)",
    border: "1px solid #2a2a2a",
    borderRadius: "3px",
    fontSize: "9px",
    fontWeight: 700,
    letterSpacing: "2px",
    color: "#e8c97a",
    padding: "5px 10px",
  },
  actions: {
    display: "flex",
    gap: "12px",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  downloadBtn: {
    background: "#e8c97a",
    border: "none",
    borderRadius: "4px",
    color: "#0a0a0a",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "13px",
    fontWeight: 600,
    padding: "12px 24px",
    letterSpacing: "0.5px",
    transition: "background 0.2s",
  },
  tryAgainBtn: {
    background: "transparent",
    border: "1px solid #2a2a2a",
    borderRadius: "4px",
    color: "#f0ede8",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "13px",
    fontWeight: 500,
    padding: "12px 24px",
    letterSpacing: "0.5px",
    transition: "border-color 0.2s",
  },
  newBtn: {
    background: "transparent",
    border: "1px solid #2a2a2a",
    borderRadius: "4px",
    color: "#888880",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "13px",
    fontWeight: 500,
    padding: "12px 24px",
    letterSpacing: "0.5px",
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
