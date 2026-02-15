import React from "react";
import { playSound } from "../utils/sounds";
import { FONT } from "../utils/helpers";

export default function ActionButtons({ onUndo, onToggleNotes, onHint, onErase, noteMode, hintsLeft, historyLength, theme, tx, disabled, darkMode }) {
  const c = theme;
  const buttons = [
    { label: tx.undo, icon: "↩", action: () => { playSound("erase"); onUndo(); }, isDisabled: historyLength === 0 },
    { label: tx.notes, icon: "✏️", action: () => { playSound("noteToggle"); onToggleNotes(); }, active: noteMode },
    { label: tx.hint, icon: "💡", action: () => { playSound("hint"); onHint(); }, isDisabled: hintsLeft <= 0 },
    { label: tx.erase, icon: "🗑", action: () => { playSound("erase"); onErase(); } },
  ];

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }}>
      {buttons.map((btn, i) => (
        <button
          key={i}
          className={`action-btn-3d ${darkMode ? "dark" : ""}`}
          onClick={() => !disabled && !btn.isDisabled && btn.action()}
          disabled={btn.isDisabled || disabled}
          style={{
            display: "flex", flexDirection: "column",
            alignItems: "center", gap: 4,
            background: btn.active ? c.acS : c.sf,
            border: btn.active ? `2px solid ${c.ac}` : "2px solid transparent",
            borderRadius: 14,
            padding: "12px 6px",
            cursor: btn.isDisabled || disabled ? "default" : "pointer",
            fontFamily: FONT,
            fontSize: 20,
            color: btn.isDisabled ? c.tx2 : c.tx,
            opacity: btn.isDisabled ? 0.35 : 1,
            transition: "all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}
        >
          {btn.icon}
          <span style={{
            fontSize: 10, fontWeight: 600,
            color: btn.active ? c.ac : c.tx2,
          }}>{btn.label}</span>
        </button>
      ))}
    </div>
  );
}
