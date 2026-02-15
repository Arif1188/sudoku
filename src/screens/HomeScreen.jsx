import React from "react";
import { PageWrapper } from "../components/Layout";
import { DIFFICULTIES, PUZZLES_PER_LEVEL } from "../data/config";
import { playSound } from "../utils/sounds";

export default function HomeScreen({ theme, tx, tab, onNavigate, completedPuzzles, dailyStreak, expandedDiff, setExpandedDiff, onStartPuzzle }) {
  const c = theme;
  const totalCompleted = Object.keys(completedPuzzles).length;
  const totalScore = Object.values(completedPuzzles).reduce((a, b) => a + b.score, 0);

  return (
    <PageWrapper theme={c} tx={tx} tab={tab} onNavigate={onNavigate}>
      <div className="fade-in" style={{ padding: "16px 0 12px" }}>
        <h1 style={{ fontSize: 34, fontWeight: 700, margin: 0, letterSpacing: "-0.5px" }}>{tx.appName}</h1>
      </div>

      {/* Daily Challenge Banner */}
      <div
        className="banner-3d gradient-animate fade-in-up"
        onClick={() => { playSound("navigate"); onNavigate("challenges", "daily"); }}
        style={{
          background: "linear-gradient(135deg, #007AFF 0%, #00C6FF 50%, #5AC8FA 100%)",
          backgroundSize: "200% 200%",
          borderRadius: 18, padding: 22, marginBottom: 22,
          cursor: "pointer", position: "relative", overflow: "hidden",
        }}
      >
        <div className="shimmer" style={{ position: "absolute", inset: 0, borderRadius: 18 }} />
        <div style={{ position: "absolute", right: -10, top: -10, fontSize: 72, opacity: 0.15 }}>🎯</div>
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ fontSize: 13, color: "rgba(255,255,255,0.85)", fontWeight: 600, marginBottom: 3 }}>{tx.dailyChallenge}</div>
          <div style={{ fontSize: 24, fontWeight: 800, color: "#fff", marginBottom: 8, letterSpacing: "-0.5px" }}>{tx.today}</div>
          <span style={{ fontSize: 13, color: "rgba(255,255,255,0.9)", fontWeight: 500 }}>🔥 {tx.streak}: {dailyStreak} {tx.days}</span>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 26 }}>
        {[
          { label: tx.completed, value: totalCompleted, icon: "✅" },
          { label: tx.totalScore, value: totalScore.toLocaleString(), icon: "⭐" },
          { label: tx.winRate, value: totalCompleted > 0 ? "100%" : "—", icon: "📊" },
        ].map((s, i) => (
          <div key={i} className="stat-card fade-in-up" style={{
            background: c.sf, borderRadius: 16, padding: "16px 8px", textAlign: "center",
            border: `0.5px solid ${c.bd}`,
            animationDelay: `${i * 80}ms`, animationFillMode: "backwards",
          }}>
            <div className="float" style={{ fontSize: 20, marginBottom: 6, animationDelay: `${i * 200}ms` }}>{s.icon}</div>
            <div style={{ fontSize: 18, fontWeight: 700, letterSpacing: "-0.3px" }}>{s.value}</div>
            <div style={{ fontSize: 10, color: c.tx2, marginTop: 3, fontWeight: 500 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Difficulty List */}
      <h2 style={{ fontSize: 20, fontWeight: 700, margin: "0 0 14px" }}>{tx.selectDifficulty}</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {Object.entries(DIFFICULTIES).map(([name, cfg], di) => {
          const completed = Array.from({ length: PUZZLES_PER_LEVEL }, (_, i) => completedPuzzles[`${name}-${i}`]).filter(Boolean).length;
          const isExpanded = expandedDiff === name;
          return (
            <div key={name} className="fade-in-up" style={{ animationDelay: `${di * 60}ms`, animationFillMode: "backwards" }}>
              <button
                className="diff-card"
                onClick={() => { playSound("tap"); setExpandedDiff(isExpanded ? null : name); }}
                style={{
                  width: "100%", background: c.sf, border: `0.5px solid ${c.bd}`,
                  borderRadius: 16, padding: "16px 18px", cursor: "pointer",
                  textAlign: "left", display: "flex", alignItems: "center", gap: 14,
                }}
              >
                <div style={{ fontSize: 28, transition: "transform 0.3s ease", transform: isExpanded ? "scale(1.15) rotate(-5deg)" : "scale(1)" }}>{cfg.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ fontSize: 16, fontWeight: 600, color: c.tx }}>{tx[name]}</span>
                    <span style={{ fontSize: 12, color: c.tx2, fontWeight: 500 }}>{completed}/{PUZZLES_PER_LEVEL}</span>
                  </div>
                  <div style={{ marginTop: 8, height: 4, background: c.sfA, borderRadius: 3, overflow: "hidden" }}>
                    <div style={{
                      width: `${(completed / PUZZLES_PER_LEVEL) * 100}%`, height: "100%",
                      background: `linear-gradient(90deg, ${cfg.color}, ${cfg.color}dd)`,
                      borderRadius: 3, transition: "width 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)",
                      boxShadow: completed > 0 ? `0 0 8px ${cfg.color}40` : "none",
                    }} />
                  </div>
                </div>
                <span style={{ color: c.tx2, fontSize: 18, transform: isExpanded ? "rotate(90deg)" : "none", transition: "transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)" }}>›</span>
              </button>

              {isExpanded && (
                <div className="fade-in" style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 8, padding: "12px 4px" }}>
                  {Array.from({ length: PUZZLES_PER_LEVEL }, (_, i) => {
                    const done = completedPuzzles[`${name}-${i}`];
                    return (
                      <button key={i} className="puzzle-btn pop-in"
                        onClick={() => { playSound("start"); onStartPuzzle(name, i); }}
                        style={{
                          background: done ? `linear-gradient(135deg, ${cfg.color}, ${cfg.color}cc)` : c.sfA,
                          color: done ? "#fff" : c.tx, border: "none",
                          borderRadius: 12, padding: "14px 0", cursor: "pointer",
                          fontSize: 15, fontWeight: 600, position: "relative",
                          animationDelay: `${i * 40}ms`, animationFillMode: "backwards",
                          boxShadow: done ? `0 3px 10px ${cfg.color}30` : "none",
                        }}
                      >
                        {i + 1}
                        {done && <div style={{ fontSize: 8, position: "absolute", top: 3, right: 5 }}>⭐</div>}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </PageWrapper>
  );
}
