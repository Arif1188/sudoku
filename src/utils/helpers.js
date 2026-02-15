export const formatTime = (seconds) => {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
};

export const FONT = "-apple-system, 'SF Pro Display', 'Helvetica Neue', 'Segoe UI', sans-serif";
export const FONT_MONO = "'SF Mono', 'Menlo', 'Consolas', monospace";
