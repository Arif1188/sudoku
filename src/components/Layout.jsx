import React from "react";
import Toggle from "./Toggle";
import { playSound } from "../utils/sounds";
import { FONT } from "../utils/helpers";

export function Confetti() {
  const colors = ["#FF3B30","#FF9500","#FFCC00","#34C759","#007AFF","#5856D6","#AF52DE","#FF2D55"];
  return (
    <div className="confetti-container">
      {Array.from({ length: 40 }, (_, i) => (
        <div
          key={i}
          className="confetti-piece"
          style={{
            left: `${Math.random() * 100}%`,
            background: colors[i % colors.length],
            width: 6 + Math.random() * 8,
            height: 6 + Math.random() * 8,
            borderRadius: Math.random() > 0.5 ? "50%" : "2px",
            animationDuration: `${1.5 + Math.random() * 2}s`,
            animationDelay: `${Math.random() * 0.5}s`,
          }}
        />
      ))}
    </div>
  );
}

export function GroupCard({ children, theme, className = "" }) {
  return (
    <div
      className={`card-3d ${className}`}
      style={{
        background: theme.sf,
        borderRadius: 14,
        overflow: "hidden",
        marginBottom: 20,
        border: `0.5px solid ${theme.bd}`,
      }}
    >
      {children}
    </div>
  );
}

export function SettingsRow({ label, desc, value, onToggle, isLast, theme }) {
  return (
    <div className="settings-row">
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "12px 16px", minHeight: 44,
      }}>
        <span style={{ flex: 1, fontSize: 16, color: theme.tx, marginRight: 12 }}>{label}</span>
        <Toggle value={value} onChange={onToggle} theme={theme} />
      </div>
      {desc && (
        <div style={{ padding: "0 16px 10px", fontSize: 13, color: theme.tx2, lineHeight: 1.4 }}>{desc}</div>
      )}
      {!isLast && !desc && (
        <div style={{ height: 0.5, background: theme.sep, marginLeft: 16 }} />
      )}
    </div>
  );
}

export function MenuRow({ icon, iconBg, label, onClick, isLast, right, theme }) {
  return (
    <div>
      <button
        className="menu-row"
        onClick={() => { playSound("tap"); onClick(); }}
        style={{
          width: "100%", display: "flex", alignItems: "center",
          padding: "12px 16px", minHeight: 48,
          background: "transparent", border: "none",
          cursor: "pointer", fontFamily: FONT, gap: 14,
        }}
      >
        {icon && (
          <div style={{
            width: 32, height: 32, borderRadius: 8,
            background: iconBg || theme.ac,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 16, color: "#fff", flexShrink: 0,
            boxShadow: `0 2px 6px ${iconBg || theme.ac}40`,
          }}>{icon}</div>
        )}
        <span style={{ flex: 1, fontSize: 16, color: theme.tx, textAlign: "left", fontWeight: 400 }}>{label}</span>
        {right || <span style={{ color: theme.tx2, fontSize: 20, fontWeight: 300 }}>›</span>}
      </button>
      {!isLast && <div style={{ height: 0.5, background: theme.sep, marginLeft: icon ? 62 : 16 }} />}
    </div>
  );
}

export function NavBar({ title, showBack, onBack, theme }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "14px 0 10px", position: "relative", minHeight: 44,
    }}>
      {showBack && (
        <button
          onClick={() => { playSound("navigate"); onBack(); }}
          style={{
            position: "absolute", left: 0, background: "transparent",
            border: "none", cursor: "pointer", fontSize: 17,
            color: theme.ac, fontFamily: FONT, padding: "8px 4px 8px 0",
            display: "flex", alignItems: "center", gap: 2,
          }}
        >
          <span style={{ fontSize: 24, fontWeight: 300 }}>‹</span>
        </button>
      )}
      <span style={{ fontSize: 17, fontWeight: 600 }}>{title}</span>
    </div>
  );
}

export function BottomNav({ tab, onNavigate, theme, tx }) {
  const items = [
    { id: "home", icon: "🏠", label: tx.home, to: "home" },
    { id: "challenges", icon: "🎯", label: tx.challenges, to: "daily" },
    { id: "me", icon: "👤", label: tx.me, to: "profile" },
  ];

  return (
    <div
      className="glass"
      style={{
        position: "fixed", bottom: 0, left: 0, right: 0,
        background: theme.nav,
        borderTop: `0.5px solid ${theme.sep}`,
        display: "flex", justifyContent: "space-around",
        padding: "8px 0 26px", zIndex: 100,
      }}
    >
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => { playSound("navigate"); onNavigate(item.id, item.to); }}
          style={{
            background: "transparent", border: "none", cursor: "pointer",
            display: "flex", flexDirection: "column", alignItems: "center",
            gap: 3, padding: "4px 24px", fontFamily: FONT,
            transition: "transform 0.2s ease",
          }}
        >
          <span style={{
            fontSize: 24, 
            opacity: tab === item.id ? 1 : 0.4,
            transform: tab === item.id ? "scale(1.1)" : "scale(1)",
            transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
            display: "block",
          }}>{item.icon}</span>
          <span style={{
            fontSize: 10, fontWeight: 600,
            color: tab === item.id ? theme.ac : theme.tx2,
            transition: "color 0.3s ease",
          }}>{item.label}</span>
          {/* Active indicator dot */}
          {tab === item.id && (
            <div style={{
              width: 5, height: 5, borderRadius: 3,
              background: theme.ac,
              boxShadow: `0 0 6px ${theme.ac}`,
              marginTop: -1,
            }} />
          )}
        </button>
      ))}
    </div>
  );
}

export function PageWrapper({ children, showNav = true, tab, onNavigate, theme, tx }) {
  return (
    <div style={{
      fontFamily: FONT, background: theme.bg, color: theme.tx,
      minHeight: "100vh",
      transition: "background 0.4s ease, color 0.3s ease",
    }}>
      <div style={{
        width: "100%", maxWidth: 480, margin: "0 auto",
        padding: "0 16px 100px", boxSizing: "border-box",
      }}>{children}</div>
      {showNav && <BottomNav tab={tab} onNavigate={onNavigate} theme={theme} tx={tx} />}
    </div>
  );
}
