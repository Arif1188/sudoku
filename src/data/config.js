export const DIFFICULTIES = {
  Easy:    { clues: 45, color: "#34C759", icon: "🌱" },
  Medium:  { clues: 38, color: "#FFCC00", icon: "🌿" },
  Hard:    { clues: 32, color: "#FF9500", icon: "🔥" },
  Expert:  { clues: 28, color: "#FF3B30", icon: "⚡" },
  Master:  { clues: 25, color: "#AF52DE", icon: "🏆" },
  Extreme: { clues: 22, color: "#FF2D55", icon: "💀" },
};

export const PUZZLES_PER_LEVEL = 10;

export const SCORE_POINTS = {
  Easy: 10,
  Medium: 20,
  Hard: 35,
  Expert: 50,
  Master: 75,
  Extreme: 100,
};

export const DEFAULT_SETTINGS = {
  sounds: true,
  vibration: true,
  autoLock: false,
  timer: true,
  score: true,
  scoreAnim: true,
  statsMsg: true,
  smartHints: true,
  numInput: false,
  mistakeLimit: true,
  autoCheck: true,
  hlDup: true,
  hlArea: true,
  hlSame: true,
  hideUsed: true,
  autoNotes: true,
  hlCombo: true,
};
