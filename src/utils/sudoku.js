/**
 * Sudoku puzzle generator & solver
 * Uses backtracking algorithm with randomized number order
 */

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function isValidPlacement(board, row, col, num) {
  // Check row and column
  for (let i = 0; i < 9; i++) {
    if (board[row][i] === num) return false;
    if (board[i][col] === num) return false;
  }
  // Check 3x3 box
  const boxRow = Math.floor(row / 3) * 3;
  const boxCol = Math.floor(col / 3) * 3;
  for (let i = boxRow; i < boxRow + 3; i++) {
    for (let j = boxCol; j < boxCol + 3; j++) {
      if (board[i][j] === num) return false;
    }
  }
  return true;
}

function solveBoard(board) {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] === 0) {
        const nums = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]);
        for (const num of nums) {
          if (isValidPlacement(board, row, col, num)) {
            board[row][col] = num;
            if (solveBoard(board)) return true;
            board[row][col] = 0;
          }
        }
        return false;
      }
    }
  }
  return true;
}

export function generatePuzzle(clueCount) {
  // Generate a complete valid board
  const solution = Array.from({ length: 9 }, () => Array(9).fill(0));
  solveBoard(solution);

  // Remove cells to create puzzle
  const puzzle = solution.map((row) => [...row]);
  const positions = shuffle(
    Array.from({ length: 81 }, (_, i) => [Math.floor(i / 9), i % 9])
  );

  let removed = 0;
  const toRemove = 81 - clueCount;
  for (const [r, c] of positions) {
    if (removed >= toRemove) break;
    puzzle[r][c] = 0;
    removed++;
  }

  return { puzzle, solution };
}

export function checkDuplicates(board, row, col, value) {
  if (value === 0) return false;
  
  // Check row
  for (let i = 0; i < 9; i++) {
    if (i !== col && board[row][i] === value) return true;
  }
  // Check column
  for (let i = 0; i < 9; i++) {
    if (i !== row && board[i][col] === value) return true;
  }
  // Check box
  const boxRow = Math.floor(row / 3) * 3;
  const boxCol = Math.floor(col / 3) * 3;
  for (let i = boxRow; i < boxRow + 3; i++) {
    for (let j = boxCol; j < boxCol + 3; j++) {
      if ((i !== row || j !== col) && board[i][j] === value) return true;
    }
  }
  return false;
}

export function isBoardComplete(board, solution) {
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      if (board[r][c] !== solution[r][c]) return false;
    }
  }
  return true;
}

export function getNumberCounts(board) {
  const counts = {};
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      const v = board[r]?.[c];
      if (v) counts[v] = (counts[v] || 0) + 1;
    }
  }
  return counts;
}
