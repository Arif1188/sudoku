import React from "react";
import Board from "../components/Board";
import NumberPad from "../components/NumberPad";
import ActionButtons from "../components/ActionButtons";
import { formatTime, FONT, FONT_MONO } from "../utils/helpers";
import { playSound } from "../utils/sounds";

export default function GameScreen({
  theme, tx, darkMode, board, initialBoard, solution, selectedCell, setSelectedCell,
  notes, errorCells, animatingCells, settings,
  difficulty, puzzleIndex, time, score, mistakes, maxMistakes, hintsLeft,
  isPaused, setPaused, noteMode, numberCounts, historyLength,
  onNumberInput, onUndo, onToggleNotes, onHint, onErase, onBack,
}) {
  const c = theme;

  return (
    <div style={{ fontFamily: FONT, background: c.bg, color: c.tx, minHeight: "100vh", transition: "background 0.4s ease" }}>
      <div style={{ width: "100%", maxWidth: 480, margin: "0 auto", padding: "0 12px 20px", boxSizing: "border-box" }}>
        {/* Top bar */}
        <div className="fade-in" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 4px 8px" }}>
          <button onClick={() => { playSound("navigate"); onBack(); }}
            style={{ background: "transparent", border: "none", cursor: "pointer", fontSize: 17, color: c.ac, fontFamily: FONT, padding: "8px 0" }}>
            <span style={{ fontSize: 24, fontWeight: 300 }}>‹</span>
          </button>
          <div>
            <span style={{ fontSize: 15, fontWeight: 700 }}>{tx[difficulty]}</span>
            <span style={{ fontSize: 13, color: c.tx2, marginLeft: 6 }}>#{puzzleIndex + 1}</span>
          </div>
          <button onClick={() => { isPaused ? playSound("resume") : playSound("pause"); setPaused(!isPaused); }}
            style={{ background: "transparent", border: "none", cursor: "pointer", fontSize: 22, color: c.ac, padding: "8px 0" }}>
            {isPaused ? "▶" : "⏸"}
          </button>
        </div>

        {/* Stats bar */}
        <div className="stats-glass slide-up" style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          marginBottom: 12, padding: "10px 14px",
          background: c.sf, borderRadius: 14,
          border: `0.5px solid ${c.bd}`,
        }}>
          {settings.timer && (<>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 10, color: c.tx2, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.5 }}>{tx.time}</div>
              <div style={{ fontSize: 16, fontWeight: 700, fontFamily: FONT_MONO, marginTop: 2 }}>{formatTime(time)}</div>
            </div>
            <div style={{ width: 0.5, height: 28, background: c.sep }} />
          </>)}
          {settings.score && (<>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 10, color: c.tx2, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.5 }}>{tx.score}</div>
              <div style={{ fontSize: 16, fontWeight: 700, marginTop: 2 }}>{score}</div>
            </div>
            <div style={{ width: 0.5, height: 28, background: c.sep }} />
          </>)}
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 10, color: c.tx2, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.5 }}>{tx.mistakes}</div>
            <div style={{ fontSize: 16, fontWeight: 700, marginTop: 2 }}>
              <span style={{ color: mistakes > 0 ? c.err : c.tx }}>{mistakes}</span>
              {settings.mistakeLimit && <span style={{ color: c.tx2 }}>/{maxMistakes}</span>}
            </div>
          </div>
          <div style={{ width: 0.5, height: 28, background: c.sep }} />
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 10, color: c.tx2, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.5 }}>{tx.hints}</div>
            <div style={{ fontSize: 16, fontWeight: 700, marginTop: 2, color: hintsLeft > 0 ? c.ac : c.tx2 }}>{hintsLeft}</div>
          </div>
        </div>

        {/* Board + Pause overlay */}
        <div style={{ position: "relative", marginBottom: 14 }}>
          {isPaused && (
            <div onClick={() => { playSound("resume"); setPaused(false); }}
              className="fade-in-scale glass"
              style={{
                position: "absolute", inset: 0,
                background: darkMode ? "rgba(0,0,0,0.88)" : "rgba(255,255,255,0.93)",
                display: "flex", alignItems: "center", justifyContent: "center",
                zIndex: 10, borderRadius: 14, cursor: "pointer",
                flexDirection: "column", gap: 10,
              }}>
              <div className="float" style={{ fontSize: 52 }}>⏸</div>
              <div style={{ fontSize: 20, fontWeight: 700, color: c.tx }}>{tx.pause}</div>
              <div style={{ fontSize: 14, color: c.tx2 }}>{tx.tapResume}</div>
            </div>
          )}
          <Board
            board={board} initialBoard={initialBoard} solution={solution}
            selectedCell={selectedCell} onCellSelect={setSelectedCell}
            notes={notes} errorCells={errorCells} animatingCells={animatingCells}
            settings={settings} theme={c} isPaused={isPaused} darkMode={darkMode}
          />
        </div>

        <NumberPad onInput={onNumberInput} numberCounts={numberCounts} settings={settings} theme={c} disabled={isPaused} darkMode={darkMode} />
        <ActionButtons
          onUndo={onUndo} onToggleNotes={onToggleNotes} onHint={onHint} onErase={onErase}
          noteMode={noteMode} hintsLeft={hintsLeft} historyLength={historyLength}
          theme={c} tx={tx} disabled={isPaused} darkMode={darkMode}
        />
      </div>
    </div>
  );
}
