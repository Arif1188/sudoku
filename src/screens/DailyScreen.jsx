import React from "react";
import { PageWrapper, NavBar, GroupCard } from "../components/Layout";
import { formatTime, FONT_MONO } from "../utils/helpers";
import { playSound } from "../utils/sounds";

export default function DailyScreen({ theme, tx, tab, onNavigate, dailyStreak, dailyCompleted, onStartDaily, lang }) {
  const c = theme;
  const today = new Date();
  const dayOfWeek = (today.getDay() + 6) % 7;

  return (
    <PageWrapper theme={c} tx={tx} tab={tab} onNavigate={onNavigate}>
      <NavBar title={tx.challenges} theme={c} />

      <div className="bounce-in" style={{
        background: "linear-gradient(135deg, #FF6B35 0%, #FF2D55 50%, #FF3B30 100%)",
        backgroundSize: "200% 200%",
        borderRadius: 20, padding: "28px 20px", marginBottom: 22, textAlign: "center",
        boxShadow: "0 8px 30px rgba(255,59,48,0.25)",
      }}>
        <div className="float" style={{ fontSize: 48, marginBottom: 8 }}>🔥</div>
        <div style={{ fontSize: 42, fontWeight: 800, color: "#fff", letterSpacing: "-1px" }}>{dailyStreak}</div>
        <div style={{ fontSize: 14, color: "rgba(255,255,255,0.85)", fontWeight: 500 }}>{tx.streak} ({tx.days})</div>
      </div>

      <GroupCard theme={c}>
        <div style={{ padding: 16 }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 8, textAlign: "center" }}>
            {tx.weekDays.map((d, i) => (
              <div key={d} className="fade-in-up" style={{ animationDelay: `${i * 50}ms`, animationFillMode: "backwards" }}>
                <div style={{ fontSize: 11, color: c.tx2, marginBottom: 6, fontWeight: 500 }}>{d}</div>
                <div style={{
                  width: 38, height: 38, borderRadius: 19, margin: "0 auto",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 14, fontWeight: 600,
                  background: i < dayOfWeek ? c.ac : i === dayOfWeek ? (dailyCompleted ? c.ac : c.acS) : "transparent",
                  color: i <= dayOfWeek && (i < dayOfWeek || dailyCompleted) ? "#fff" : i === dayOfWeek ? c.ac : c.tx2,
                  border: i === dayOfWeek && !dailyCompleted ? `2px solid ${c.ac}` : "none",
                  boxShadow: i < dayOfWeek || (i === dayOfWeek && dailyCompleted) ? `0 2px 8px ${c.ac}30` : "none",
                  transition: "all 0.3s ease",
                }}>
                  {i < dayOfWeek || (i === dayOfWeek && dailyCompleted) ? "✓" : today.getDate() - dayOfWeek + i}
                </div>
              </div>
            ))}
          </div>
        </div>
      </GroupCard>

      <GroupCard theme={c}>
        <div style={{ padding: 18 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
            <div>
              <div style={{ fontSize: 18, fontWeight: 700 }}>{tx.today}</div>
              <div style={{ fontSize: 13, color: c.tx2, marginTop: 2 }}>{tx.Hard} — {today.toLocaleDateString(tx.locale)}</div>
            </div>
            <div className="float" style={{ fontSize: 36 }}>🔥</div>
          </div>
          <button
            className="banner-3d"
            onClick={() => { if (!dailyCompleted) { playSound("start"); onStartDaily(); } }}
            style={{
              width: "100%", background: dailyCompleted ? c.ok : c.gr,
              color: "#fff", border: "none", borderRadius: 14, padding: 16,
              fontSize: 17, fontWeight: 700, cursor: dailyCompleted ? "default" : "pointer",
              opacity: dailyCompleted ? 0.85 : 1,
              boxShadow: dailyCompleted ? `0 4px 15px ${c.ok}40` : `0 4px 15px rgba(0,122,255,0.3)`,
            }}
          >
            {dailyCompleted ? `✓ ${tx.completed}` : tx.play}
          </button>
        </div>
      </GroupCard>

      <div style={{ fontSize: 13, fontWeight: 600, color: c.tx2, margin: "0 0 10px", textTransform: "uppercase", letterSpacing: 0.5 }}>{tx.pastChallenges}</div>
      <GroupCard theme={c}>
        {[1,2,3,4,5].map((d, i) => {
          const date = new Date(); date.setDate(date.getDate() - d);
          return (
            <div key={d} className="fade-in-up" style={{ animationDelay: `${i * 60}ms`, animationFillMode: "backwards" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "13px 16px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{
                    width: 34, height: 34, borderRadius: 17, background: c.ok,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 14, color: "#fff",
                    boxShadow: `0 2px 8px ${c.ok}30`,
                  }}>✓</div>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 500 }}>{date.toLocaleDateString(tx.locale)}</div>
                    <div style={{ fontSize: 12, color: c.tx2 }}>{tx.Hard}</div>
                  </div>
                </div>
                <span style={{ fontSize: 14, color: c.tx2, fontFamily: FONT_MONO }}>{formatTime(300 + d * 47)}</span>
              </div>
              {i < 4 && <div style={{ height: 0.5, background: c.sep, marginLeft: 62 }} />}
            </div>
          );
        })}
      </GroupCard>
    </PageWrapper>
  );
}
