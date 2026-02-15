import React, { useState, useCallback, useEffect, useMemo } from "react";
import { light, dark } from "./data/themes";
import { TRANSLATIONS } from "./data/translations";
import { DIFFICULTIES, PUZZLES_PER_LEVEL, SCORE_POINTS, DEFAULT_SETTINGS } from "./data/config";
import { generatePuzzle, isBoardComplete, getNumberCounts } from "./utils/sudoku";
import { useTimer } from "./hooks/useTimer";
import { playSound, setSoundEnabled } from "./utils/sounds";

import HomeScreen from "./screens/HomeScreen";
import DailyScreen from "./screens/DailyScreen";
import ProfileScreen from "./screens/ProfileScreen";
import SettingsScreen from "./screens/SettingsScreen";
import GameScreen from "./screens/GameScreen";
import { GameOverScreen, CompleteScreen } from "./screens/ResultScreens";

export default function App() {
  const [lang, setLang] = useState("ru");
  const [darkMode, setDarkMode] = useState(false);
  const [screen, setScreen] = useState("home");
  const [tab, setTab] = useState("home");
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);

  const [difficulty, setDifficulty] = useState(null);
  const [expandedDiff, setExpandedDiff] = useState(null);
  const [puzzleIndex, setPuzzleIndex] = useState(0);
  const [board, setBoard] = useState([]);
  const [solution, setSolution] = useState([]);
  const [initialBoard, setInitialBoard] = useState([]);
  const [selectedCell, setSelectedCell] = useState(null);
  const [mistakes, setMistakes] = useState(0);
  const [score, setScore] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [hintsLeft, setHintsLeft] = useState(3);
  const [noteMode, setNoteMode] = useState(false);
  const [notes, setNotes] = useState({});
  const [completedPuzzles, setCompletedPuzzles] = useState({});
  const [errorCells, setErrorCells] = useState({});
  const [animatingCells, setAnimatingCells] = useState({});
  const [history, setHistory] = useState([]);
  const [dailyStreak] = useState(7);
  const [dailyCompleted, setDailyCompleted] = useState(false);

  const theme = darkMode ? dark : light;
  const tx = TRANSLATIONS[lang];
  const maxMistakes = settings.mistakeLimit ? 3 : 99;
  const { time, setTime } = useTimer(isRunning, isPaused);
  const numberCounts = useMemo(() => getNumberCounts(board), [board]);

  // Sync sound enabled with settings
  useEffect(() => { setSoundEnabled(settings.sounds); }, [settings.sounds]);

  const updateSetting = (key) => setSettings((p) => ({ ...p, [key]: !p[key] }));
  const navigate = useCallback((tabId, screenId) => { setTab(tabId); setScreen(screenId); }, []);

  const startPuzzle = useCallback((diff, idx) => {
    const { puzzle, solution: sol } = generatePuzzle(DIFFICULTIES[diff].clues);
    setBoard(puzzle.map((r) => [...r])); setSolution(sol); setInitialBoard(puzzle.map((r) => [...r]));
    setSelectedCell(null); setMistakes(0); setScore(0); setTime(0); setHintsLeft(3);
    setNoteMode(false); setNotes({}); setErrorCells({}); setAnimatingCells({});
    setIsPaused(false); setHistory([]); setDifficulty(diff); setPuzzleIndex(idx);
    setScreen("game"); setIsRunning(true);
    playSound("start");
  }, [setTime]);

  const finishPuzzle = useCallback((finalScore) => {
    setIsRunning(false); setScore(finalScore);
    setCompletedPuzzles((p) => ({ ...p, [`${difficulty}-${puzzleIndex}`]: { score: finalScore, time, mistakes } }));
    setTimeout(() => setScreen("complete"), 600);
  }, [difficulty, puzzleIndex, time, mistakes]);

  const handleNumberInput = useCallback((num) => {
    if (!selectedCell || screen !== "game" || isPaused) return;
    const [r, col] = selectedCell;
    if (initialBoard[r][col] !== 0) return;

    setHistory((p) => [...p, { b: board.map((row) => [...row]), e: { ...errorCells } }]);

    if (noteMode) {
      playSound("notePlace");
      setNotes((prev) => {
        const key = `${r}-${col}`; const set = new Set(prev[key] || []);
        set.has(num) ? set.delete(num) : set.add(num);
        return { ...prev, [key]: set };
      });
      return;
    }

    const newBoard = board.map((row) => [...row]);
    if (num === 0) {
      playSound("erase");
      newBoard[r][col] = 0; setBoard(newBoard);
      setErrorCells((p) => { const n = { ...p }; delete n[`${r}-${col}`]; return n; });
      return;
    }
    newBoard[r][col] = num;

    if (solution[r][col] !== num && settings.autoCheck) {
      playSound("error");
      const nm = mistakes + 1; setMistakes(nm);
      setErrorCells((p) => ({ ...p, [`${r}-${col}`]: true }));
      setScore((p) => Math.max(0, p - 50));
      setAnimatingCells((p) => ({ ...p, [`${r}-${col}`]: true }));
      setTimeout(() => setAnimatingCells((p) => { const n = { ...p }; delete n[`${r}-${col}`]; return n; }), 500);
      if (nm >= maxMistakes) { setIsRunning(false); setTimeout(() => setScreen("gameover"), 300); }
    } else if (solution[r][col] === num) {
      // Check if this completes a number (all 9 placed)
      const newCounts = { ...numberCounts }; newCounts[num] = (newCounts[num] || 0) + 1;
      if (newCounts[num] >= 9) { playSound("numberComplete"); } else { playSound("correct"); }

      setErrorCells((p) => { const n = { ...p }; delete n[`${r}-${col}`]; return n; });
      if (settings.autoNotes) {
        setNotes((prev) => {
          const u = { ...prev }; delete u[`${r}-${col}`];
          for (let i = 0; i < 9; i++) {
            [`${r}-${i}`, `${i}-${col}`].forEach((k) => { if (u[k]) { const s = new Set(u[k]); s.delete(num); u[k] = s; } });
          }
          const br = Math.floor(r / 3) * 3, bc = Math.floor(col / 3) * 3;
          for (let i = br; i < br + 3; i++) for (let j = bc; j < bc + 3; j++) { const k = `${i}-${j}`; if (u[k]) { const s = new Set(u[k]); s.delete(num); u[k] = s; } }
          return u;
        });
      }
      if (settings.score) setScore((p) => p + (SCORE_POINTS[difficulty] || 10));
      setAnimatingCells((p) => ({ ...p, [`${r}-${col}`]: true }));
      setTimeout(() => setAnimatingCells((p) => { const n = { ...p }; delete n[`${r}-${col}`]; return n; }), 500);
    }

    setBoard(newBoard);
    if (isBoardComplete(newBoard, solution)) {
      finishPuzzle(Math.max(0, score + Math.max(0, 500 - time) + 200 - mistakes * 100));
    }
  }, [selectedCell, screen, isPaused, initialBoard, board, solution, mistakes, noteMode, difficulty, score, time, settings, errorCells, maxMistakes, finishPuzzle, numberCounts]);

  const handleUndo = useCallback(() => {
    if (!history.length) return;
    playSound("erase");
    const prev = history[history.length - 1];
    setBoard(prev.b); setErrorCells(prev.e || {}); setHistory((h) => h.slice(0, -1));
  }, [history]);

  const handleHint = useCallback(() => {
    if (hintsLeft <= 0 || !selectedCell || isPaused) return;
    const [r, col] = selectedCell;
    if (initialBoard[r][col] !== 0 || board[r][col] === solution[r][col]) return;
    playSound("hint");
    const nb = board.map((row) => [...row]); nb[r][col] = solution[r][col];
    setBoard(nb); setHintsLeft((p) => p - 1); setScore((p) => Math.max(0, p - 100));
    setErrorCells((p) => { const n = { ...p }; delete n[`${r}-${col}`]; return n; });
    setAnimatingCells((p) => ({ ...p, [`${r}-${col}`]: true }));
    setTimeout(() => setAnimatingCells((p) => { const n = { ...p }; delete n[`${r}-${col}`]; return n; }), 500);
    if (isBoardComplete(nb, solution)) finishPuzzle(Math.max(0, score - 100 + 200));
  }, [hintsLeft, selectedCell, isPaused, initialBoard, board, solution, score, finishPuzzle]);

  useEffect(() => {
    const handler = (e) => {
      if (screen !== "game") return;
      const n = parseInt(e.key);
      if (n >= 1 && n <= 9) handleNumberInput(n);
      if (e.key === "Backspace" || e.key === "Delete") handleNumberInput(0);
      if (e.key === "n") setNoteMode((p) => !p);
      if (e.key === "h") handleHint();
      if (e.key === "z" && (e.ctrlKey || e.metaKey)) handleUndo();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [screen, handleNumberInput, handleHint, handleUndo]);

  const goHome = () => { setIsRunning(false); setScreen("home"); setTab("home"); playSound("navigate"); };

  switch (screen) {
    case "home":
      return <HomeScreen theme={theme} tx={tx} tab={tab} onNavigate={navigate} completedPuzzles={completedPuzzles} dailyStreak={dailyStreak} expandedDiff={expandedDiff} setExpandedDiff={setExpandedDiff} onStartPuzzle={startPuzzle} />;
    case "daily":
      return <DailyScreen theme={theme} tx={tx} tab={tab} onNavigate={navigate} lang={lang} dailyStreak={dailyStreak} dailyCompleted={dailyCompleted} onStartDaily={() => startPuzzle("Hard", 99)} />;
    case "profile":
      return <ProfileScreen theme={theme} tx={tx} tab={tab} onNavigate={navigate} onGoSettings={() => { playSound("navigate"); setScreen("settings"); }} />;
    case "settings":
      return <SettingsScreen theme={theme} tx={tx} lang={lang} setLang={setLang} settings={settings} updateSetting={updateSetting} darkMode={darkMode} setDarkMode={setDarkMode} onBack={() => { setScreen("profile"); setTab("me"); }} />;
    case "game":
      return <GameScreen theme={theme} tx={tx} darkMode={darkMode} board={board} initialBoard={initialBoard} solution={solution} selectedCell={selectedCell} setSelectedCell={(c) => !isPaused && setSelectedCell(c)} notes={notes} errorCells={errorCells} animatingCells={animatingCells} settings={settings} difficulty={difficulty} puzzleIndex={puzzleIndex} time={time} score={score} mistakes={mistakes} maxMistakes={maxMistakes} hintsLeft={hintsLeft} isPaused={isPaused} setPaused={setIsPaused} noteMode={noteMode} numberCounts={numberCounts} historyLength={history.length} onNumberInput={handleNumberInput} onUndo={handleUndo} onToggleNotes={() => setNoteMode((p) => !p)} onHint={handleHint} onErase={() => handleNumberInput(0)} onBack={goHome} />;
    case "gameover":
      return <GameOverScreen theme={theme} tx={tx} mistakes={mistakes} maxMistakes={maxMistakes} time={time} score={score} onRetry={() => startPuzzle(difficulty, puzzleIndex)} onBack={goHome} />;
    case "complete":
      return <CompleteScreen theme={theme} tx={tx} difficulty={difficulty} puzzleIndex={puzzleIndex} score={score} time={time} mistakes={mistakes} maxMistakes={maxMistakes} hasNext={puzzleIndex < PUZZLES_PER_LEVEL - 1} onNext={() => startPuzzle(difficulty, puzzleIndex + 1)} onBack={goHome} />;
    default: return null;
  }
}
