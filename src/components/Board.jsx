import React, { useState } from "react";
import { checkDuplicates } from "../utils/sudoku";
import { playSound } from "../utils/sounds";
import { FONT } from "../utils/helpers";

export default function Board({ board, initialBoard, solution, selectedCell, onCellSelect, notes, errorCells, animatingCells, settings, theme, isPaused, darkMode }) {
  const c = theme;
  const selectedValue = selectedCell ? board[selectedCell[0]]?.[selectedCell[1]] : null;
  const [errorAnimCells, setErrorAnimCells] = useState({});
  const [correctAnimCells, setCorrectAnimCells] = useState({});

  const handleCellClick = (r, col) => {
    if (isPaused) return;
    playSound("cellSelect");
    onCellSelect([r, col]);
  };

  return (
    <div className={`board-3d ${darkMode ? "dark" : ""}`}
      style={{
        background: c.sf,
        borderRadius: 14,
        padding: 4,
        border: `1.5px solid ${c.bdT}`,
        opacity: isPaused ? 0.05 : 1,
        transition: "opacity 0.3s, transform 0.4s ease",
      }}
    >
      <div style={{ display: "grid", gridTemplateColumns: "repeat(9, 1fr)" }}>
        {Array.from({ length: 81 }, (_, idx) => {
          const r = Math.floor(idx / 9);
          const col = idx % 9;
          const value = board[r]?.[col] || 0;
          const isInitial = initialBoard[r]?.[col] !== 0;
          const isSelected = selectedCell && selectedCell[0] === r && selectedCell[1] === col;
          const isSameRow = selectedCell && selectedCell[0] === r;
          const isSameCol = selectedCell && selectedCell[1] === col;
          const isSameBox = selectedCell && Math.floor(selectedCell[0] / 3) === Math.floor(r / 3) && Math.floor(selectedCell[1] / 3) === Math.floor(col / 3);
          const isSameNumber = settings.hlSame && selectedValue && value === selectedValue && value !== 0;
          const isError = errorCells[`${r}-${col}`];
          const isAnimating = animatingCells[`${r}-${col}`];
          const cellNotes = notes[`${r}-${col}`];

          const borderRight = (col + 1) % 3 === 0 && col < 8 ? `1.5px solid ${c.bdT}` : `0.5px solid ${c.bd}`;
          const borderBottom = (r + 1) % 3 === 0 && r < 8 ? `1.5px solid ${c.bdT}` : `0.5px solid ${c.bd}`;

          let bg = "transparent";
          if (isSelected) bg = c.sel;
          else if (isError) bg = c.errBg;
          else if (isSameNumber) bg = c.same;
          else if (settings.hlArea && (isSameRow || isSameCol || isSameBox)) bg = c.cell;

          const isDuplicate = settings.hlDup && value !== 0 && !isInitial && checkDuplicates(board, r, col, value);

          const animClass = isAnimating 
            ? (isError ? "error-anim" : "correct-anim") 
            : "";

          return (
            <button
              key={idx}
              onClick={() => handleCellClick(r, col)}
              className={animClass}
              style={{
                aspectRatio: "1",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: bg,
                border: "none",
                borderRight,
                borderBottom,
                cursor: isPaused ? "default" : "pointer",
                fontSize: value ? 17 : 8,
                fontWeight: isInitial ? 700 : 500,
                fontFamily: FONT,
                color: isError || isDuplicate ? c.err : isInitial ? c.tx : c.ac,
                padding: 0,
                transition: "background 0.2s ease, color 0.2s ease",
                outline: isSelected ? `2px solid ${c.ac}` : "none",
                outlineOffset: "-1px",
                borderRadius: 0,
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Ripple glow for selected */}
              {isSelected && (
                <div style={{
                  position: "absolute", inset: 0,
                  background: `radial-gradient(circle, ${c.acS} 0%, transparent 70%)`,
                  pointerEvents: "none",
                }} />
              )}
              {value !== 0 ? (
                <span style={{ position: "relative", zIndex: 1 }}>{value}</span>
              ) : cellNotes && cellNotes.size > 0 ? (
                <div style={{
                  display: "grid", gridTemplateColumns: "repeat(3, 1fr)",
                  width: "100%", height: "100%",
                  alignItems: "center", justifyItems: "center",
                }}>
                  {[1,2,3,4,5,6,7,8,9].map((n) => (
                    <span key={n} style={{
                      fontSize: 7, lineHeight: 1,
                      color: cellNotes.has(n) ? c.note : "transparent",
                      fontWeight: 600,
                    }}>{n}</span>
                  ))}
                </div>
              ) : null}
            </button>
          );
        })}
      </div>
    </div>
  );
}
