/**
 * Sound Engine - Web Audio API synthesized sounds
 * No external audio files needed!
 */

let audioCtx = null;

function getCtx() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

function playTone(freq, duration, type = 'sine', volume = 0.15, delay = 0) {
  try {
    const ctx = getCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime + delay);
    gain.gain.setValueAtTime(0, ctx.currentTime + delay);
    gain.gain.linearRampToValueAtTime(volume, ctx.currentTime + delay + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(ctx.currentTime + delay);
    osc.stop(ctx.currentTime + delay + duration);
  } catch (e) {
    // Silently fail if audio not available
  }
}

function playNoise(duration, volume = 0.05) {
  try {
    const ctx = getCtx();
    const bufferSize = ctx.sampleRate * duration;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.5;
    }
    const source = ctx.createBufferSource();
    source.buffer = buffer;
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(volume, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    const filter = ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.value = 2000;
    source.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    source.start();
  } catch (e) {}
}

export const sounds = {
  // Tap / button press - soft click
  tap() {
    playTone(800, 0.06, 'sine', 0.08);
    playNoise(0.03, 0.02);
  },

  // Select a cell on the board
  cellSelect() {
    playTone(600, 0.08, 'sine', 0.06);
  },

  // Place a correct number
  correct() {
    playTone(523, 0.12, 'sine', 0.12);
    playTone(659, 0.12, 'sine', 0.12, 0.06);
    playTone(784, 0.15, 'sine', 0.1, 0.12);
  },

  // Place a wrong number
  error() {
    playTone(200, 0.15, 'sawtooth', 0.1);
    playTone(180, 0.2, 'sawtooth', 0.08, 0.08);
  },

  // Use a hint
  hint() {
    playTone(880, 0.1, 'sine', 0.1);
    playTone(1100, 0.1, 'sine', 0.08, 0.08);
    playTone(1320, 0.15, 'sine', 0.06, 0.16);
  },

  // Toggle notes mode
  noteToggle() {
    playTone(1000, 0.05, 'sine', 0.06);
    playTone(1200, 0.05, 'sine', 0.06, 0.04);
  },

  // Place a note number
  notePlace() {
    playTone(1200, 0.04, 'sine', 0.04);
  },

  // Erase / undo
  erase() {
    playTone(400, 0.08, 'triangle', 0.06);
    playTone(300, 0.1, 'triangle', 0.04, 0.05);
  },

  // Toggle switch (settings)
  toggle() {
    playTone(700, 0.06, 'sine', 0.06);
    playTone(900, 0.06, 'sine', 0.06, 0.04);
  },

  // Navigation / screen change
  navigate() {
    playTone(500, 0.06, 'sine', 0.05);
    playTone(650, 0.08, 'sine', 0.05, 0.04);
  },

  // Complete a number (all 9 placed)
  numberComplete() {
    playTone(523, 0.1, 'sine', 0.1);
    playTone(659, 0.1, 'sine', 0.1, 0.07);
    playTone(784, 0.1, 'sine', 0.1, 0.14);
    playTone(1047, 0.2, 'sine', 0.12, 0.21);
  },

  // Puzzle complete - victory fanfare
  victory() {
    const notes = [523, 587, 659, 784, 880, 1047];
    notes.forEach((freq, i) => {
      playTone(freq, 0.2, 'sine', 0.12, i * 0.08);
    });
    setTimeout(() => {
      playTone(1047, 0.4, 'sine', 0.15);
      playTone(1319, 0.4, 'sine', 0.12, 0.05);
      playTone(1568, 0.5, 'sine', 0.1, 0.1);
    }, 500);
  },

  // Game over
  gameOver() {
    playTone(400, 0.2, 'sawtooth', 0.08);
    playTone(350, 0.2, 'sawtooth', 0.07, 0.15);
    playTone(300, 0.3, 'sawtooth', 0.06, 0.3);
    playTone(200, 0.5, 'sawtooth', 0.05, 0.45);
  },

  // Pause
  pause() {
    playTone(600, 0.1, 'sine', 0.06);
    playTone(400, 0.15, 'sine', 0.04, 0.08);
  },

  // Resume
  resume() {
    playTone(400, 0.1, 'sine', 0.06);
    playTone(600, 0.1, 'sine', 0.06, 0.08);
  },

  // Start game
  start() {
    playTone(440, 0.1, 'sine', 0.08);
    playTone(554, 0.1, 'sine', 0.08, 0.06);
    playTone(659, 0.12, 'sine', 0.1, 0.12);
  },

  // Daily streak
  streak() {
    const n = [523, 659, 784, 1047];
    n.forEach((f, i) => playTone(f, 0.15, 'sine', 0.08, i * 0.1));
  },
};

// Create a wrapper that checks settings
let soundEnabled = true;

export function setSoundEnabled(enabled) {
  soundEnabled = enabled;
}

export function playSound(name) {
  if (soundEnabled && sounds[name]) {
    sounds[name]();
  }
}
