import React from "react";
import { playSound } from "../utils/sounds";

export default function Toggle({ value, onChange, theme }) {
  return (
    <button
      onClick={() => { playSound("toggle"); onChange(!value); }}
      style={{
        width: 51, height: 31, borderRadius: 16,
        background: value ? theme.tog : theme.togOff,
        border: "none", cursor: "pointer", padding: 2,
        display: "flex", alignItems: "center",
        transition: "background 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        flexShrink: 0,
        boxShadow: value 
          ? "0 2px 8px rgba(52,199,89,0.3), inset 0 0 0 1px rgba(255,255,255,0.1)" 
          : "inset 0 1px 3px rgba(0,0,0,0.1)",
      }}
    >
      <div style={{
        width: 27, height: 27, borderRadius: 14, background: "#FFFFFF",
        boxShadow: "0 2px 6px rgba(0,0,0,0.2), 0 1px 2px rgba(0,0,0,0.1)",
        transition: "transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
        transform: value ? "translateX(20px)" : "translateX(0)",
      }} />
    </button>
  );
}
