import React, { useEffect } from "react";
import { PageWrapper, NavBar, Confetti } from "../components/Layout";
import { formatTime, FONT, FONT_MONO } from "../utils/helpers";
import { playSound } from "../utils/sounds";

export function GameOverScreen({ theme, tx, mistakes, maxMistakes, time, score, onRetry, onBack }) {
  const c = theme;
  useEffect(() => { playSound("gameOver"); }, []);

  return (
    <PageWrapper theme={c} tx={tx} showNav={false}>
      <NavBar title={tx.gameOver} showBack onBack={onBack} theme={c} />
      <div style={{ textAlign: "center", padding: "30px 20px" }}>
        <div className="bounce-in" style={{ fontSize: 72, marginBottom: 16 }}>😔</div>
        <h2 className="fade-in-up" style={{ fontSize: 26, fontWeight: 800, margin: "0 0 6px", letterSpacing: "-0.5px" }}>{tx.tooManyMistakes}</h2>
        <p className="fade-in-up" style={{ color: c.tx2, fontSize: 14, margin: "0 0 28px", animationDelay: "0.1s", animationFillMode: "backwards" }}>
          {mistakes}/{maxMistakes} {tx.mistakes.toLowerCase()}
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 30 }}>
          {[{ l: tx.time, v: formatTime(time), mono: true }, { l: tx.score, v: score }].map((s, i) => (
            <div key={i} className="stat-card fade-in-up" style={{
              background: c.sf, borderRadius: 16, padding: 18, border: `0.5px solid ${c.bd}`,
              animationDelay: `${0.2 + i * 0.1}s`, animationFillMode: "backwards",
            }}>
              <div style={{ fontSize: 12, color: c.tx2, marginBottom: 4, fontWeight: 500 }}>{s.l}</div>
              <div style={{ fontSize: 22, fontWeight: 700, fontFamily: s.mono ? FONT_MONO : FONT }}>{s.v}</div>
            </div>
          ))}
        </div>
        <button className="banner-3d fade-in-up" onClick={() => { playSound("start"); onRetry(); }}
          style={{
            width: "100%", background: c.gr, color: "#fff", border: "none",
            borderRadius: 14, padding: 17, fontSize: 17, fontWeight: 700,
            cursor: "pointer", fontFamily: FONT, marginBottom: 12,
            animationDelay: "0.4s", animationFillMode: "backwards",
          }}>{tx.tryAgain}</button>
        <button className="fade-in-up" onClick={() => { playSound("navigate"); onBack(); }}
          style={{
            width: "100%", background: c.sf, color: c.tx, border: `0.5px solid ${c.bd}`,
            borderRadius: 14, padding: 15, fontSize: 15, fontWeight: 600,
            cursor: "pointer", fontFamily: FONT,
            animationDelay: "0.5s", animationFillMode: "backwards",
          }}>{tx.backToLevels}</button>
      </div>
    </PageWrapper>
  );
}

export function CompleteScreen({ theme, tx, difficulty, puzzleIndex, score, time, mistakes, maxMistakes, hasNext, onNext, onBack }) {
  const c = theme;
  const stars = mistakes === 0 ? 3 : mistakes === 1 ? 2 : 1;

  useEffect(() => { playSound("victory"); }, []);

  return (
    <PageWrapper theme={c} tx={tx} showNav={false}>
      <Confetti />
      <NavBar title={tx.puzzleComplete} showBack onBack={onBack} theme={c} />
      <div style={{ textAlign: "center", padding: "24px 20px" }}>
        <div className="bounce-in" style={{ fontSize: 60, marginBottom: 12 }}>🎉</div>
        <h2 className="fade-in-up" style={{ fontSize: 26, fontWeight: 800, margin: "0 0 4px", letterSpacing: "-0.5px" }}>{tx.congratulations}</h2>
        <p className="fade-in-up" style={{ color: c.tx2, fontSize: 14, margin: "0 0 22px", animationDelay: "0.1s", animationFillMode: "backwards" }}>
          {tx[difficulty]} #{puzzleIndex + 1}
        </p>

        {/* Stars with staggered reveal */}
        <div style={{ fontSize: 40, marginBottom: 24, letterSpacing: 8, display: "flex", justifyContent: "center", gap: 6 }}>
          {[1, 2, 3].map((s) => (
            <span key={s} className={s <= stars ? "star-reveal" : ""}
              style={{
                opacity: s <= stars ? 1 : 0.15,
                animationDelay: `${0.3 + s * 0.2}s`,
                animationFillMode: "backwards",
                display: "inline-block",
                filter: s <= stars ? "drop-shadow(0 2px 6px rgba(255,204,0,0.5))" : "none",
              }}>⭐</span>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 30 }}>
          {[
            { l: tx.score, v: score },
            { l: tx.time, v: formatTime(time), mono: true },
            { l: tx.mistakes, v: `${mistakes}/${maxMistakes}` },
          ].map((s, i) => (
            <div key={i} className="stat-card pop-in" style={{
              background: c.sf, borderRadius: 14, padding: "14px 6px",
              border: `0.5px solid ${c.bd}`,
              animationDelay: `${0.8 + i * 0.1}s`, animationFillMode: "backwards",
            }}>
              <div style={{ fontSize: 10, color: c.tx2, marginBottom: 3, fontWeight: 600, textTransform: "uppercase" }}>{s.l}</div>
              <div style={{ fontSize: 20, fontWeight: 700, fontFamily: s.mono ? FONT_MONO : FONT }}>{s.v}</div>
            </div>
          ))}
        </div>

        {hasNext ? (
          <button className="banner-3d fade-in-up" onClick={() => { playSound("start"); onNext(); }}
            style={{
              width: "100%", background: c.gr, color: "#fff", border: "none",
              borderRadius: 14, padding: 17, fontSize: 17, fontWeight: 700,
              cursor: "pointer", fontFamily: FONT, marginBottom: 12,
              boxShadow: "0 6px 20px rgba(0,122,255,0.3)",
              animationDelay: "1.1s", animationFillMode: "backwards",
            }}>{tx.nextPuzzle}</button>
        ) : (
          <div className="pop-in" style={{
            background: c.acS, borderRadius: 14, padding: 18, marginBottom: 12,
            border: `1px solid ${c.ac}30`,
            animationDelay: "1.1s", animationFillMode: "backwards",
          }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: c.ac }}>🏆 {tx.allComplete}</div>
          </div>
        )}
        <button className="fade-in-up" onClick={() => { playSound("navigate"); onBack(); }}
          style={{
            width: "100%", background: c.sf, color: c.tx, border: `0.5px solid ${c.bd}`,
            borderRadius: 14, padding: 15, fontSize: 15, fontWeight: 600,
            cursor: "pointer", fontFamily: FONT,
            animationDelay: "1.2s", animationFillMode: "backwards",
          }}>{tx.backToLevels}</button>
      </div>
    </PageWrapper>
  );
}
