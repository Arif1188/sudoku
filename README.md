# 🧩 Sudoku App

A full-featured Sudoku game built with React + Vite. Ready to deploy to Netlify.

## Features

- 🎮 6 difficulty levels (Easy → Extreme), 10 puzzles each
- 🌙 Light / Dark mode
- 🌍 3 languages: Русский, English, O'zbekcha
- 🎯 Daily challenges with streak tracking
- ⏱️ Timer, score, mistakes counter
- 💡 Hints (3 per game)
- ✏️ Notes/pencil mode
- ↩️ Undo support
- ⚙️ Full iOS-style settings page
- 📱 Mobile-first responsive design

## Quick Start

```bash
# Install dependencies
npm install

# Run locally
npm run dev

# Build for production
npm run build
```

## Deploy to Netlify

### Option 1: Drag & Drop
1. Run `npm run build`
2. Go to [app.netlify.com/drop](https://app.netlify.com/drop)
3. Drag the `dist` folder

### Option 2: Connect Git
1. Push to GitHub
2. Connect repo in Netlify dashboard
3. Build command: `npm run build`
4. Publish directory: `dist`

## Project Structure

```
src/
├── components/       # Reusable UI components
│   ├── ActionButtons.jsx
│   ├── Board.jsx
│   ├── Layout.jsx
│   ├── NumberPad.jsx
│   └── Toggle.jsx
├── data/             # Config & translations
│   ├── config.js
│   ├── themes.js
│   └── translations.js
├── hooks/            # Custom React hooks
│   └── useTimer.js
├── screens/          # App screens
│   ├── DailyScreen.jsx
│   ├── GameScreen.jsx
│   ├── HomeScreen.jsx
│   ├── ProfileScreen.jsx
│   ├── ResultScreens.jsx
│   └── SettingsScreen.jsx
├── styles/           # Global CSS
│   └── global.css
├── utils/            # Sudoku engine & helpers
│   ├── helpers.js
│   └── sudoku.js
├── App.jsx           # Main app (state + routing)
└── main.jsx          # Entry point
```
