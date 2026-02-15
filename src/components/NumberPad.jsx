import React from "react";
import { playSound } from "../utils/sounds";
import { FONT } from "../utils/helpers";

export default function NumberPad({ onInput, numberCounts, settings, theme, disabled, darkMode }) {
  const c = theme;

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(9, 1fr)", gap: 6, marginBottom: 10 }}>
      {[1,2,3,4,5,6,7,8,9].map((n, i) => {
        const isComplete = settings.hideUsed && numberCounts[n] >= 9;
        return (
          <button
            key={n}
            className={`num-btn-3d ${darkMode ? "dark" : ""}`}
            onClick={() => {
              if (!disabled && !isComplete) {
                playSound("tap");
                onInput(n);
              }
            }}
            style={{
              aspectRatio: "0.8",
              display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center",
              background: c.sf,
              borderRadius: 12,
              cursor: isComplete || disabled ? "default" : "pointer",
              fontSize: 20, fontWeight: 600, fontFamily: FONT,
              color: isComplete ? c.tx2 : c.tx,
              opacity: isComplete ? 0.3 : 1,
              padding: 0,
              animationDelay: `${i * 30}ms`,
            }}
          >
            {n}
            {settings.hideUsed && (
              <span style={{ fontSize: 8, color: c.tx2, marginTop: 1 }}>
                {9 - (numberCounts[n] || 0)}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
